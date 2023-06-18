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
        supplyLevel: "",
        physicianGroups: {
            generalPhysician: ["Hausärzte"],
            generalSpecialist: ["Augenärzte", "Chirurgen und Orthopäden", "Frauenärzte", "Hautärzte", "HNO-Ärzte", "Kinderärzte", "Nervenärzte", "Psychotherapeuten", "Urologen"],
            specializedSpecialist: ["fachärztlich tätige Internisten", "Kinder- und Jugendpsychiater", "Radiologen", "Anästhesisten"],
            lowerSaxony: ["Hausärzte", "Augenärzte", "Chirurgen und Orthopäden", "Frauenärzte", "Hautärzte", "HNO-Ärzte", "Kinderärzte", "Nervenärzte", "Psychotherapeuten", "Urologen", "fachärztlich tätige Internisten", "Kinder- und Jugendpsychiater", "Radiologen", "Anästhesisten"]
        },
        physicianGroup: "Bitte wählen...",
        planningAreas: {
            generalPhysician: ["Aurich", "Emden", "Jever", "Norden", "Varel", "Wilhelmshaven", "Wittmund"],
            generalSpecialist: ["Aurich", "Emden", "Jever", "Norden", "Varel", "Wilhelmshaven", "Wittmund"],
            specializedSpecialist: ["Aurich", "Emden", "Jever", "Norden", "Varel", "Wilhelmshaven", "Wittmund"],
            lowerSaxony: ["Aurich", "Emden", "Jever", "Norden", "Varel", "Wilhelmshaven", "Wittmund"]
        },
        planningArea: "Bitte wählen..."
    },
    stepThree: {
        physicianAvailability: ""
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
    },
    stepFive: {
        distanceDecay: "",
        transport: ""
    },
    stepSix: {
        status: "unfinished",
        show_locations: false,
        show_scope: false,
        show_population: false,
        show_accessibility: false
    }
};

export default state;
