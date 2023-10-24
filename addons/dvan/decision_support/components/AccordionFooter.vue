
<script>

export default {
    name: "AccordionFooter",
    components: {
    },
    props: {
        "backText": {
            type: String,
            default: "Zurück"
        },
        "backActive": {
            type: Boolean,
            default: true
        },
        "forwardText": {
            type: String,
            default: "Weiter"
        },
        "forwardActive": {
            type: Boolean,
            default: true
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
        },
        translate (key, options = null) {
            if (key === "additional:" + this.$t(key)) {
                console.warn("the key " + JSON.stringify(key) + " is unknown to the additional translation");
            }

            return this.$t(key, options);
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
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    :disabled="!backActive"
                    @click="backButton()"
                >
                    {{ backText }}
                </button>
            </div>
            <div
                class="col text-end"
            >
                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    :disabled="!forwardActive"
                    @click="forwardButton()"
                >
                    {{ forwardText }}
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
