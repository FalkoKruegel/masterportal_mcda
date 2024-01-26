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
            "localSupply": {
                text: "localSupply.text",
                items: {
                    "supermarket": {text: "localSupply.supermarket"},
                    "discounter": {text: "localSupply.discounter"},
                    "other_local_supply": {text: "localSupply.otherLocalSupply", tooltip: "tooltip.otherLocalSupply"}
                }
            },
            "health": {
                text: "health.text",
                items: {
                    "pharmacy": {text: "health.pharmacy"},
                    "clinic": {text: "health.clinic"},
                    "physicians": {text: "health.physicians.text", items: {
                        "general_physician": {text: "health.physicians.generalPhysicians"},
                        "paediatrician": {text: "health.physicians.paediatrician"},
                        "ophthalmologist": {text: "health.physicians.ophthalmologist"},
                        "surgeon": {text: "health.physicians.surgeon"},
                        "gynaecologist": {text: "health.physicians.gynaecologist"},
                        "dermatologist": {text: "health.physicians.dermatologist"},
                        "otolaryngologist": {text: "health.physicians.otolaryngologist"},
                        "neurologist": {text: "health.physicians.neurologist"},
                        "psychotherapist": {text: "health.physicians.psychotherapists"},
                        "urologist": {text: "health.physicians.urologists"}
                    }
                    }
                }
            },
            "education": {
                text: "education.text",
                items: {
                    "nursery": {text: "education.nursery", tooltip: "tooltip.nursery"},
                    "primary_school": {text: "education.primarySchool", tooltip: "tooltip.primarySchool"},
                    "secondary_school_1": {text: "education.secondarySchool1", tooltip: "tooltip.secondarySchool1"},
                    "secondary_school_2": {text: "education.secondarySchool2", tooltip: "tooltip.secondarySchool2"}
                }
            }
        },

        // selected values
        selectedFacilities: {
            "localSupply": {
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

    // Accessibility Measurement
    stepFive: {
        // possibile values
        travelModes: {
            "driving-car": {text: "travelModes.pkw", valid: true},
            "public-transit": {text: "travelModes.opnv", valid: false},
            "walking-foot": {text: "travelModes.fuss", valid: false}
        },
        // minimum value which is allowed in TimInputs of step 5
        minValue: 0,
        // maximum value which is allowed in TimInputs of step 5
        maxValue: 70,

        // selected values
        transport: "driving-car",
        timeZones: {
            "localSupply": {
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
        facilityWeights: {
            "localSupply": {
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
