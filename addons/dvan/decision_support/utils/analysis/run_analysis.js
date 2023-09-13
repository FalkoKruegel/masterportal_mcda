import store from "/src/app-store";
import {toLonLat, get as getProjection} from "ol/proj";
import {ContinousGridStyle} from "../../../share_utils/layers/grid/continuus_style";
import {GridLayer} from "../../../share_utils/layers/grid_layer";
import {addLayer, removeLayer} from "../../../share_utils/map.js";
import {convertLayerName} from "../util";


const LAYERS = {};

/**
 * changes style of accessibility layer
 * @param {string} new_style attribute name for new style
 * @returns {void}
 */
function changeStyle (new_style) {
    const layer = LAYERS.accessibility;

    if (layer === undefined) {
        return;
    }
    const [min, max] = computeMinMax(layer.features.getAllNodes(), new_style, -9999);
    const newStyle = layer.getStyle();

    newStyle.attribute = new_style;
    newStyle.start = min;
    newStyle.end = max;

    layer.setStyle(newStyle);
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
            if (stepFour.selectedAgeGroups.length === Object.keys(stepFour.standardAgeGroups).length) {
                request.population_type = "standard_all";
            }
            else {
                request.population_type = "standard";
                request.population_indizes = stepFour.selectedAgeGroups;
            }
            break;
        case "kids":
            request.population_type = "kita_schul";
            request.population_indizes = stepFour.selectedAgeGroups;
            break;
        default:
            throw Error("missing population selection");
    }

    // set facility parameters
    const factors = [1.0, 0.6, 0.4, 0.2];

    request.infrastructures = {};
    for (const group in stepThree.selected_facilities) {
        for (const item in stepThree.selected_facilities[group]) {
            if (stepThree.selected_facilities[group][item] === "") {
                continue;
            }
            request.infrastructures[item] = {
                "infrastructure_weight": stepSix.facility_weights[group][item],
                "range_factors": factors,
                "ranges": stepFive.time_zones[group][item].map(item => item * 60),
                "facility_type": stepThree.selected_facilities[group][item]
            };
        }
    }

    try {
        // const start = new Date().getTime();

        const response = await fetch("http://localhost:5000/v1/accessibility/multi/grid", {
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

        // const style = new RasterStyle("multiCritera",
        //     [255, 0, 0, 180],
        //     [0, 255, 0, 180],
        //     [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        //     -9999,
        //     [25, 25, 25, 100],
        // );
        const [min, max] = computeMinMax(geojson.features, "multiCritera", -9999);
        const style = new ContinousGridStyle("multiCritera",
            [255, 0, 0, 180],
            [0, 255, 0, 180],
            min, max,
            -9999,
            [25, 25, 25, 100]
        );
        const layer = new GridLayer({
            features: geojson.features,
            extend: geojson.extend,
            size: geojson.size,
            projection: "EPSG:25832",
            style: style
        });
        const ol_layer = layer.getOlLayer();

        const gfiAttributes = {
            "multiCritera": convertLayerName("multiCritera"),
            "multiCritera_weighted": convertLayerName("multiCritera") + " (gewichtet)"
        };

        for (const infra in request.infrastructures) {
            gfiAttributes[infra] = convertLayerName(infra);
            gfiAttributes[infra + "_weighted"] = convertLayerName(infra) + " (gewichtet)";
        }
        const attrs = {
            type: "layer",
            typ: "GRID",
            id: "accessibility",
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
        }

        LAYERS.accessibility = layer;

        addLayer(ol_layer, () => {
            removeLayer("accessibility");
        });

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
        const val = feature.value[attr];

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

export {runAnalysis, changeStyle};
