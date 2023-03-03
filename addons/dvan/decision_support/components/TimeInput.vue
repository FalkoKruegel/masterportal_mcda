<script>

export default {
    name: "TimeInput",
    components: {
    },
    props: {
        // variable binding for v-model
        "value": {
            type: Number,
            default: 0
        },
        // define which mutation should be used and therefore which property (very_good, good, sufficient, or deficient) should be changed
        "mutation": {
            type: String,
            default: ""
        },
        // define which category of the state (step 5) should be touched by the mutation
        "category": {
            type: String,
            default: ""
        },
        // define which specific infrastructure in the category (defined above) should be touched by the mutation (defined above)
        "infrastructure": {
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
    // emits: [
    //      variable binding for v-model
    //      "input"
    // ],
    methods: {
        updateValue (e) {
            this.$store.commit(this.mutation, {category: this.category, infrastructure: this.infrastructure, value: parseInt(e.target.value, 10)});
        }
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
                    :value="value"
                    type="number"
                    step="1"
                    :min="minTime"
                    :max="maxTime"
                    class="form-control"
                    @input="updateValue"
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
