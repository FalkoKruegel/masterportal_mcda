<script>

export default {
    name: "TimeInput",
    components: {
    },
    props: {
        "value": {
            type: Array,
            default: () => [1, 2, 3, 4]
        },
        "index": {
            type: Number,
            default: 0
        },
        "id": {
            type: String,
            default: ""
        },
        "maxTime": {
            type: Number,
            default: null
        },
        "minTime": {
            type: Number,
            default: null
        },
        "supplyCategory": {
            type: String,
            default: ""
        }
    },
    emits: [
        // variable binding for v-model
        "input"
    ],
    methods: {
        /**
         * Function from populationRequest addon (original Masterportal)
         * translates the given key, checks if the key exists and throws a console warning if not
         * @param {String} key the key to translate
         * @param {Object} [options=null] for interpolation, formating and plurals
         * @returns {String} the translation or the key itself on error
         */
        translate (key, options = null) {

            // creating completed key. This improves readability in template
            const completeKey = "additional:modules.tools.decisionSupport." + key;

            if (completeKey === "additional:" + this.$t(completeKey)) {
                console.warn("the key " + JSON.stringify(completeKey) + " is unknown to the additional translation");
            }

            return this.$t(completeKey, options);
        }
    }
};
</script>


<template lang="html">
    <div
        class="row align-items-center"
    >
        <div class="col-7 text-start">
            {{ supplyCategory }} {{ translate('stepFive.timeInput.supplySituation') }} {{ translate('stepFive.timeInput.till') }}
        </div>
        <div class="col-3 text-end">
            <label
                :for="id"
                class="col-form-label"
            >
                <input
                    :id="id"
                    :value="value[index]"
                    type="number"
                    step="1"
                    :min="minTime"
                    :max="maxTime"
                    class="form-control"
                    @input="e => $emit('input', Number(e.target.value))"
                >
            </label>
        </div>
        <div
            class="col text-start"
        >
            min
        </div>
    </div>
</template>
