import store from "/src/app-store";
import {getMapView} from "../../../share_utils/map.js";
import {LAYERS, getWMSLayer} from "./show_layers";
import {initDeckLayer} from "../../../share_utils/deck.js";
import {GridLayer, ContinousGridStyle} from "../../../share_utils/layers/deck_grid.js";
// import {HeatMapLayer, HeatMapStyle} from "../../../share_utils/layers/deck_heatmap.js";
import config from "../../../config.json";

/**
 * runs analysis and adds accessibility layer
 * @returns {void}
 */
async function runAnalysis () {
    const stepSix = store.getters["Tools/SpatialAccess/stepSix"];

    stepSix.status = "running";
    stepSix.show_accessibility = false;
    stepSix.show_locations = false;
    stepSix.show_scope = false;
    stepSix.show_population = false;

    const stepTwo = store.getters["Tools/SpatialAccess/stepTwo"];
    const stepThree = store.getters["Tools/SpatialAccess/stepThree"];
    const stepFour = store.getters["Tools/SpatialAccess/stepFour"];
    const stepFive = store.getters["Tools/SpatialAccess/stepFive"];

    // build request
    const request = {};

    // set extent parameters
    request.supply_level = stepTwo.supplyLevel;
    request.planning_area = stepTwo.planningArea;

    // set facility parameters
    request.facility_type = stepTwo.physicianGroup;
    request.facility_capacity = stepThree.physicianAvailability;

    // set travel parameters
    request.travel_mode = stepFive.transport;
    request.decay_type = stepFive.distanceDecay;

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

    // run request
    try {
        // const start = new Date().getTime();
        const response = await fetch(config.backend_url + "/v1/spatial_access/grid", {
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

        const style = new ContinousGridStyle("accessibility",
            [255, 0, 0, 180],
            [0, 255, 0, 180],
            geojson.min, geojson.max,
            -9999,
            [25, 25, 25, 100]
        );
        const grid_layer = new GridLayer("spatial_access_accessibility", "Spatial Access", geojson.features, 100);
        const ol_layer = initDeckLayer(grid_layer, style);
        // const style = new HeatMapStyle("accessibility",
        //     [255, 0, 0, 180],
        //     [0, 255, 0, 180],
        // );
        // const heat_layer = new HeatMapLayer("spatial_access_accessibility", "Spatial Access", geojson.features);
        // const ol_layer = initDeckLayer(heat_layer, style);

        const attr = {
            type: "layer",
            typ: "GRID",
            id: "spatial_access_accessibility",
            name: "Spatial Access",
            gfiAttributes: {
                "accessibility": "Räumlicher Zugang"
            },
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

        for (const key in attr) {
            ol_layer.set(key, attr[key]);
        }

        stepSix.status = "finished";

        LAYERS.accessibility = ol_layer;
        LAYERS.locations = getWMSLayer(
            "spatial_access_locations",
            "Spatial Access (Praxisstandorte)",
            `http://172.26.63.162:8085/geoserver/DVAN_View_Data/ows?CQL_FILTER=DETAIL_ID_=${get_detail_id(stepTwo.physicianGroup)}`,
            "outpatient_physicians_location_based"
        );
        LAYERS.scope = getWMSLayer(
            "spatial_access_scope",
            "Spatial Access (Praxisumfang)",
            `http://172.26.63.162:8085/geoserver/DVAN_View_Data/ows?CQL_FILTER=DETAIL_ID_=${get_detail_id(stepTwo.physicianGroup)}`,
            "outpatient_physicians_location_specialist_count"
        );
        LAYERS.population = getWMSLayer(
            "spatial_access_population",
            "Spatial Access (Bevölkerung)",
            "http://172.26.63.162:8085/geoserver/DVAN_View_Data/ows?",
            "dvan_view_bevoelkerung_2019",
            "Bevoelkerung_Raster_EW_GESAMT"
        );
        stepSix.show_accessibility = true;

        const extent = geojson.extend;
        const center = [(extent[2] + extent[0]) / 2, (extent[3] + extent[1]) / 2];

        flyTo(getMapView(), center);
    }
    catch (e) {
        stepSix.status = "unfinished";
    }
}

/**
 * animates view to fly to location
 * @param {*} view openlayers view
 * @param {*} location location to fly to
 * @returns {void}
 */
function flyTo (view, location) {
    const duration = 2000;
    // const zoom = view.getZoom();

    view.animate(
        {
            center: location,
            duration: duration
        }
    );
    view.animate(
        {
            zoom: 0,
            duration: duration / 2
        },
        {
            zoom: 1,
            duration: duration / 2
        }
    );
}

// /**
//  * Computes color ranges from min max
//  * @param {number} min minimum value
//  * @param {number} max maximum value
//  * @param {number} count step count
//  * @returns {number[]} ranges
//  */
// function get_ranges (min, max, count) {
//     const step_size = (max - min) / count;
//     const ranges = [];

//     for (let i = 0; i < count; i++) {
//         ranges.push(step_size * (i + 1));
//     }
//     return ranges;
// }

/**
 * convert physican name to it's detail id
 * @param {string} physician physican name
 * @returns {number} physician detail id
 */
function get_detail_id (physician) {
    switch (physician) {
        case "general_physician":
            return 100;
        case "augenarzte":
            return 205;
        case "surgeon":
            return 212;
        case "frauenarzte":
            return 235;
        case "dermatologist":
            return 225;
        case "hno_arzte":
            return 220;
        case "paediatrician":
            return 245;
        case "neurologist":
            return 230;
        case "psychotherapist":
            return 250;
        case "urologist":
            return 240;
        case "internisten":
            return 302;
        case "jugendpsychiater":
            return 303;
        case "radiologen":
            return 304;
        case "anasthesisten":
            return 301;
        default:
            return 0;
    }
}

export {runAnalysis};
