<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import AccordionItem from "../../share_components/accordion/AccordionItem.vue";
import AccordionFooter from "../../share_components/accordion/AccordionFooter.vue";
import StartAnalysis from "./steps/StartAnalysis.vue";
import SelectedPhysicians from "./steps/SelectedPhysicians.vue";
import PhysicianCapacity from "./steps/PhysicianCapacity.vue";
import SelectedPopulation from "./steps/SelectedPopulation.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../store/getters";

export default {
    name: "SpatialAccess",
    components: {
        ToolTemplate,
        AccordionItem,
        AccordionFooter,
        StartAnalysis,
        SelectedPhysicians,
        PhysicianCapacity,
        SelectedPopulation
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
        ...mapGetters("Tools/SpatialAccess", Object.keys(getters)),

        statusStepTwo () {
            for (const item in this.stepTwo.supplyLevel) {
                if (this.stepTwo.supplyLevel[item] === true) {
                    if (this.stepTwo.physicianGroup !== "Bitte wählen..." & this.stepTwo.planningArea !== "Bitte wählen...") {
                        return "valid";
                    }
                }
            }
            return "invalid";
        },
        statusStepThree () {
            for (const item in this.stepThree.physicianAvailability) {
                if (this.stepThree.physicianAvailability[item] === true) {
                    return "valid";
                }
            }
            return "invalid";
        },
        statusStepFour () {
            for (const item in this.stepFour.standard) {
                if (this.stepFour.standard[item] === true) {
                    return "valid";
                }
            }
            for (const item in this.stepFour.kids) {
                if (this.stepFour.kids[item] === true) {
                    return "valid";
                }
            }
            return "invalid";
        }
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
                    id="Accordion1"
                    title="Schritt 1: Analyse starten oder bestehende Analyse laden"
                    status="valid"
                    :opened="steps[0]"
                    @click="openStep(0)"
                >
                    <StartAnalysis
                        @startAnalysis="openStep(1)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 2: Facharztgruppe und Planungsbereich auswählen"
                    :status="statusStepTwo"
                    :opened="steps[1]"
                    @click="openStep(1)"
                >
                    <SelectedPhysicians />
                    <AccordionFooter
                        @forwardClick="openStep(2)"
                        @backClick="openStep(0)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 3: Ärztlichen Teilnahmeumfang und Kapazitäten definieren"
                    :status="statusStepThree"
                    :opened="steps[2]"
                    @click="openStep(2)"
                >
                    <PhysicianCapacity />
                    <AccordionFooter
                        @forwardClick="openStep(3)"
                        @backClick="openStep(1)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 4: Altersgruppe der Bevölkerung auswählen"
                    :status="statusStepFour"
                    :opened="steps[3]"
                    @click="openStep(3)"
                >
                    <SelectedPopulation />
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
