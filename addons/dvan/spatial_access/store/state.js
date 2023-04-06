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
        }
    }
};

export default state;
