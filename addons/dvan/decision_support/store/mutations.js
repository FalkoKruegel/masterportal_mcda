import {generateSimpleMutations} from "/src/app-store/utils/generators";
import state from "./state";

const mutations = {
    /**
     * Creates from every state-key a setter.
     * For example, given a state object {key: value}, an object
     * {setKey:   (state, payload) => *   state[key] = payload * }
     * will be returned.
     */
    ...generateSimpleMutations(state),
    // setters for the different time zones in step 5
    // folowing mutations updates the very good property in a specified category and infrastructure of the state
    // it also ensures that the corresponding good-property will be updated if it is smaller than the new very good property
    // it also ensures that the very_good property will not drop below or rise above the minValue/maxValue specified in the state
    SET_VERY_GOOD (currentState, payload) {
        if (payload.value >= currentState.stepFive[payload.category][payload.infrastructure].good) {
            payload.store.commit("Tools/DecisionSupport/SET_GOOD", {store: payload.store, category: payload.category, infrastructure: payload.infrastructure, value: payload.value + 1});
        }
        if (payload.value >= currentState.stepFive.minValue && payload.value <= currentState.stepFive.maxValue) {
            currentState.stepFive[payload.category][payload.infrastructure].very_good = payload.value;
        }
    },
    // folowing mutations updates the good property in a specified category and infrastructure of the state
    // it also ensures that the corresponding sufficient-property will be updated if it is smaller than the new good property
    // it also ensures that the corresponding very good-property will be updated if it is bigger than the new good property
    // it also ensures that the good property will not drop below or rise above the minValue/maxValue specified in the state
    SET_GOOD (currentState, payload) {
        if (payload.value >= currentState.stepFive[payload.category][payload.infrastructure].sufficient) {
            payload.store.commit("Tools/DecisionSupport/SET_SUFFICIENT", {store: payload.store, category: payload.category, infrastructure: payload.infrastructure, value: payload.value + 1});
        }
        if (payload.value <= currentState.stepFive[payload.category][payload.infrastructure].very_good) {
            payload.store.commit("Tools/DecisionSupport/SET_VERY_GOOD", {store: payload.store, category: payload.category, infrastructure: payload.infrastructure, value: payload.value - 1});
        }
        if (payload.value >= currentState.stepFive.minValue && payload.value <= currentState.stepFive.maxValue) {
            currentState.stepFive[payload.category][payload.infrastructure].good = payload.value;
        }
    },
    // folowing mutations updates the sufficient property in a specified category and infrastructure of the state
    // it also ensures that the corresponding deficient-property will be updated if it is smaller than the new sufficient property
    // it also ensures that the corresponding good-property will be updated if it is bigger than the new sufficient property
    // it also ensures that the suficient property will not drop below or rise above the minValue/maxValue specified in the state
    SET_SUFFICIENT (currentState, payload) {
        if (payload.value >= currentState.stepFive[payload.category][payload.infrastructure].deficient) {
            payload.store.commit("Tools/DecisionSupport/SET_DEFICIENT", {store: payload.store, category: payload.category, infrastructure: payload.infrastructure, value: payload.value + 1});
        }
        if (payload.value <= currentState.stepFive[payload.category][payload.infrastructure].good) {
            payload.store.commit("Tools/DecisionSupport/SET_GOOD", {store: payload.store, category: payload.category, infrastructure: payload.infrastructure, value: payload.value - 1});
        }
        if (payload.value >= currentState.stepFive.minValue && payload.value <= currentState.stepFive.maxValue) {
            currentState.stepFive[payload.category][payload.infrastructure].sufficient = payload.value;
        }
    },
    // folowing mutations updates the deficient property in a specified category and infrastructure of the state
    // it also ensures that the corresponding sufficent-property will be updated if it is bigger than the new deficient property
    // it also ensures that the deficient property will not drop below or rise above the minValue/maxValue specified in the state
    SET_DEFICIENT (currentState, payload) {
        if (payload.value <= currentState.stepFive[payload.category][payload.infrastructure].sufficient) {
            payload.store.commit("Tools/DecisionSupport/SET_SUFFICIENT", {store: payload.store, category: payload.category, infrastructure: payload.infrastructure, value: payload.value - 1});
        }
        if (payload.value >= currentState.stepFive.minValue && payload.value <= currentState.stepFive.maxValue) {
            currentState.stepFive[payload.category][payload.infrastructure].deficient = payload.value;
        }
    }


};

export default mutations;
