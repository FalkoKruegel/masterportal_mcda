import store from "/src/app-store";
import {RasterStyle} from "../../share_utils/layers/raster_style";
import {GridLayer} from "../../share_utils/layers/grid_layer";
import {toLonLat, get as getProjection} from "ol/proj";
import {CustomStyle} from "./custom_style";

/**
 * runs analysis and adds accessibility layer
 * @returns {void}
 */
async function runAnalysis () {
    const stepSeven = store.getters["Tools/SpatialAnalysis/stepSeven"];

    stepSeven.status = "running";
    stepSeven.show_result = false;
    stepSeven.show_population = false;

    // build request
    const request = {};

    // set facility parameters
    const stepTwo = store.getters["Tools/SpatialAnalysis/stepTwo"];

    request.facility_type = stepTwo.selected_facility;

    // set analysis parameters
    // const stepThree = store.getters["Tools/SpatialAnalysis/stepThree"];
    request.analysis = "default";

    // set travel parameters
    const stepFour = store.getters["Tools/SpatialAnalysis/stepFour"];

    request.travel_mode = stepFour.travel_mode;
    request.range_type = stepFour.range_type;
    request.range_max = stepFour.range_max;
    request.range_steps = stepFour.range_steps;

    // set population information
    // const stepFive = store.getters["Tools/SpatialAnalysis/stepFive"];
    request.population = "count";

    // set extent parameters
    const stepSix = store.getters["Tools/SpatialAnalysis/stepSix"];
    const projection = getProjection("EPSG:25832");
    const ll = toLonLat([stepSix.area_extent[0], stepSix.area_extent[1]], projection);
    const ur = toLonLat([stepSix.area_extent[2], stepSix.area_extent[3]], projection);

    request.envelop = [ll[0], ll[1], ur[0], ur[1]];

    // run request
    // try {
    const response = await fetch("http://localhost:5000/v1/spatial_analysis/grid", {
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
    const geojson = await response.json();

    // retrive data for plots
    const data = [];

    for (const feat of geojson.features) {
        if (feat.value.result === -9999) {
            continue;
        }
        data.push({x: feat.value.population, y: feat.value.result});
    }
    DATASET.data = data;

    // create result layer
    const result_style = new RasterStyle("result", [255, 0, 0, 0.7], [0, 255, 0, 0.7], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    let gfiAttributes = {
        "result": "Analysewert"
    };
    const result_layer = new GridLayer({
        features: geojson.features,
        extend: geojson.extend,
        size: geojson.size,
        projection: "EPSG:25832",
        style: result_style
    });
    let ol_layer = result_layer.getOlLayer();
    let attr = {
        type: "layer",
        typ: "GRID",
        id: "spatial_analysis_result",
        name: "Spatial Analysis (Result)",
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
    LAYERS.result = result_layer;


    // create population layer
    const population_style = new RasterStyle("population", [255, 0, 0, 0.7], [0, 255, 0, 0.7], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

    gfiAttributes = {
        "population": "Bevölkerungswert"
    };
    const population_layer = new GridLayer({
        features: [],
        extend: geojson.extend,
        size: geojson.size,
        projection: "EPSG:25832",
        style: population_style
    });

    population_layer.features = result_layer.features;
    population_layer.setStyle(population_style);
    ol_layer = population_layer.getOlLayer();
    attr = {
        type: "layer",
        typ: "GRID",
        id: "spatial_analysis_population",
        name: "Spatial Analysis (Population)",
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
    LAYERS.population = population_layer;

    stepSeven.plot_data_1 = DATASET.data;

    stepSeven.status = "finished";
    stepSeven.show_result = true;
    stepSix.area_extent = null;
    stepSix.area_selection = null;
    // }
    // catch (e) {
    //     console.log(e);
    //     stepSeven.status = "unfinished";
    // }
}

/**
 * Divides the dataset into two subsets for plotting
 * @param {number} x_min min population value of subset
 * @param {number} y_min min result value of subset
 * @param {number} x_max max population value of subset
 * @param {number} y_max max result value of subset
 * @returns {void}
 */
function select_data_subset (x_min, y_min, x_max, y_max) {
    const data1 = [];
    const data2 = [];

    for (const point of DATASET.data) {
        if (point.x >= x_min && point.x <= x_max && point.y >= y_min && point.y <= y_max) {
            data2.push(point);
        }
        else {
            data1.push(point);
        }
    }
    const stepSeven = store.getters["Tools/SpatialAnalysis/stepSeven"];

    stepSeven.plot_data_1 = data1;
    stepSeven.plot_data_2 = data2;

    const result_style = new CustomStyle(new RasterStyle("result", [255, 0, 0, 0.7], [0, 255, 0, 0.7], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]), x_min, y_min, x_max, y_max);

    if (LAYERS.result !== null) {
        LAYERS.result.setStyle(result_style);
    }
}

/**
 * Plots all data as one dataset
 * @returns {void}
 */
function select_all_data () {
    const stepSeven = store.getters["Tools/SpatialAnalysis/stepSeven"];

    stepSeven.plot_data_1 = DATASET.data;
    stepSeven.plot_data_2 = [];

    const result_style = new RasterStyle("result", [255, 0, 0, 0.7], [0, 255, 0, 0.7], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

    if (LAYERS.result !== null) {
        LAYERS.result.setStyle(result_style);
    }
}


const LAYERS = {
    result: null,
    population: null
};

const DATASET = {
    data: []
};

export {runAnalysis, LAYERS, select_data_subset, select_all_data};
