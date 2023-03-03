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
    SET_VERY_GOOD (currentState, payload) {
        if (payload.value >= currentState.stepFive[payload.category][payload.infrastructure].good) {
            currentState.stepFive[payload.category][payload.infrastructure].good = payload.value + 1;
        }
        currentState.stepFive[payload.category][payload.infrastructure].very_good = payload.value;
    },
    // folowing mutations updates the good property in a specified category and infrastructure of the state
    // it also ensures that the corresponding sufficient-property will be updated if it is smaller than the new good property
    // it also ensures that the corresponding very good-property will be updated if it is bigger than the new good property
    SET_GOOD (currentState, payload) {
        if (payload.value >= currentState.stepFive[payload.category][payload.infrastructure].sufficient) {
            currentState.stepFive[payload.category][payload.infrastructure].sufficient = payload.value + 1;
        }
        if (payload.value <= currentState.stepFive[payload.category][payload.infrastructure].very_good) {
            currentState.stepFive[payload.category][payload.infrastructure].very_good = payload.value - 1;
        }
        currentState.stepFive[payload.category][payload.infrastructure].good = payload.value;
    },
    // folowing mutations updates the sufficient property in a specified category and infrastructure of the state
    // it also ensures that the corresponding deficient-property will be updated if it is smaller than the new sufficient property
    // it also ensures that the corresponding good-property will be updated if it is bigger than the new sufficient property
    SET_SUFFICIENT (currentState, payload) {
        if (payload.value >= currentState.stepFive[payload.category][payload.infrastructure].deficient) {
            currentState.stepFive[payload.category][payload.infrastructure].deficient = payload.value + 1;
        }
        if (payload.value <= currentState.stepFive[payload.category][payload.infrastructure].good) {
            currentState.stepFive[payload.category][payload.infrastructure].good = payload.value - 1;
        }
        currentState.stepFive[payload.category][payload.infrastructure].sufficient = payload.value;
    },
    // folowing mutations updates the deficient property in a specified category and infrastructure of the state
    // it also ensures that the corresponding sufficent-property will be updated if it is bigger than the new deficient property
    SET_DEFICIENT (currentState, payload) {
        if (payload.value <= currentState.stepFive[payload.category][payload.infrastructure].sufficient) {
            currentState.stepFive[payload.category][payload.infrastructure].sufficient = payload.value - 1;
        }
        currentState.stepFive[payload.category][payload.infrastructure].deficient = payload.value;
    }


};

export default mutations;
