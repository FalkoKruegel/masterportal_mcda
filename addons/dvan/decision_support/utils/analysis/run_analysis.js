import store from "/src/app-store";
import {toLonLat, get as getProjection} from "ol/proj";
import {addLayer, removeLayer} from "../../../share_utils/map.js";
import {convertLayerName} from "../util";
import {initDeckLayer} from "../../../share_utils/deck.js";
import {GridLayer, ContinousGridStyle} from "../../../share_utils/layers/deck_grid.js";
import {HeatMapLayer, HeatMapStyle} from "../../../share_utils/layers/deck_heatmap.js";
import config from "../../../config.json";
import {fetch_auth} from "../../../share_utils/auth";


const LAYERS = {};

/**
 * changes style of accessibility layer
 * @param {string} layer_key layer-key (one of [grid, heatmap]) to show
 * @param {string} new_style_attr attribute name for new style
 * @returns {void}
 */
function changeLayer (layer_key, new_style_attr) {
    if (!["grid", "heatmap"].includes(layer_key)) {
        return;
    }

    const layer_obj = LAYERS[layer_key];

    if (!layer_obj.is_active) {
        for (const key in LAYERS) {
            const obj = LAYERS[key];

            removeLayer(obj.name);
            obj.is_active = false;
        }
        layer_obj.is_active = true;
        addLayer(layer_obj.ol_layer, () => {
            removeLayer(layer_obj.name);
            layer_obj.is_active = false;
        });
    }

    if (layer_key === "grid") {
        const style = layer_obj.ol_layer.getStyle();

        style.attribute = new_style_attr;
        style.start = 0;
        if (new_style_attr === "multiCriteria") {
            style.end = layer_obj.infra_sum;
        }
        else {
            style.end = 1;
        }
        layer_obj.ol_layer.setStyle(style);
    }
    if (layer_key === "heatmap") {
        const style = layer_obj.ol_layer.getStyle();

        style.attribute = new_style_attr;
        layer_obj.ol_layer.setStyle(style);
    }
}

/**
 * runs analysis and adds accessibility layer
 * @returns {void}
 */
async function runAnalysis () {
    const stepEight = store.getters["Tools/DecisionSupport/stepEight"];

    stepEight.status = "running";
    removeLayer("accessibility");

    const stepTwo = store.getters["Tools/DecisionSupport/stepTwo"];
    const stepThree = store.getters["Tools/DecisionSupport/stepThree"];
    const stepFour = store.getters["Tools/DecisionSupport/stepFour"];
    const stepFive = store.getters["Tools/DecisionSupport/stepFive"];
    const stepSix = store.getters["Tools/DecisionSupport/stepSix"];

    // build request
    const request = {};

    // set extent parameters
    const projection = getProjection("EPSG:25832");
    const ll = toLonLat([stepTwo.ownAreaExtent[0], stepTwo.ownAreaExtent[1]], projection);
    const ur = toLonLat([stepTwo.ownAreaExtent[2], stepTwo.ownAreaExtent[3]], projection);

    request.envelop = [ll[0], ll[1], ur[0], ur[1]];

    // set population information
    if (stepFour.populationType === "") {
        throw Error("missing population selection");
    }
    request.population_type = stepFour.populationType;
    request.population_indizes = stepFour.selectedAgeGroups;

    // set facility parameters
    const factors = [1.0, 0.6, 0.4, 0.2];

    request.infrastructures = {};
    let infra_sum = 0;

    for (const group in stepThree.selectedFacilities) {
        for (const item in stepThree.selectedFacilities[group]) {
            const name = stepThree.selectedFacilities[group][item];

            if (name === "") {
                continue;
            }
            const weight = stepSix.facilityWeights[group][item] / 100;

            request.infrastructures[name] = {
                "infrastructure_weight": weight,
                "range_factors": factors,
                "ranges": stepFive.timeZones[group][item].map(item => item * 60),
                "facility_type": name
            };
            infra_sum += weight;
        }
    }

    try {
        // const start = new Date().getTime();

        const response = await fetch_auth(config.backend_url + "/v1/decision_support/grid", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(request)
        });

        // const end = new Date().getTime();
        // const time = end - start;

        // console.log("Succesfully finished in " + time + " ms");


        const geojson = await response.json();

        const style = new ContinousGridStyle("multiCriteria",
            [255, 0, 0, 180],
            [0, 255, 0, 180],
            0, infra_sum,
            -9999,
            [25, 25, 25, 100]
        );
        const grid_layer = new GridLayer("decision_support_accessibility", "Accessibility", geojson.features, 100);
        const ol_layer = initDeckLayer(grid_layer, style);

        const heat_style = new HeatMapStyle("multiCriteria",
            [255, 0, 0, 180],
            [0, 255, 0, 180]
        );
        const heat_layer = new HeatMapLayer("decision_support_heatmap", "Accessibility (Heat-Map)", geojson.features);
        const ol_heat_layer = initDeckLayer(heat_layer, heat_style);

        const gfiAttributes = {
            "multiCriteria": convertLayerName("multiCriteria")
        };

        for (const infra in request.infrastructures) {
            gfiAttributes[infra] = convertLayerName(infra);
        }
        const attrs = {
            type: "layer",
            typ: "GRID",
            id: "decision_support_accessibility",
            name: "Accessibility",
            gfiAttributes: gfiAttributes,
            isSelected: true,
            hitTolerance: 0,
            parentId: "SelectedLayer",
            isNeverVisibleInTree: false,
            isRemovable: true,
            isSettingVisible: true,
            isVisibleInMap: true,
            layerInfoClicked: false,
            singleBaselayer: false,
            maxScale: "1000000000",
            minScale: "0",
            selectionIDX: 0,
            showSettings: true
        };

        for (const key in attrs) {
            ol_layer.set(key, attrs[key]);
            ol_heat_layer.set(key, attrs[key]);
        }

        LAYERS.grid = {
            name: "decision_support_accessibility",
            layer: grid_layer,
            features: geojson.features,
            ol_layer: ol_layer,
            is_active: false,
            infra_sum: infra_sum
        };
        LAYERS.heatmap = {
            name: "decision_support_heatmap",
            layer: heat_layer,
            features: geojson.features,
            ol_layer: ol_heat_layer,
            is_active: false
        };

        changeLayer("grid", "multiCriteria");

        stepEight.status = "finished";
    }
    catch (e) {
        stepEight.status = "unfinished";
    }
}

export {runAnalysis, changeLayer};
