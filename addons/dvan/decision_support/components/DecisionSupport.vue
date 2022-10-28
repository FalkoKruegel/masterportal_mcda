
<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../store/getters";

export default {
    name: "DecisionSupport",
    components: {
        ToolTemplate
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters))
    },
    created () {
        this.$on("close", this.close);
    },
    /**
     * Put initialize here if mounting occurs after config parsing
     * @returns {void}
     */
    mounted () {
        this.initialize();
        if (this.isActive) {
            this.setActive(true);
        }
    },
    methods: {
        ...mapActions("Tools/DecisionSupport", [
            "initialize"
        ]),
        ...mapMutations("Tools/DecisionSupport", [
            "setActive"
        ]),

        /**
         * Closes this tool window by setting active to false
         * @returns {void}
         */
        close () {
            this.setActive(false);

            // TODO replace trigger when Menu is migrated
            // set the backbone model to active false for changing CSS class in menu (menu/desktop/tool/view.toggleIsActiveClass)
            // else the menu-entry for this tool is always highlighted
            const model = Radio.request("ModelList", "getModelByAttributes", {id: this.$store.state.Tools.DecisionSupport.id});

            if (model) {
                model.set("isActive", false);
            }
        }
    }
};
</script>

<template lang="html">
    <ToolTemplate
        :title="'Tool zu Entscheidungsunterstützung'"
        :icon="icon"
        :active="active"
        :render-to-window="renderToWindow"
        :resizable-window="resizableWindow"
        :deactivate-gfi="deactivateGFI"
        :initial-width="450"
    >
        <template #toolBody>
            <div
                id="decisionSupportAccordion"
                class="accordion accordion-flush full-window"
            >
                <div class="accordion-item">
                    <h2
                        id="step1-header"
                        class="accordion-header"
                    >
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#step1-content"
                            aria-expanded="false"
                            aria-controls="step1-content"
                        >
                            Schritt 1: Tools zur Entscheidungsunterstützung
                        </button>
                    </h2>
                    <div
                        id="step1-content"
                        class="accordion-collapse collapse"
                        aria-labelledby="step1-header"
                        data-bs-parent="#decisionSupportAccordion"
                    >
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2
                        id="step2-header"
                        class="accordion-header"
                    >
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#step2-content"
                            aria-expanded="false"
                            aria-controls="step2-content"
                        >
                            Schritt 2: Untersuchungsgebiet
                        </button>
                    </h2>
                    <div
                        id="step2-content"
                        class="accordion-collapse collapse"
                        aria-labelledby="step2-header"
                        data-bs-parent="#decisionSupportAccordion"
                    >
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2
                        id="step3-header"
                        class="accordion-header"
                    >
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#step3-content"
                            aria-expanded="false"
                            aria-controls="step3-content"
                            :disabled="true"
                        >
                            Schritt 3: Relevante Infrastrukturen
                        </button>
                    </h2>
                    <div
                        id="step3-content"
                        class="accordion-collapse collapse"
                        aria-labelledby="step3-header"
                        data-bs-parent="#decisionSupportAccordion"
                    >
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2
                        id="step4-header"
                        class="accordion-header"
                    >
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#step4-content"
                            aria-expanded="false"
                            aria-controls="step4-content"
                        >
                            Schritt 4: Infrastrukturparameter
                        </button>
                    </h2>
                    <div
                        id="step4-content"
                        class="accordion-collapse collapse"
                        aria-labelledby="step4-header"
                        data-bs-parent="#decisionSupportAccordion"
                    >
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2
                        id="step5-header"
                        class="accordion-header"
                    >
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#step5-content"
                            aria-expanded="false"
                            aria-controls="step5-content"
                        >
                            Schritt 5: Erreichbarkeit
                        </button>
                    </h2>
                    <div
                        id="step5-content"
                        class="accordion-collapse collapse"
                        aria-labelledby="step5-header"
                        data-bs-parent="#decisionSupportAccordion"
                    >
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2
                        id="step6-header"
                        class="accordion-header"
                    >
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#step6-content"
                            aria-expanded="false"
                            aria-controls="step6-content"
                        >
                            Schritt 6: Gewichtung
                        </button>
                    </h2>
                    <div
                        id="step6-content"
                        class="accordion-collapse collapse"
                        aria-labelledby="step6-header"
                        data-bs-parent="#decisionSupportAccordion"
                    >
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2
                        id="step7-header"
                        class="accordion-header"
                    >
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#step7-content"
                            aria-expanded="false"
                            aria-controls="step7-content"
                        >
                            Schritt 7: Zusammenfassung und Berechnung
                        </button>
                    </h2>
                    <div
                        id="step7-content"
                        class="accordion-collapse collapse"
                        aria-labelledby="step7-header"
                        data-bs-parent="#decisionSupportAccordion"
                    >
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2
                        id="step8-header"
                        class="accordion-header"
                    >
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#step8-content"
                            aria-expanded="true"
                            aria-controls="step8-content"
                        >
                            Schritt 8: Ergebnisse
                        </button>
                    </h2>
                    <div
                        id="step8-content"
                        class="accordion-collapse collapse"
                        aria-labelledby="step8-header"
                        data-bs-parent="#decisionSupportAccordion"
                    >
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </ToolTemplate>
</template>

<style lang="scss" scoped>
.accordion {
    --bs-accordion-btn-padding-x: 10px;
    --bs-accordion-btn-padding-y: 10px;
}

h2#step1-header button {
    background-color: rgba($color: lightgreen, $alpha: 0.3);
}

h2#step2-header button {
    background-color: rgba($color: red, $alpha: 0.3);
}

h2#step3-header button {
    background-color: rgba($color: lightgrey, $alpha: 0.3);
}

.full-window {
    margin: -1.25rem;
}
</style>
