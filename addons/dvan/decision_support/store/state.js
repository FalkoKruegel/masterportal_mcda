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
                    "physicians": {isGroup: true, text: "health.physicians.text", items: {
                        "general_physicians": {text: "health.physicians.generalPhysicians"},
                        "paediatrician": {text: "health.physicians.paediatrician"},
                        "ophthalmologist": {text: "health.physicians.ophthalmologist"},
                        "surgeon": {text: "health.physicians.surgeon"},
                        "gynaecologist": {text: "health.physicians.gynaecologist"},
                        "dermatologist": {text: "health.physicians.dermatologist"},
                        "otolaryngologist": {text: "health.physicians.otolaryngologist"},
                        "neurologist": {text: "health.physicians.neurologist"},
                        "psychotherapists": {text: "health.physicians.psychotherapists"},
                        "urologists": {text: "health.physicians.urologists"}
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
            "std_00_09": {text: "standardAgeGroups.std_00_09"},
            "std_10_19": {text: "standardAgeGroups.std_10_19"},
            "std_20_39": {text: "standardAgeGroups.std_20_39"},
            "std_40_59": {text: "standardAgeGroups.std_40_59"},
            "std_60_79": {text: "standardAgeGroups.std_60_79"},
            "std_80x": {text: "standardAgeGroups.std_80x"}
        },
        kidsAgeGroups: {
            "ksc_00_02": {text: "kidsAgeGroups.ksc_00_02"},
            "ksc_03_05": {text: "kidsAgeGroups.ksc_03_05"},
            "ksc_06_09": {text: "kidsAgeGroups.ksc_06_09"},
            "ksc_10_14": {text: "kidsAgeGroups.ksc_10_14"},
            "ksc_15_17": {text: "kidsAgeGroups.ksc_15_17"},
            "ksc_18_19": {text: "kidsAgeGroups.ksc_18_19"},
            "ksc_20x": {text: "kidsAgeGroups.ksc_20x"}
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
