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
    stepThree: {
        physicianAvailability: {
            facility: false,
            physicianNumber: false,
            employmentVolume: false,
            demandLimit: false
        }
    }
};

export default state;
