<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectTransport",
    components: {
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/SpatialAnalysis", Object.keys(getters))
    },
    methods: {
        ...mapActions("Tools/SpatialAnalysis", [
            "initialize"
        ]),
        ...mapMutations("Tools/SpatialAnalysis", [
            "setActive"
        ])
    }
};
</script>

<template lang="html">
    <div>
        <p>Wählen Sie die zu verwendenden Erreichbarkeitsparameter aus:</p>
        <select
            v-model="stepFour.travel_mode"
            class="form-select"
        >
            <option
                value="driving-car"
                selected
            >
                PKW
            </option>
            <option value="pedestrian">
                Füßgänger
            </option>
        </select>
        <br>
        <select
            v-model="stepFour.range_type"
            class="form-select"
        >
            <option
                value="discrete"
                selected
            >
                Diskrete Erreichbarkeitsschritte
            </option>
            <option value="continuus">
                Kontinuirliche Erreichbarkeiten
            </option>
        </select>
        <br>
        <div>
            <label
                :for="id"
                class="form-label"
            >
                Maximale Reichweite: {{ stepFour.range_max }}
            </label>
            <input
                id="Range_1_1"
                v-model="stepFour.range_max"
                class="form-range"
                type="range"
                :min="60"
                :max="3600"
                :step="60"
            >
        </div>
        <div v-if="stepFour.range_type === 'discrete'">
            <label
                :for="id"
                class="form-label"
            >
                Reichweiten Steps: {{ stepFour.range_steps }}
            </label>
            <input
                id="Range_1_2"
                v-model="stepFour.range_steps"
                class="form-range"
                type="range"
                :min="1"
                :max="20"
                :step="1"
            >
        </div>
    </div>
</template>

<style lang="scss" scoped>
.callout {
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: var(--bd-callout-bg, var(--bs-gray-100));
    border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
}

.callout-warning {
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: rgba(var(--bs-danger-rgb), .075);
    border-left: 0.25rem solid var(--bd-callout-border, rgba(var(--bs-danger-rgb), .5));
}
</style>
