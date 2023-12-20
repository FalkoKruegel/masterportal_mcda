const state = {
    // mandatory
    active: false,
    id: "SpatialAccess",
    // mandatory defaults for config.json parameters
    name: "Räumlicher Zugang",
    icon: "bi-geo",
    renderToWindow: false,
    resizableWindow: true,
    isVisibleInMenu: true,
    deactivateGFI: false,

    // Select Physicians
    stepTwo: {
        // possibile values
        supplyLevels: {
            "generalPhysician": {text: "Hausärztliche Versorgung - Versorgungsebene 1"},
            "generalSpecialist": {text: "Allgemeine fachärztliche Versorgung  - Versorgungsebene 2"},
            "specializedSpecialist": {text: "Spezialisierte fachärztliche Versorgung - Versorgungsebene 3"},
            "lowerSaxony": {text: "Niedersachsen - Versorgungsebene / KV-Bezirk"}
        },
        physicianGroups: {
            generalPhysician: {
                "general_physician": {text: "Hausärzte"}
            },
            generalSpecialist: {
                "augenarzte": {text: "Augenärzte"},
                "surgeon": {text: "Chirurgen und Orthopäden"},
                "frauenarzte": {text: "Frauenärzte"},
                "dermatologist": {text: "Hautärzte"},
                "hno_arzte": {text: "HNO-Ärzte"},
                "paediatrician": {text: "Kinderärzte"},
                "neurologist": {text: "Nervenärzte"},
                "psychotherapist": {text: "Psychotherapeuten"},
                "urologist": {text: "Urologen"}
            },
            specializedSpecialist: {
                "internisten": {text: "fachärztlich tätige Internisten"},
                "jugendpsychiater": {text: "Kinder- und Jugendpsychiater"},
                "radiologen": {text: "Radiologen"},
                "anasthesisten": {text: "Anästhesisten"}
            },
            lowerSaxony: {
                "augenarzte": {text: "Augenärzte"},
                "surgeon": {text: "Chirurgen und Orthopäden"},
                "frauenarzte": {text: "Frauenärzte"},
                "dermatologist": {text: "Hautärzte"},
                "hno_arzte": {text: "HNO-Ärzte"},
                "paediatrician": {text: "Kinderärzte"},
                "neurologist": {text: "Nervenärzte"},
                "psychotherapist": {text: "Psychotherapeuten"},
                "urologist": {text: "Urologen"},
                "internisten": {text: "fachärztlich tätige Internisten"},
                "jugendpsychiater": {text: "Kinder- und Jugendpsychiater"},
                "radiologen": {text: "Radiologen"},
                "anasthesisten": {text: "Anästhesisten"}
            }
        },
        planningAreas: {
            generalPhysician: {
                "aurich": {text: "Aurich"},
                "emden": {text: "Emden"},
                "jever": {text: "Jever"},
                "norden": {text: "Norden"},
                "varel": {text: "Varel"},
                "wilhelmshaven": {text: "Wilhelmshaven"},
                "wittmund": {text: "Wittmund"}
            },
            generalSpecialist: {
                "aurich": {text: "Aurich"},
                "emden": {text: "Emden"},
                "jever": {text: "Jever"},
                "norden": {text: "Norden"},
                "varel": {text: "Varel"},
                "wilhelmshaven": {text: "Wilhelmshaven"},
                "wittmund": {text: "Wittmund"}
            },
            specializedSpecialist: {
                "aurich": {text: "Aurich"},
                "emden": {text: "Emden"},
                "jever": {text: "Jever"},
                "norden": {text: "Norden"},
                "varel": {text: "Varel"},
                "wilhelmshaven": {text: "Wilhelmshaven"},
                "wittmund": {text: "Wittmund"}
            },
            lowerSaxony: {
                "aurich": {text: "Aurich"},
                "emden": {text: "Emden"},
                "jever": {text: "Jever"},
                "norden": {text: "Norden"},
                "varel": {text: "Varel"},
                "wilhelmshaven": {text: "Wilhelmshaven"},
                "wittmund": {text: "Wittmund"}
            }
        },
        // selected values
        supplyLevel: "",
        physicianGroup: "Bitte wählen...",
        planningArea: "Bitte wählen..."
    },

    // Select Physician Capacity
    stepThree: {
        // possibile values
        availabilityOptions: {
            "facility": {text: "Betriebsstättenbetrachtung", valid: true},
            "physicianNumber": {text: "Facharztzahl an der Betriebsstätte", valid: true},
            "employmentVolume": {text: "Beschäftigungsumfang der Fachärzte an den Betriebsstätten", valid: true},
            "demandLimit": {text: "Fallzahlabhängige Bedarfsgrenzen an den Betriebsstätten", valid: false}
        },
        // selected value
        physicianAvailability: ""
    },

    // Select Population
    stepFour: {
        // possibile values
        population: {
            standard: {
                text: "stepFour.accordion.accordion4_2",
                items: {
                    "std_00_09": [0, 9],
                    "std_10_19": [10, 19],
                    "std_20_39": [20, 39],
                    "std_40_59": [40, 59],
                    "std_60_79": [60, 79],
                    "std_80x": [80]
                }
            },
            kids: {
                text: "stepFour.accordion.accordion4_3",
                items: {
                    "ksc_00_02": [0, 2],
                    "ksc_03_05": [3, 5],
                    "ksc_06_09": [6, 9],
                    "ksc_10_14": [10, 14],
                    "ksc_15_17": [15, 17],
                    "ksc_18_19": [18, 19],
                    "ksc_20x": [20]
                }
            }
        },
        // selected values
        populationType: "",
        selectedAgeGroups: []
    },

    // Select Distance Decay
    stepFive: {
        // possibile values
        travelModes: {
            "driving-car": {text: "PKW", valid: true},
            "public-transit": {text: "ÖPNV", valid: false}
        },
        distanceDecays: {
            "linear": {text: "Linear"},
            "patient_behavior": {text: "KV-Abrechnungsdaten / Patientenverhalten"},
            "minimum_standards": {text: "Mindesterreichbarkeitsstandards"}
        },
        // selected values
        distanceDecay: "",
        transport: ""
    },

    // Results
    stepSix: {
        status: "unfinished",
        show_locations: false,
        show_scope: false,
        show_population: false,
        show_accessibility: false
    }
};

export default state;
