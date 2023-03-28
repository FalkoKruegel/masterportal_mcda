import {toLonLat, get as getProjection} from "ol/proj";
import {features} from "../../decision_support/utils/analysis/run_analysis";
import {addLayerModel} from "../../decision_support/utils/map";
import {RasterStyle} from "../../decision_support/utils/layers/raster_style";

let grid_style = null;
let grid_layer = null;

const actions = {
    initialize () {
        return 1;
    },

    async runRequest ({commit, state, dispatch}, payload) {
        state.results.status = "running";

        // build request
        const request = {};

        request.facility_count = state.params.facility_count;
        request.range_type = state.params.range_type;
        if (state.params.range_type === "discrete") {
            const ranges = [];
            const step = state.params.range_max / state.params.range_steps;
            let start = 0;
            const end = state.params.range_max;

            while (true) {
                start += step;
                if (start >= end) {
                    break;
                }
                ranges.push(Math.floor(start));
            }
            request.ranges = ranges;
        }
        else {
            request.range_max = state.params.range_max;
        }
        const projection = getProjection("EPSG:25832");
        const ll = toLonLat([state.params.area_extent[0], state.params.area_extent[1]], projection);
        const ur = toLonLat([state.params.area_extent[2], state.params.area_extent[3]], projection);

        request.envelop = [ll[0], ll[1], ur[0], ur[1]];

        let infrastructure = state.params.infrastructure;

        if (!["pharmacies", "clinics"].includes(infrastructure)) {
            infrastructure = "physicians";
        }
        request.facility_locations = features[infrastructure];

        // run request
        const response = await fetch("http://localhost:5000/v1/accessibility/nearest_query", {
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
        const json = await response.json();
        // console.log("run nearest query response", json);

        // check for error
        if (json.error !== undefined) {
            state.results.status = "failure";
            return;
        }

        // put results
        const values = [];

        for (let i = 1; i <= state.params.facility_count; i++) {
            switch (i) {
                case 1:
                    values.push({
                        label: " " + String(i) + "st",
                        selected: true
                    });
                    break;
                case 2:
                    values.push({
                        label: " " + String(i) + "nd",
                        selected: true
                    });
                    break;
                case 3:
                    values.push({
                        label: " " + String(i) + "rd",
                        selected: true
                    });
                    break;
                default:
                    values.push({
                        label: " " + String(i) + "th",
                        selected: true
                    });
                    break;
            }
        }
        state.results.facility_count_values = values;
        state.results.chart_ranges = Array.from({length: state.params.range_max / 60}, (_, k) => (k + 1) * 60);

        state.results.query_id = json.query_id;

        state.results.statistics_type = "all";
        state.results.statistic_extends[0] = null;
        state.results.statistics[0].chart_mean = 0;
        state.results.statistics[0].chart_std = 0;
        state.results.statistics[0].chart_median = 0;
        state.results.statistics[0].chart_min = 0;
        state.results.statistics[0].chart_max = 0;
        state.results.statistics[0].chart_counts = Array.from({length: state.params.range_max / 60}, () => 0);
        state.results.statistics_chart_scale = 100;

        await dispatch("requestResults");

        state.results.status = "finished";
    },

    async requestResults ({commit, state, dispatch}, payload) {
        // build request
        const request = {};

        request.id = state.results.query_id;

        // run request
        const response = await fetch("http://localhost:5000/v1/accessibility/nearest_query/result", {
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
        const json = await response.json();
        // console.log("request results response", json);

        const color_ranges = [0];
        const step = state.params.range_max / 20;
        let start = 0;

        for (let i = 0; i < 20; i++) {
            start += step;
            color_ranges.push(start);
        }
        const style = new RasterStyle("1", [0, 255, 0, 0.7], [255, 0, 0, 0.7], color_ranges);

        grid_style = new RasterStyle("value", [0, 255, 0, 0.7], [255, 0, 0, 0.7], color_ranges);
        const gfiAttributes = {};

        for (let i = 0; i < state.results.facility_count_values.length; i++) {
            gfiAttributes[String(i + 1)] = state.results.facility_count_values[i].label;
        }

        const attrs = {
            type: "layer",
            typ: "GRID",
            id: "n_nearest",
            name: "Nearest Query",
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

            features: json.features,
            extend: json.extend,
            size: json.size,
            projection: "EPSG:25832",
            style: style
        };

        addLayerModel(attrs);

        grid_layer = Radio.request("ModelList", "getModelByAttributes", {id: "n_nearest"});

        await dispatch("requestComputed");
        await dispatch("requestStatistics");
    },

    async requestComputed ({commit, state, dispatch}, payload) {
        // check if layer already exists
        if (grid_layer === null) {
            return;
        }

        // build request
        const request = {};

        request.id = state.results.query_id;
        request.compute_type = state.results.visualization_value;
        const range_indizes = [];

        for (let i = 0; i < state.results.facility_count_values.length; i++) {
            if (state.results.facility_count_values[i].selected) {
                range_indizes.push(i);
            }
        }
        request.range_indizes = range_indizes;

        // run request
        const response = await fetch("http://localhost:5000/v1/accessibility/nearest_query/compute", {
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
        const json = await response.json();
        // console.log("compute values response", json);

        for (const node of grid_layer.features.getAllNodes()) {
            node.value.value = json.values[node.value.index];
        }

        grid_layer.setStyle(grid_style);
    },

    async requestStatistics ({commit, state, dispatch}, payload) {
        // build request
        const request = {};

        request.id = state.results.query_id;

        let max_count = -1;

        for (let i = 0; i < state.results.statistic_extends.length; i++) {
            const extent = state.results.statistic_extends[i];

            if (extent === null && ["selected_compare", "selected"].includes(state.results.statistics_type)) {
                state.results.statistics[i].chart_mean = 0;
                state.results.statistics[i].chart_std = 0;
                state.results.statistics[i].chart_median = 0;
                state.results.statistics[i].chart_min = 0;
                state.results.statistics[i].chart_max = 0;
                state.results.statistics[i].chart_counts = Array.from({length: state.params.range_max / 60}, () => 0);
                continue;
            }
            if (extent === null) {
                request.envelop = null;
            }
            else {
                const projection = getProjection("EPSG:25832");
                const ll = toLonLat([extent[0], extent[1]], projection);
                const ur = toLonLat([extent[2], extent[3]], projection);

                request.envelop = [ll[0], ll[1], ur[0], ur[1]];
            }
            const response = await fetch("http://localhost:5000/v1/accessibility/nearest_query/statistics", {
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
            const json = await response.json();
            // console.log("compute statistics response", json);

            // check for error
            if (json.error !== undefined) {
                const statObj = {
                    chart_mean: 0,
                    chart_std: 0,
                    chart_median: 0,
                    chart_min: 0,
                    chart_max: 0,
                    chart_counts: Array.from({length: state.params.range_max / 60}, () => 0)
                };

                state.results.statistics[i] = statObj;
                return;
            }

            const statObj = {
                chart_mean: json.mean,
                chart_std: json.std,
                chart_median: json.median,
                chart_min: json.min,
                chart_max: json.max,
                chart_counts: json.counts
            };

            state.results.statistics[i] = statObj;
            for (const count of json.counts) {
                if (count > max_count) {
                    max_count = count;
                }
            }

        }
        if (max_count === -1) {
            state.results.statistics_chart_scale = 100;
        }
        else {
            state.results.statistics_chart_scale = Math.floor(max_count * 1.5);
        }
    }
};

export default actions;
