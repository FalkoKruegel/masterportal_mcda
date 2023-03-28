const state = {
    // mandatory
    active: false,
    id: "NearestQuery",
    // mandatory defaults for config.json parameters
    name: "Erreichbarkeiten",
    icon: "bi-bandaid",
    renderToWindow: false,
    resizableWindow: true,
    isVisibleInMenu: true,
    deactivateGFI: false,

    // request parameters
    params: {
        infrastructure: null,
        facility_count: 1,
        area_selection: null,
        area_extent: null,
        travel_mode: "driving-car",
        range_type: "discrete",
        range_max: 1800,
        range_steps: 10
    },

    // calculation results
    results: {
        status: "unfinished",
        query_id: "",

        facility_count_values: [],
        chart_ranges: [],

        visualization_value: "mean",
        statistics_type: "all",
        statistic_extends: [
            null
        ],
        statistics_chart_scale: 100,
        statistics: [
            {
                chart_counts: [],
                chart_mean: 0,
                chart_std: 0,
                chart_median: 0,
                chart_min: 0,
                chart_max: 0
            }
        ]
    }
};

export default state;
