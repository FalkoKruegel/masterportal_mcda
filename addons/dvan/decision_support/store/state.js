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
    stepTwo: {
        wholeLowerSaxony: false,
        ownArea: false
    },
    stepThree: {
        local_supply: {
            supermarket: false,
            discounter: false,
            others: false
        },
        health: {
            pharmacies: false,
            clinics: false,
            general_physicians: false,
            paediatricians: false,
            ophthalmologists: false,
            surgeons: false,
            gynaecologists: false,
            dermatologists: false,
            otolaryngologist: false,
            neurologist: false,
            psychotherapists: false,
            urologists: false
        },
        education: {
            nurseries: false,
            primary_schools: false,
            secondary_1: false,
            secondary_2: false
        }
    },
    stepFour: {
        standard: {
            first: false,
            second: false,
            third: false,
            fourth: false,
            fifth: false,
            sixth: false,
            seventh: false
        },
        kita: {
            first: false,
            second: false,
            third: false,
            fourth: false,
            fifth: false,
            sixth: false,
            seventh: false
        }
    },
    stepSix: {
        local_supply: {
            supermarket: 0,
            discounter: 0,
            others: 0
        },
        health: {
            pharmacies: 0,
            clinics: 0,
            physicians: 0
        },
        education: {
            nurseries: 0,
            primary_schools: 0,
            secondary_1: 0,
            secondary_2: 0
        }
    },
    stepFive: {
        // either "pkw", "public_transport", or "foot". "pkw" is default
        transport: "pkw",
        local_supply: {
            supermarket: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            },
            discounter: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            },
            others: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            }
        },
        health: {
            pharmacies: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            },
            clinics: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            },
            physicians: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            }
        },
        education: {
            nurseries: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            },
            primary_schools: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            },
            secondary_1: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            },
            secondary_2: {
                very_good: 5,
                good: 10,
                sufficient: 25,
                deficient: 30
            }
        }
    }
};

export default state;
