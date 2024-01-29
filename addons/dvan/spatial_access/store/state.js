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
            "generalPhysician": {text: "supplyLevels.generalPhysician"},
            "generalSpecialist": {text: "supplyLevels.generalSpecialist"},
            "specializedSpecialist": {text: "supplyLevels.specializedSpecialist"},
            "lowerSaxony": {text: "supplyLevels.lowerSaxony"}
        },
        physicianGroups: {
            generalPhysician: {
                "general_physician": {text: "physicians.generalPhysician"}
            },
            generalSpecialist: {
                "augenarzte": {text: "physicians.augenarzte"},
                "surgeon": {text: "physicians.surgeon"},
                "frauenarzte": {text: "physicians.frauenarzte"},
                "dermatologist": {text: "physicians.dermatologist"},
                "hno_arzte": {text: "physicians.hnoArzte"},
                "paediatrician": {text: "physicians.paediatrician"},
                "neurologist": {text: "physicians.neurologist"},
                "psychotherapist": {text: "physicians.psychotherapist"},
                "urologist": {text: "physicians.urologist"}
            },
            specializedSpecialist: {
                "internisten": {text: "physicians.internisten"},
                "jugendpsychiater": {text: "physicians.jugendpsychiater"},
                "radiologen": {text: "physicians.radiologen"},
                "anasthesisten": {text: "physicians.anasthesisten"}
            },
            lowerSaxony: {
                "augenarzte": {text: "physicians.augenarzte"},
                "surgeon": {text: "physicians.surgeon"},
                "frauenarzte": {text: "physicians.frauenarzte"},
                "dermatologist": {text: "physicians.dermatologist"},
                "hno_arzte": {text: "physicians.hnoArzte"},
                "paediatrician": {text: "physicians.paediatrician"},
                "neurologist": {text: "physicians.neurologist"},
                "psychotherapist": {text: "physicians.psychotherapist"},
                "urologist": {text: "physicians.urologist"},
                "internisten": {text: "physicians.internisten"},
                "jugendpsychiater": {text: "physicians.jugendpsychiater"},
                "radiologen": {text: "physicians.radiologen"},
                "anasthesisten": {text: "physicians.anasthesisten"}
            }
        },
        planningAreas: {
            generalPhysician: {
                "aurich": {text: "planningAreas.aurich"},
                "emden": {text: "planningAreas.emden"},
                "jever": {text: "planningAreas.jever"},
                "norden": {text: "planningAreas.norden"},
                "varel": {text: "planningAreas.varel"},
                "wilhelmshaven": {text: "planningAreas.wilhelmshaven"},
                "wittmund": {text: "planningAreas.wittmund"}
            },
            generalSpecialist: {
                "aurich": {text: "planningAreas.aurich"},
                "emden": {text: "planningAreas.emden"},
                "jever": {text: "planningAreas.jever"},
                "norden": {text: "planningAreas.norden"},
                "varel": {text: "planningAreas.varel"},
                "wilhelmshaven": {text: "planningAreas.wilhelmshaven"},
                "wittmund": {text: "planningAreas.wittmund"}
            },
            specializedSpecialist: {
                "aurich": {text: "planningAreas.aurich"},
                "emden": {text: "planningAreas.emden"},
                "jever": {text: "planningAreas.jever"},
                "norden": {text: "planningAreas.norden"},
                "varel": {text: "planningAreas.varel"},
                "wilhelmshaven": {text: "planningAreas.wilhelmshaven"},
                "wittmund": {text: "planningAreas.wittmund"}
            },
            lowerSaxony: {
                "aurich": {text: "planningAreas.aurich"},
                "emden": {text: "planningAreas.emden"},
                "jever": {text: "planningAreas.jever"},
                "norden": {text: "planningAreas.norden"},
                "varel": {text: "planningAreas.varel"},
                "wilhelmshaven": {text: "planningAreas.wilhelmshaven"},
                "wittmund": {text: "planningAreas.wittmund"}
            }
        },
        // selected values
        supplyLevel: "",
        physicianGroup: "unselected",
        planningArea: "unselected"
    },

    // Select Physician Capacity
    stepThree: {
        // possibile values
        availabilityOptions: {
            "facility": {text: "physicianCapacities.facility", valid: true},
            "physicianNumber": {text: "physicianCapacities.physicianNumber", valid: true},
            "employmentVolume": {text: "physicianCapacities.employmentVolume", valid: true},
            "demandLimit": {text: "physicianCapacities.demandLimit", valid: false}
        },
        // selected value
        physicianAvailability: ""
    },

    // Select Population
    stepFour: {
        // possibile values
        population: {
            standard: {
                text: "population.groups.standard",
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
                text: "population.groups.kitaSchul",
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
            "driving-car": {text: "travelModes.pkw", valid: true},
            "public-transit": {text: "travelModes.opnv", valid: false}
        },
        distanceDecays: {
            "linear": {text: "distanceDecays.linear"},
            "patient_behavior": {text: "distanceDecays.patientBehavior"},
            "minimum_standards": {text: "distanceDecays.minimumStandards"}
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
