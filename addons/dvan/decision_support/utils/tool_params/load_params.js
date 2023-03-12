import store from "/src/app-store";
import hash from "object-hash";

const HASH_KEY = "284898r49jfc399girjfi";

/**
 * loads parameters from obj into state
 * @param {*} obj parameters object
 * @returns {boolean} true if successful
 */
function loadToolParams (obj) {
    if (!("key" in obj) || !("type" in obj) || !("params" in obj)) {
        return false;
    }

    const h = obj.key;

    obj.key = HASH_KEY;
    if (hash(obj) !== h) {
        return false;
    }

    if (obj.type !== "Entscheidungsunterstützung") {
        return false;
    }

    store.commit("Tools/DecisionSupport/setStepTwo", obj.params.stepTwo);
    store.commit("Tools/DecisionSupport/setStepThree", obj.params.stepThree);
    store.commit("Tools/DecisionSupport/setStepFour", obj.params.stepFour);
    store.commit("Tools/DecisionSupport/setStepFive", obj.params.stepFive);
    store.commit("Tools/DecisionSupport/setStepSix", obj.params.stepSix);

    return true;
}

/**
 * stores parameters from state into obj
 * @returns {any} state object
 */
function storeToolParams () {
    const obj = {};

    obj.type = "Entscheidungsunterstützung";
    obj.params = {};

    obj.params.stepTwo = store.getters["Tools/DecisionSupport/stepTwo"];
    obj.params.stepThree = store.getters["Tools/DecisionSupport/stepThree"];
    obj.params.stepFour = store.getters["Tools/DecisionSupport/stepFour"];
    obj.params.stepFive = store.getters["Tools/DecisionSupport/stepFive"];
    obj.params.stepSix = store.getters["Tools/DecisionSupport/stepSix"];

    obj.key = HASH_KEY;
    const h = hash(obj);

    obj.key = h;

    return obj;
}

export {loadToolParams, storeToolParams};
