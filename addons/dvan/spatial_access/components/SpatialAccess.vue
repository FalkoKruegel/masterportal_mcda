<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import AccordionItem from "../../share_components/accordion/AccordionItem.vue";
import AccordionFooter from "../../share_components/accordion/AccordionFooter.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../store/getters";

export default {
    name: "SpatialAccess",
    components: {
        ToolTemplate,
        AccordionItem,
        AccordionFooter
    },
    data () {
        return {
            steps: {
                0: true,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false
            }
        };
    },
    computed: {
        ...mapGetters("Tools/SpatialAccess", Object.keys(getters))
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
        ...mapActions("Tools/SpatialAccess", [
            "initialize"
        ]),
        ...mapMutations("Tools/SpatialAccess", [
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
            const model = Radio.request("ModelList", "getModelByAttributes", {id: this.$store.state.Tools.SpatialAccess.id});

            if (model) {
                model.set("isActive", false);
            }
        },
        openStep (index) {
            if (this.steps[index] === true) {
                this.steps[index] = false;
                return;
            }
            for (const i in this.steps) {
                this.steps[i] = false;
            }
            this.steps[index] = true;

            if (index === 6) {
                this.stepSeven.status = "unchanged";
            }
        }
    }
};
</script>

<template lang="html">
    <ToolTemplate
        :title="'Räumlicher Zugang'"
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
                <AccordionItem
                    title="Schritt 1: Analyse starten oder bestehende Analyse laden"
                    status="valid"
                    :opened="steps[0]"
                    @click="openStep(0)"
                />
                <AccordionItem
                    title="Schritt 2: Facharztgruppe und Planungsbereich auswählen"
                    status="invalid"
                    :opened="steps[1]"
                    @click="openStep(1)"
                >
                    <AccordionFooter
                        @forwardClick="openStep(2)"
                        @backClick="openStep(0)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 3: Ärztlichen Teilnahmeumfang und Kapazitäten definieren"
                    status="invalid"
                    :opened="steps[2]"
                    @click="openStep(2)"
                >
                    <AccordionFooter
                        @forwardClick="openStep(3)"
                        @backClick="openStep(1)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 4: Altersgruppe der Bevölkerung auswählen"
                    status="invalid"
                    :opened="steps[3]"
                    @click="openStep(3)"
                >
                    <AccordionFooter
                        @backClick="openStep(2)"
                        @forwardClick="openStep(4)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 5: Transportmittel und Entfernungsabgwichtung wählen"
                    status="invalid"
                    :opened="steps[4]"
                    @click="openStep(4)"
                >
                    <AccordionFooter
                        @backClick="openStep(3)"
                        @forwardClick="openStep(5)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 6: Zusammenfassung und Ergebnisse"
                    status="invalid"
                    :opened="steps[5]"
                    @click="openStep(5)"
                >
                    <AccordionFooter
                        @backClick="openStep(4)"
                        @forwardClick="openStep(6)"
                    />
                </AccordionItem>
            </div>
        </template>
    </ToolTemplate>
</template>

<style lang="scss" scoped>
.accordion {
    --bs-accordion-btn-padding-x: 10px;
    --bs-accordion-btn-padding-y: 10px;
}

.full-window {
    margin: -1.25rem;
}
</style>
