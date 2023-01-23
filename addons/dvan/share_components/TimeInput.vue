<script>

export default {
    name: "TimeInput",
    components: {
    },
    props: {
        // variable binding for v-model
        "value": {
            type: Number,
            default: 5
        },
        "id": {
            type: String,
            default: ""
        },
        "maxTime": {
            type: Number,
            default: 40
        },
        "minTime": {
            type: Number,
            default: 0
        }
    },
    computed: {
        // this computed property is directly copied fromvue-documentation. It should ensure that all listeners from parent-components work
        inputListeners () {
            var vm = this;
            // `Object.assign` merges objects together to form a new object
            return Object.assign({},
                // We add all the listeners from the parent
                this.$listeners,
                // Then we can add custom listeners or override the
                // behavior of some listeners.
                {
                    // This ensures that the component works with v-model
                    input: function (event) {
                        vm.$emit('input', event.target.value)
                    }
                }
            )
        }
    },
    emits: [
        // variable binding for v-model
        "input"
    ]
};
</script>


<template lang="html">
    <div
        class="row align-items-center"
    >
        <div class="col-7 text-start">
            Sehr gute Versorgungslage bis
        </div>
        <div class="col-3 text-end">
            <label
                :for="id"
                class="col-form-label"
            >
                <input
                    :id="id"
                    :value="value"
                    @input="inputListeners"
                    type="number"
                    step="1"
                    :min="minTime"
                    :max="maxTime"
                    class="form-control"
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
