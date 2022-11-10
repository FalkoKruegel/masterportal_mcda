
<script>
import AccordionFooter from "./AccordionFooter.vue";

export default {
    name: "AccordionFooter",
    components: {
    },
    props: {
        "firstLastItem": {
            type: String,
            default: ""
        }
    },
    emits:[
        "backClick",
        "forwardClick"
    ],
    methods: {
        // if back-Button is clicked, backClick will be emitted which should be handled in parent-Component
        backButton () {
            this.$emit("backClick");
        },
        // if forward-Button is clicked, forwardClick will be emitted which should be handled in parent-Component
        forwardButton () {
            this.$emit("forwardClick");
        }
    }
};
</script>

<template lang="html">
    <!--following div contains two buttons which emit forward and back events to navigate between different items-->
    <!--buttons are connected to firstLastItem attribute to disable the buttons if necessary-->
    <div
        class="container"
    >
        <div
            class="row mb-2"
        >
            <div
                class="col text-start"
            >
                <button
                    v-if="firstLastItem !== 'first'"
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    :disabled="firstLastItem==='first'"
                    @click="backButton()"
                >
                    Zurück
                </button>
            </div>
            <div
                class="col text-end"
            >
                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    :disabled="firstLastItem==='last'"
                    @click="forwardButton()"
                >
                    Weiter
                </button>
            </div>
        </div>
    </div>
</template>