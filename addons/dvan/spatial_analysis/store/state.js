const state = {
    // mandatory
    active: false,
    id: "SpatialAnalysis",
    // mandatory defaults for config.json parameters
    name: "Spatial Analysis",
    icon: "bi-graph-up",
    renderToWindow: false,
    resizableWindow: true,
    isVisibleInMenu: true,
    deactivateGFI: false,

    stepTwo: {
        facilities: {
            "Nahversorgung": [
                {name: "supermarket", text: "Supermärkte"},
                {name: "discounter", text: "Discounter"},
                {name: "other_local_supply", text: "sonstige Lebensmittelgeschäfte"}
            ],
            "Gesundheit": [
                {name: "pharmacy", text: "Apotheken"},
                {name: "clinic", text: "Hochschulkliniken und Plankrankenhäuser"},
                {name: "paediatrician", text: "Kinder- und Jugendärzte"},
                {name: "ophthalmologist", text: "Augenärzte"},
                {name: "surgeon", text: "Chirurgen und Orthopäden"},
                {name: "gynaecologist", text: "Frauenärzte"},
                {name: "dermatologist", text: "Hautärzte"}
            ],
            "Bildung": [
                {name: "nursery", text: "Kindertagesstätten"},
                {name: "primary_school", text: "Primärschulen"},
                {name: "secondary_school_1", text: "Sekundarstufe Bereich 1, ohne (Fach)Hochschulreife"},
                {name: "secondary_school_2", text: "Sekundarstufe Bereich 1 und 2, mit Möglichkeit zu Erwerb der (Fach)Hochschulreife"}
            ]
        },
        selected_facility: "clinic"
    },
    stepThree: {
    },
    stepFour: {
        travel_mode: "driving-car",
        range_type: "discrete",
        range_max: 1800,
        range_steps: 10
    },
    stepFive: {
    },
    stepSix: {
        area_selection: null,
        area_extent: null
    },
    stepSeven: {
        status: "unfinished",

        show_result: false,
        show_population: false,

        plot_data_1: [],
        plot_data_2: []
    }
};

export default state;
