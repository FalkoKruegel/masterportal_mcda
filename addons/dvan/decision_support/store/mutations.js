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
    SET_VERY_GOOD (category, infrastructure, value) {
        if (value >= state.stepFive[category][infrastructure].good) {
            state.stepFive[category][infrastructure].good = value + 1;
        }
        state.stepFive[infrastructure].very_good = value;
    },
    SET_GOOD (category, infrastructure, value) {
        if (value >= state.stepFive[category][infrastructure].sufficient) {
            state.stepFive[category][infrastructure].sufficient = value + 1;
        }
        if (value <= state.stepFive[category][infrastructure].very_good) {
            state.stepFive[category][infrastructure].very_good = value - 1;
        }
        state.stepFive[category][infrastructure].good = value;
    },
    SET_SUFFICIENT (category, infrastructure, value) {
        if (value >= state.stepFive[category][infrastructure].deficient) {
            state.stepFive[category][infrastructure].deficient = value + 1;
        }
        if (value <= state.stepFive[category][infrastructure].good) {
            state.stepFive[category][infrastructure].good = value - 1;
        }
        state.stepFive[category][infrastructure].sufficient = value;
    },
    SET_DEFICIENT (category, infrastructure, value) {
        if (value <= state.stepFive[category][infrastructure].sufficient) {
            state.stepFive[category][infrastructure].sufficient = value - 1;
        }
        state.stepFive[category][infrastructure].deficient = value;
    }


};

export default mutations;
