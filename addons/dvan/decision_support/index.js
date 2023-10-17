import component from "./components/DecisionSupport.vue";
import store from "./store";
import deLocale from "./locales/de/additional.json";
import enLocale from "./locales/en/additional.json";

export default {
    component: component,
    store: store,
    locales: {
        de: deLocale,
        en: enLocale
    }
};
