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
    const population_indizes = [];

    for (const key in stepFour.standard) {
        if (stepFour.standard[key] === false) {
            continue;
        }
        switch (key) {
            case "first":
                population_indizes.push(0);
                break;
            case "second":
                population_indizes.push(1);
                break;
            case "third":
                population_indizes.push(2);
                break;
            case "fourth":
                population_indizes.push(3);
                break;
            case "fifth":
                population_indizes.push(4);
                break;
            case "sixth":
                population_indizes.push(5);
                break;
            case "seventh":
                population_indizes.push(6);
                break;
            default:
                break;
        }
    }
    if (population_indizes.length === 7) {
        request.population_type = "standard_all";
    }
    else if (population_indizes.length !== 0) {
        request.population_type = "standard";
        request.population_indizes = population_indizes;
    }
    else {
        for (const key in stepFour.kita) {
            if (stepFour.kita[key] === false) {
                continue;
            }
            switch (key) {
                case "first":
                    population_indizes.push(0);
                    break;
                case "second":
                    population_indizes.push(1);
                    break;
                case "third":
                    population_indizes.push(2);
                    break;
                case "fourth":
                    population_indizes.push(3);
                    break;
                case "fifth":
                    population_indizes.push(4);
                    break;
                case "sixth":
                    population_indizes.push(5);
                    break;
                case "seventh":
                    population_indizes.push(6);
                    break;
                default:
                    break;
            }
        }
        request.population_type = "kita_schul";
        request.population_indizes = population_indizes;
    }

    // run request
    try {
        // const start = new Date().getTime();
        const response = await fetch("http://172.26.62.41:5000/v1/spatial_access/grid", {
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

        const style = new RasterStyle("accessibility", [255, 0, 0, 0.7], [0, 255, 0, 0.7], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
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

export {runAnalysis};
