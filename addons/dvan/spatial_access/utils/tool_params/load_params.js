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

    if (obj.type !== "Räumlicher Zugang") {
        return false;
    }

    store.commit("Tools/SpatialAccess/setStepTwo", obj.params.stepTwo);
    store.commit("Tools/SpatialAccess/setStepThree", obj.params.stepThree);
    store.commit("Tools/SpatialAccess/setStepFour", obj.params.stepFour);
    store.commit("Tools/SpatialAccess/setStepFive", obj.params.stepFive);

    return true;
}

/**
 * stores parameters from state into obj
 * @returns {any} state object
 */
function storeToolParams () {
    const obj = {};

    obj.type = "Räumlicher Zugang";
    obj.params = {};

    obj.params.stepTwo = store.getters["Tools/SpatialAccess/stepTwo"];
    obj.params.stepThree = store.getters["Tools/SpatialAccess/stepThree"];
    obj.params.stepFour = store.getters["Tools/SpatialAccess/stepFour"];
    obj.params.stepFive = store.getters["Tools/SpatialAccess/stepFive"];

    obj.key = HASH_KEY;
    const h = hash(obj);

    obj.key = h;

    return obj;
}

export {loadToolParams, storeToolParams};
