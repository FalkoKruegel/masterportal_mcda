const actions = {
    initialize () {
        return 1;
    },
    updateVeryGood ({commit}, category, infrastructure, value) {
        commit("SET_VERY_GOOD", category, infrastructure, value);
    },
    updateGood ({commit}, category, infrastructure, value) {
        commit("SET_GOOD", category, infrastructure, value);

    },
    updateSufficient ({commit}, category, infrastructure, value) {
        commit("SET_Sufficient", category, infrastructure, value);

    },
    updateDeficient ({commit}, category, infrastructure, value) {
        commit("SET_Deficient", category, infrastructure, value);

    }
};

export default actions;
