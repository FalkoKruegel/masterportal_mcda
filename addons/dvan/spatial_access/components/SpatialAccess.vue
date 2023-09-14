<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import AccordionItem from "../../share_components/accordion/AccordionItem.vue";
import AccordionFooter from "../../share_components/accordion/AccordionFooter.vue";
import StartAnalysis from "./steps/StartAnalysis.vue";
import SelectedPhysicians from "./steps/SelectedPhysicians.vue";
import PhysicianCapacity from "./steps/PhysicianCapacity.vue";
import SelectedPopulation from "./steps/SelectedPopulation.vue";
import SelectDistanceDecay from "./steps/SelectDistanceDecay.vue";
import AnalysisResults from "./steps/AnalysisResults.vue";
import {storeToolParams} from "../utils/tool_params/load_params";
import {runAnalysis} from "../utils/analysis/run_analysis";
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
        SelectedPopulation,
        SelectDistanceDecay,
        AnalysisResults
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
            if (this.stepTwo.supplyLevel !== "") {
                if (this.stepTwo.physicianGroup !== "Bitte wählen..." && this.stepTwo.planningArea !== "Bitte wählen...") {
                    return "valid";
                }
            }
            return "invalid";
        },
        statusStepThree () {
            if (this.stepThree.physicianAvailability !== "") {
                if (this.stepThree.availabilityOptions[this.stepThree.physicianAvailability].valid) {
                    return "valid";
                }
            }
            return "invalid";
        },
        statusStepFour () {
            if (this.stepFour.populationType !== "" && this.stepFour.selectedAgeGroups.length !== 0) {
                return "valid";
            }
            return "invalid";
        },
        statusStepFive () {
            if (this.stepFive.transport !== "" && this.stepFive.distanceDecay !== "") {
                if (this.stepFive.travelModes[this.stepFive.transport].valid) {
                    return "valid";
                }
            }
            return "invalid";
        },
        paramsReady () {
            if (this.statusStepTwo === "valid" && this.statusStepThree === "valid" && this.statusStepFour === "valid" && this.statusStepFive === "valid") {
                return true;
            }
            return false;
        },
        statusStepSix () {
            if (this.stepSix.status === "unfinished") {
                return "invalid";
            }
            if (this.stepSix.status === "finished") {
                return "valid";
            }
            return "default";
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
        },

        runAnalysis () {
            runAnalysis();
        },
        storeParams () {
            const a = document.createElement("a");
            const blob = new Blob([JSON.stringify(storeToolParams())], {
                type: "application/json"
            });

            a.href = window.URL.createObjectURL(blob);
            a.download = "spatial_access_settings.json";
            a.click();
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
                    :status="statusStepFive"
                    :opened="steps[4]"
                    @click="openStep(4)"
                >
                    <SelectDistanceDecay />
                    <AccordionFooter
                        forward-text="Analyse starten"
                        :forward-active="paramsReady"
                        @forwardClick="() => { openStep(5); runAnalysis(); }"
                        @backClick="openStep(3)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 6: Zusammenfassung und Ergebnisse"
                    :status="statusStepSix"
                    :opened="steps[5]"
                    @click="openStep(5)"
                >
                    <AnalysisResults />
                    <AccordionFooter
                        forward-text="Analyse speichern"
                        @forwardClick="storeParams()"
                        @backClick="openStep(4)"
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
