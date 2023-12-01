
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
        "backRender": {
            type: Boolean,
            default: true
        },
        "forwardRender": {
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
        }
    }
};
</script>

<template lang="html">
    <!--following div contains two buttons which emit forward and back events to navigate between different items-->
    <div
        class="container"
    >
        <div
            class="row mb-2 footer-row"
        >
            <div
                v-if="backRender"
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
                v-if="forwardRender"
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
