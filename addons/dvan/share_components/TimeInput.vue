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
                for="input5_3_1_1"
                class="col-form-label"
            >
                <input
                    id="input5_3_1_1"
                    v-model="stepFive.local_supply.supermarket.very_good"
                    type="number"
                    step="1"
                    min="0"
                    max="40"
                    name="veryGood"
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
