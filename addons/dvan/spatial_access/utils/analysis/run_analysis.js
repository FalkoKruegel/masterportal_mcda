import store from "/src/app-store";
import {RasterStyle} from "../../../share_utils/layers/raster_style";
import {GridLayer} from "../../../share_utils/layers/grid_layer";
import {getMapView} from "../../../share_utils/map.js";
import {LAYERS} from "./show_layers";

/**
 * runs analysis and adds accessibility layer
 * @returns {void}
 */
async function runAnalysis () {
    const stepSix = store.getters["Tools/SpatialAccess/stepSix"];

    stepSix.status = "running";
    stepSix.show_accessibility = false;

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

    // run request
    try {
        // const start = new Date().getTime();
        const response = await fetch("http://localhost:5000/v1/spatial_access/grid", {
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

        const style = new RasterStyle("accessibility",
            [255, 0, 0, 180],
            [0, 255, 0, 180],
            get_ranges(geojson.min, geojson.max, 10),
            -9999,
            [25, 25, 25, 100]
        );
        // const style = new ContinousGridStyle("accessibility",
        //     [255, 0, 0, 180],
        //     [0, 255, 0, 180],
        //     geojson.min, geojson.max,
        //     -9999,
        //     [25, 25, 25, 100]
        // );
        const gfiAttributes = {
            "accessibility": "Räumlicher Zugang"
        };

        const layer = new GridLayer({
            features: geojson.features,
            extend: geojson.extend,
            size: geojson.size,
            projection: "EPSG:25832",
            style: style
        });
        // const layer = new RemoteGridLayer({
        //     url: geojson.url,
        //     layer_id: geojson.id,
        //     extend: geojson.extend,
        //     projection: "EPSG:25832",
        //     style: style
        // });

        const ol_layer = layer.getOlLayer();
        const attr = {
            type: "layer",
            typ: "GRID",
            id: "spatial_access_accessibility",
            name: "Spatial Access",
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

        for (const key in attr) {
            ol_layer.set(key, attr[key]);
        }

        stepSix.status = "finished";

        LAYERS.accessibility = ol_layer;
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

/**
 * Computes color ranges from min max
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @param {number} count step count
 * @returns {number[]} ranges
 */
function get_ranges (min, max, count) {
    const step_size = (max - min) / count;
    const ranges = [];

    for (let i = 0; i < count; i++) {
        ranges.push(step_size * (i + 1));
    }
    return ranges;
}

export {runAnalysis};
