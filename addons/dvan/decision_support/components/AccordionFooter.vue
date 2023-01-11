
<script>

export default {
    name: "AccordionFooter",
    components: {
    },
    props: {
        // prop firstLastItem indicates if footer belongs to the first or the last item of an accordion
        "firstLastItem": {
            type: String,
            default: ""
        }
    },
    emits: [
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
    <!--buttons are connected to firstLastItem attribute via v-if which only allows rendering if footer does not belong to the first or last item of an accordion-->
    <div
        class="container"
    >
        <div
            class="row mb-2 footer-row"
        >
            <div
                class="col text-start"
            >
                <button
                    v-if="firstLastItem !== 'first'"
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="backButton()"
                >
                    Zurück
                </button>
                <!--following button is a dummy button for use cases in the future like loading old configurations-->
                <!--button no longer necessary its functionality has been implemented in the steps components themselves-->
                <button
                    v-if="firstLastItem === 'first'"
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    disabled="true"
                >
                    Einstellungen laden
                </button>
            </div>
            <div
                class="col text-end"
            >
                <button
                    v-if="firstLastItem !== 'last'"
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="forwardButton()"
                >
                    Weiter
                </button>
                <!--following button is a dummy button for use cases in the future like starting the calculations when all user-input is valid-->
                <!--There should be an attribute to steer the disabled option of the button. Users should only be allowed to click the button if all input data is valid-->
                <!--button no longer necessary its functionality has been implemented in the steps components themselves-->
                <button
                    v-if="firstLastItem === 'last'"
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    disabled="true"
                >
                    Analyse starten
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.footer-row {
    margin-top: 1rem;
}
</style>
