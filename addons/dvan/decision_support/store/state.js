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
    }
};

export default state;
