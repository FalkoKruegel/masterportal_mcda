const Config = {
    wfsImgPath: "./resources/img/",
    namedProjections: [
        ["EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"]
    ],
    footer: {
        urls: [
            {
                "bezeichnung": "common:modules.footer.designation",
                "url": "https://www.lgln.niedersachsen.de/",
                "alias": "Landesbetrieb Geoinformation und Vermessung",
                "alias_mobil": "LGLN"
            }
        ],
        showVersion: true
    },
    quickHelp: {
        imgPath: "./resources/img/"
    },
    layerConf: "./resources/services-internet.json",
    restConf: "./resources/rest-services-internet.json",
    styleConf: "./resources/style_v3.json",
    scaleLine: true,
    mouseHover: {
        numFeaturesToShow: 2,
        infoText: "(weitere Objekte. Bitte zoomen.)"
    },
    addons: ["DecisionSupport", "SpatialAccess", "PhysicianSearch", "AccessibilitiesLgln", "DegreeOfSupply"],
    portalLanguage: {
        enabled: true,
        debug: false,
        languages: {
            de: "Deutsch",
            en: "English"
        },
        fallbackLanguage: "de",
        changeLanguageOnStartWhen: ["querystring", "localStorage", "htmlTag"]
    }
};

// conditional export to make config readable by e2e tests
if (typeof module !== "undefined") {
    module.exports = Config;
}
