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
                    @input="e => $emit('input', e.target.checked)"
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
