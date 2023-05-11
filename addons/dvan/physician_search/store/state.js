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
        specialServices: {
            subject: "Bitte wählen...",
            additionalDesignation: "Bitte wählen...",
            servicesRequiringAuthorization: "Bitte wählen..."
        },
        empoweredPhys: {
            yes: false,
            no: true,
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
        },
        accessibilityAndLanguages: {
            accessibility: "Bitte wählen...",
            languages: "Bitte wählen..."
        }
    },
    stepThree: {
        distance: {
            distanceActivated: false,
            distanceSmallerThan: 0
        },
        time: {
            timeActivated: false,
            timeSmallerThan: 0
        },
        transport: "pkw"
    }
};

export default state;
