import store from "/src/app-store";
import {RasterStyle} from "../../../share_utils/layers/raster_style";
import {addLayerModel} from "../../../share_utils/map.js";

/**
 * runs analysis and adds accessibility layer
 * @returns {void}
 */
async function runAnalysis () {
    const stepSix = store.getters["Tools/SpatialAccess/stepSix"];

    stepSix.status = "running";

    // const stepTwo = store.getters["Tools/SpatialAccess/stepTwo"];
    // const stepThree = store.getters["Tools/SpatialAccess/stepThree"];
    const stepFour = store.getters["Tools/SpatialAccess/stepFour"];
    // const stepFive = store.getters["Tools/SpatialAccess/stepFive"];

    // build request
    const request = {};

    // set travel parameters
    request.travel_mode = "pkw";

    // set gravity parameters
    request.ranges = [120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200];
    request.range_factors = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

    // calc request envelop
    request.envelop = [9.521313150418797, 52.83516591994211, 9.912732755795634, 53.04449960862109];

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

    // set facility parameters
    request.facility = "general_physician";

    // run request
    try {
        // const start = new Date().getTime();
        const response = await fetch("http://localhost:5000/v1/accessibility/gravity2/grid", {
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

        const style = new RasterStyle("unweighted", [255, 0, 0, 0.7], [0, 255, 0, 0.7], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
        const gfiAttributes = {
            "weighted": "Räumlicher Zugang (Bevölkerungsgewichtet)",
            "unweighted": "Räumlicher Zugang"
        };
        const attrs = {
            type: "layer",
            typ: "GRID",
            id: "spatial_access",
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
            showSettings: true,

            features: geojson.features,
            extend: geojson.extend,
            size: geojson.size,
            projection: "EPSG:25832",
            style: style
        };

        addLayerModel(attrs);

        stepSix.status = "finished";
    }
    catch (e) {
        stepSix.status = "unfinished";
    }
}

export {runAnalysis};
