const state = {
    // mandatory
    active: false,
    id: "PhysicianSearch",
    // mandatory defaults for config.json parameters
    name: "Arztsuche",
    icon: "bi bi-search",
    renderToWindow: false,
    resizableWindow: true,
    isVisibleInMenu: true,
    deactivateGFI: false,
    stepOne: {
        location: {
            longitude: null,
            latitude: null
        }
    },
    stepTwo: {
        medicalService: {
            generalPhysician: false,
            specialist: false,
            psychotherapist: false
        },
        empoweredPhys: {
            yes: false,
            no: false,
            onlyPhys: false
        }

    }
};

export default state;
