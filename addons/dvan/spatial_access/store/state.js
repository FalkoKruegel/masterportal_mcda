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
    stepTwo: {
        supplyLevel: {
            generalPhysician: false,
            generalSpecialist: false,
            specializedSpecialist: false,
            lowerSaxony: false
        },
        physicianGroup: "Bitte wählen...",
        planningArea: "Bitte wählen..."
    },
    stepThree: {
        physicianAvailability: {
            facility: false,
            physicianNumber: false,
            employmentVolume: false,
            demandLimit: false
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
        kids: {
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
