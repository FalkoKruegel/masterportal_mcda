import store from "/src/app-store";
import {RasterStyle} from "../layers/raster_style";
import {addLayerModel} from "../map.js";
import {convertLayerName} from "../util";
import hospitals from "./hospitals.json";
import discounter from "./discounter.json";
import kitas from "./kitas.json";
import other_supply from "./other_supply.json";
import physicians from "./physicians.json";
import primary_schools from "./primary_schools.json";
import secondary_1 from "./secondary_1.json";
import secondary_2 from "./secondary_2.json";
import supermarket from "./supermarket.json";

const features = {};

features.supermarket = supermarket.features.map(item => item.geometry.coordinates[0]);
features.discounter = discounter.features.map(item => item.geometry.coordinates[0]);
features.others = other_supply.features.map(item => item.geometry.coordinates[0]);

features.pharmacies = hospitals.features.map(item => item.geometry.coordinates[0]);
features.clinics = hospitals.features.map(item => item.geometry.coordinates[0]);
features.physicians = physicians.features.map(item => item.geometry.coordinates[0]);

features.nurseries = kitas.features.map(item => item.geometry.coordinates[0]);
features.primary_schools = primary_schools.features.map(item => item.geometry.coordinates[0]);
features.secondary_1 = secondary_1.features.map(item => item.geometry.coordinates[0]);
features.secondary_2 = secondary_2.features.map(item => item.geometry.coordinates[0]);

/**
 * changes style of accessibility layer
 * @param {string} new_style attribute name for new style
 * @returns {void}
 */
function changeStyle (new_style) {
    const model = Radio.request("ModelList", "getModelByAttributes", {id: "accessibility"});

    if (model === null) {
        return;
    }

    const ranges = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const newStyle = new RasterStyle(new_style, [255, 0, 0, 0.7], [0, 255, 0, 0.7], ranges);

    model.setStyle(newStyle);
}

/**
 * runs analysis and adds accessibility layer
 * @returns {void}
 */
async function runAnalysis () {
    const stepEight = store.getters["Tools/DecisionSupport/stepEight"];

    stepEight.status = "running";

    // let ranges = [180, 420, 900, 1800];
    const factors = [1.0, 0.6, 0.4, 0.2];
    // let locations = [];
    // // for (let id of selectedfeatures) {
    // //     locations.push(layer.getGeometry(id).coordinates)
    // // }
    // for (let feature of hospitals.features) {
    //     locations.push(feature.geometry.coordinates[0]);
    // }

    // build request
    const request = {};

    request.infrastructures = {};

    const stepThree = store.getters["Tools/DecisionSupport/stepThree"];
    const stepFive = store.getters["Tools/DecisionSupport/stepFive"];
    const stepSix = store.getters["Tools/DecisionSupport/stepSix"];

    for (const item in stepThree.local_supply) {
        if (stepThree.local_supply[item] === true) {
            request.infrastructures[item] = {
                "infrastructure_weight": stepSix.local_supply[item],
                "range_factors": factors,
                "facility_locations": features[item],
                "ranges": Object.values(stepFive.local_supply[item]).map(item => item*60)
            };
        }
    }
    for (let item in stepThree.health) {
        if (stepThree.health[item] === true) {
            if (!["pharmacies", "clinics"].includes(item)) {
                item = "physicians";
            }
            request.infrastructures[item] = {
                "infrastructure_weight": stepSix.health[item],
                "range_factors": factors,
                "facility_locations": features[item],
                "ranges": Object.values(stepFive.health[item]).map(item => item*60)
            };
        }
    }
    for (const item in stepThree.education) {
        if (stepThree.education[item] === true) {
            request.infrastructures[item] = {
                "infrastructure_weight": stepSix.education[item],
                "range_factors": factors,
                "facility_locations": features[item],
                "ranges": Object.values(stepFive.education[item]).map(item => item*60)
            };
        }
    }

    try {
        // const start = new Date().getTime();

        const response = await fetch("http://localhost:5000/v1/accessibility/multi", {
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
        const style = new RasterStyle("multiCritera", [255, 0, 0, 0.7], [0, 255, 0, 0.7], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
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
            showSettings: true,

            features: geojson.features,
            extend: geojson.extend,
            size: geojson.size,
            projection: "EPSG:25832",
            style: style
        };

        addLayerModel(attrs);

        stepEight.status = "finished";
    }
    catch (e) {
        stepEight.status = "unfinished";
    }
}

export {runAnalysis, changeStyle};
