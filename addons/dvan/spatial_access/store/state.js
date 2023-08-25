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
        standardAgeGroups: {
            "std_0_9": {text: "0-9 Jahre"},
            "std_10_19": {text: "10-19 Jahre"},
            "std_20_39": {text: "20-39 Jahre"},
            "std_40_49": {text: "40-49 Jahre"},
            "std_50_59": {text: "50-59 Jahre"},
            "std_60_79": {text: "60-79 Jahre"},
            "std_80x": {text: "ab 80 Jahre"}
        },
        kidsAgeGroups: {
            "ksc_0_2": {text: "0-2 Jahre"},
            "ksc_3_5": {text: "3-5 Jahre"},
            "ksc_6_9": {text: "6-9 Jahre"},
            "ksc_10_14": {text: "10-14 Jahre"},
            "ksc_15_17": {text: "15-17 Jahre"},
            "ksc_18_19": {text: "18-19 Jahre"},
            "ksc_20x": {text: "ab 20 Jahre"}
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
