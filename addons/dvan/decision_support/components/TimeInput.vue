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
        // one of "Sehr gute", "Gute", "Ausreichende", "Mangelhafte"
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
    }
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
