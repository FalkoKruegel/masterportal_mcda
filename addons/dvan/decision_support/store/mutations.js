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
    SET_VERY_GOOD (currentState, category, infrastructure, value) {
        if (value >= currentState.stepFive[category][infrastructure].good) {
            currentState.stepFive[category][infrastructure].good = value + 1;
        }
        currentState.stepFive[category][infrastructure].very_good = value;
    },
    // folowing mutations updates the good property in a specified category and infrastructure of the state
    // it also ensures that the corresponding sufficient-property will be updated if it is smaller than the new good property
    // it also ensures that the corresponding very good-property will be updated if it is bigger than the new good property
    SET_GOOD (currentState, category, infrastructure, value) {
        if (value >= currentState.stepFive[category][infrastructure].sufficient) {
            currentState.stepFive[category][infrastructure].sufficient = value + 1;
        }
        if (value <= currentState.stepFive[category][infrastructure].very_good) {
            currentState.stepFive[category][infrastructure].very_good = value - 1;
        }
        currentState.stepFive[category][infrastructure].good = value;
    },
    // folowing mutations updates the sufficient property in a specified category and infrastructure of the state
    // it also ensures that the corresponding deficient-property will be updated if it is smaller than the new sufficient property
    // it also ensures that the corresponding good-property will be updated if it is bigger than the new sufficient property
    SET_SUFFICIENT (currentState, category, infrastructure, value) {
        if (value >= currentState.stepFive[category][infrastructure].deficient) {
            currentState.stepFive[category][infrastructure].deficient = value + 1;
        }
        if (value <= currentState.stepFive[category][infrastructure].good) {
            currentState.stepFive[category][infrastructure].good = value - 1;
        }
        currentState.stepFive[category][infrastructure].sufficient = value;
    },
    // folowing mutations updates the deficient property in a specified category and infrastructure of the state
    // it also ensures that the corresponding sufficent-property will be updated if it is bigger than the new deficient property
    SET_DEFICIENT (currentState, category, infrastructure, value) {
        if (value <= currentState.stepFive[category][infrastructure].sufficient) {
            currentState.stepFive[category][infrastructure].sufficient = value - 1;
        }
        currentState.stepFive[category][infrastructure].deficient = value;
    }


};

export default mutations;
