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
        subject: "Bitte wählen...",
        additionalDesignation: "Bitte wählen...",
        servicesRequiringAuthorization: "Bitte wählen...",
        empoweredPhys: {
            yes: false,
            no: false,
            onlyPhys: false
        },
        openingHours: {
            noRefinement: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    }
};

export default state;
