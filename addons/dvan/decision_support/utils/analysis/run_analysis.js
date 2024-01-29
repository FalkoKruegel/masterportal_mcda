import store from "/src/app-store";
import {toLonLat, get as getProjection} from "ol/proj";
import {addLayer, removeLayer} from "../../../share_utils/map.js";
import {convertLayerName} from "../util";
import {initDeckLayer} from "../../../share_utils/deck.js";
import {GridLayer, ContinousGridStyle} from "../../../share_utils/layers/deck_grid.js";
import {HeatMapLayer, HeatMapStyle} from "../../../share_utils/layers/deck_heatmap.js";
import config from "../../../config.json";


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
        const [min, max] = computeMinMax(layer_obj.features, new_style_attr, -9999);

        style.attribute = new_style_attr;
        style.start = min;
        style.end = max;
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
    switch (stepFour.populationType) {
        case "standard":
            if (stepFour.selectedAgeGroups.length === Object.keys(stepFour.population.standard.items).length) {
                request.population_type = "standard_all";
            }
            else {
                request.population_type = stepFour.populationType;
                request.population_indizes = stepFour.selectedAgeGroups;
            }
            break;
        case "":
            throw Error("missing population selection");
        default:
            request.population_type = stepFour.populationType;
            request.population_indizes = stepFour.selectedAgeGroups;
            break;
    }

    // set facility parameters
    const factors = [1.0, 0.6, 0.4, 0.2];

    request.infrastructures = {};
    for (const group in stepThree.selectedFacilities) {
        for (const item in stepThree.selectedFacilities[group]) {
            const name = stepThree.selectedFacilities[group][item];

            if (name === "") {
                continue;
            }
            request.infrastructures[name] = {
                "infrastructure_weight": stepSix.facilityWeights[group][item],
                "range_factors": factors,
                "ranges": stepFive.timeZones[group][item].map(item => item * 60),
                "facility_type": name
            };
        }
    }

    try {
        // const start = new Date().getTime();

        const response = await fetch(config.backend_url + "/v1/decision_support/grid", {
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

        const [min, max] = computeMinMax(geojson.features, "multiCriteria", -9999);
        const style = new ContinousGridStyle("multiCriteria",
            [255, 0, 0, 180],
            [0, 255, 0, 180],
            min, max,
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
            "multiCriteria": convertLayerName("multiCriteria"),
            "multiCriteria_weighted": convertLayerName("multiCriteria") + " (gewichtet)"
        };

        for (const infra in request.infrastructures) {
            gfiAttributes[infra] = convertLayerName(infra);
            gfiAttributes[infra + "_weighted"] = convertLayerName(infra) + " (gewichtet)";
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
            is_active: false
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

/**
 * computes min and max value of features
 * @param {any} features feature list
 * @param {string} attr attribute to compute min max for
 * @param {number} no_data no data value for attribute
 * @returns {number[]} tuple of [min, max]
 */
function computeMinMax (features, attr, no_data) {
    let min = 10000000000;
    let max = -10000000000;

    for (const feature of features) {
        const val = feature.properties[attr];

        if (val === no_data) {
            continue;
        }
        if (val > max) {
            max = val;
        }
        if (val < min) {
            min = val;
        }
    }
    return [min, max];
}

export {runAnalysis, changeLayer};
