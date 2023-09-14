const state = {
    // mandatory
    active: false,
    id: "DecisionSupport",
    // mandatory defaults for config.json parameters
    name: "Entscheidungsunterstützung",
    icon: "bi-signpost-2-fill",
    renderToWindow: false,
    resizableWindow: true,
    isVisibleInMenu: true,
    deactivateGFI: false,

    // Select Study Area
    stepTwo: {
        wholeLowerSaxony: false,
        ownArea: false,
        ownAreaExtent: null
    },

    // Select Infrastructures
    stepThree: {
        // posibile values
        facilities: {
            "local_supply": {
                text: "Nahversorgung",
                items: {
                    "supermarket": {text: "Supermärkte"},
                    "discounter": {text: "Discounter"},
                    "other_local_supply": {text: "sonstige Lebensmittelgeschäfte", tooltip: "Hierzu zählen Standorte des Lebensmittelhandwerkes<br> (Bäcker/Fleischer), Hof- und Bioläden und sonstige<br> Lebensmittelgeschäfte."}
                }
            },
            "health": {
                text: "Gesundheit",
                items: {
                    "pharmacy": {text: "Apotheken"},
                    "clinic": {text: "Hochschulkliniken und Plankrankenhäuser"},
                    "physicians": {isGroup: true, text: "Ärzte", items: {
                        "general_physicians": {text: "Hausärzte"},
                        "paediatrician": {text: "Kinder- und Jugendärzte"},
                        "ophthalmologist": {text: "Augenärzte"},
                        "surgeon": {text: "Chirurgen und Orthopäden"},
                        "gynaecologist": {text: "Frauenärzte"},
                        "dermatologist": {text: "Hautärzte"},
                        "otolaryngologist": {text: "HNO-Ärzte"},
                        "neurologist": {text: "Nervenärzte"},
                        "psychotherapists": {text: "Psychotherapeuten"},
                        "urologists": {text: "Urologen"}
                    }
                    }
                }
            },
            "education": {
                text: "Bildung",
                items: {
                    "nursery": {text: "Kindertagesstätten", tooltip: "Einrichtungen zur Betreuung von Kindern  bis zum sechsten Lebensjahr. Ohne Horteinrichtungen."},
                    "primary_school": {text: "Primärschulen", tooltip: "Primärbereich umfasst die 1. bis 4. Schuljahrgänge."},
                    "secondary_school_1": {text: "Sekundarstufe Bereich 1, ohne (Fach)Hochschulreife", tooltip: "Haupt-, Real-, Ober- und Gesamtschulen ohne Möglichkeit zum Erwerb der (Fach)Hochschulreife."},
                    "secondary_school_2": {text: "Sekundarstufe Bereich 1 und 2, mit Möglichkeit zu Erwerb der (Fach)Hochschulreife", tooltip: "Gesamtschulen und Gymnasien mit Möglichkeiten zum Erwerb der (Fach)Hochschulreife."}
                }
            }
        },

        // selected values
        selected_facilities: {
            "local_supply": {
                "supermarket": "",
                "discounter": "",
                "other_local_supply": ""
            },
            "health": {
                "pharmacy": "",
                "clinic": "",
                "physicians": ""
            },
            "education": {
                "nursery": "",
                "primary_school": "",
                "secondary_school_1": "",
                "secondary_school_2": ""
            }
        }
    },

    // Select Population
    stepFour: {
        // possibile values
        standardAgeGroups: {
            "std_00_09": {text: "0-9 Jahre"},
            "std_10_19": {text: "10-19 Jahre"},
            "std_20_39": {text: "20-39 Jahre"},
            "std_40_59": {text: "40-59 Jahre"},
            "std_60_79": {text: "60-79 Jahre"},
            "std_80x": {text: "ab 80 Jahre"}
        },
        kidsAgeGroups: {
            "ksc_00_02": {text: "0-2 Jahre"},
            "ksc_03_05": {text: "3-5 Jahre"},
            "ksc_06_09": {text: "6-9 Jahre"},
            "ksc_10_14": {text: "10-14 Jahre"},
            "ksc_15_17": {text: "15-17 Jahre"},
            "ksc_18_19": {text: "18-19 Jahre"},
            "ksc_20x": {text: "ab 20 Jahre"}
        },
        // selected values
        populationType: "",
        selectedAgeGroups: []
    },

    // Accessibility Measurement
    stepFive: {
        // possibile values
        travelModes: {
            "driving-car": {text: "PKW", valid: true},
            "public-transit": {text: "ÖPNV", valid: false},
            "walking-foot": {text: "Fuß", valid: false}
        },
        // minimum value which is allowed in TimInputs of step 5
        minValue: 0,
        // maximum value which is allowed in TimInputs of step 5
        maxValue: 70,

        // selected values
        transport: "driving-car",
        time_zones: {
            "local_supply": {
                "supermarket": [2, 5, 10, 20],
                "discounter": [2, 5, 10, 20],
                "other_local_supply": [2, 5, 10, 20]
            },
            "health": {
                "pharmacy": [2, 4, 8, 15],
                "clinic": [3, 7, 15, 30],
                "physicians": [3, 7, 13, 25]
            },
            "education": {
                "nursery": [2, 7, 15, 30],
                "primary_school": [2, 5, 23, 45],
                "secondary_school_1": [2, 15, 30, 60],
                "secondary_school_2": [2, 15, 30, 60]
            }
        }
    },

    // Select Infrastructure Weights
    stepSix: {
        // selected values
        facility_weights: {
            "local_supply": {
                "supermarket": 0,
                "discounter": 0,
                "other_local_supply": 0
            },
            "health": {
                "pharmacy": 0,
                "clinic": 0,
                "physicians": 0
            },
            "education": {
                "nursery": 0,
                "primary_school": 0,
                "secondary_school_1": 0,
                "secondary_school_2": 0
            }
        }
    },

    // Settings Summary
    stepSeven: {
        status: "changed"
    },
    stepEight: {
        status: "unfinished"
    }
};

export default state;
