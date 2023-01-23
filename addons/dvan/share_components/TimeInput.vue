<script>

export default {
    name: "TimeInput",
    components: {
    },
    props: {
        // variable binding for v-model
        "value": {
            type: String,
            default: ""
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
        // one of "Sehr gute", "Gute", "Ausreichende", "Mangelhafte"
        "supplyCategory": {
            type: String,
            default: ""
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
            {{ supplyCategory }} Versorgungslage bis
        </div>
        <div class="col-3 text-end">
            <label
                :for="id"
                class="col-form-label"
            >
                <input
                    :id="id"
                    :value="value"
                    @input="e => $emit('input', e.target.value)"
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
