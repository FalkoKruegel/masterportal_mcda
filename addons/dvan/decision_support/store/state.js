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
    }
};

export default state;
