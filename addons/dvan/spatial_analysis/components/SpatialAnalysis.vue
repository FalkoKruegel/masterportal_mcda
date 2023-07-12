
<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../store/getters";
import AccordionItem from "../../share_components/accordion/AccordionItem.vue";
import AccordionFooter from "../../share_components/accordion/AccordionFooter.vue";
import StartAnalysis from "./steps/StartAnalysis.vue";
import SelectFacility from "./steps/SelectFacility.vue";
import SelectTransport from "./steps/SelectTransport.vue";
import SelectStudyArea from "./steps/SelectStudyArea.vue";
import AnalysisResults from "./steps/AnalysisResults.vue";
import {storeToolParams} from "../utils/load_params";
import {runAnalysis} from "../utils/run_analysis";

export default {
    name: "SpatialAnalysis",
    components: {
        ToolTemplate,
        AccordionFooter,
        AccordionItem,
        StartAnalysis,
        SelectFacility,
        SelectTransport,
        SelectStudyArea,
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
                5: false,
                6: false
            }
        };
    },
    computed: {
        ...mapGetters("Tools/SpatialAnalysis", Object.keys(getters)),

        statusStepTwo () {
            return "valid";
        },
        statusStepThree () {
            return "valid";
        },
        statusStepFour () {
            return "valid";
        },
        statusStepFive () {
            return "valid";
        },
        statusStepSix () {
            return "valid";
        },
        paramsReady () {
            if (this.statusStepTwo === "valid" && this.statusStepThree === "valid" && this.statusStepFour === "valid" && this.statusStepFive === "valid") {
                return true;
            }
            return false;
        }
    },
    watch: {
    },
    created () {
        this.$on("close", this.close);
    },
    mounted () {
        this.initialize();
        if (this.isActive) {
            this.setActive(true);
        }
    },
    methods: {
        ...mapActions("Tools/SpatialAnalysis", [
            "initialize"
        ]),
        ...mapMutations("Tools/SpatialAnalysis", ["setActive"]),
        ...mapActions("Maps", ["addInteraction", "removeInteraction", "addLayer"]),
        ...mapMutations("Maps", ["removeLayerFromMap"]),

        /**
         * Closes this tool window by setting active to false
         * @returns {void}
         */
        close () {
            this.setActive(false);

            // TODO replace trigger when Menu is migrated
            // set the backbone model to active false for changing CSS class in menu (menu/desktop/tool/view.toggleIsActiveClass)
            // else the menu-entry for this tool is always highlighted
            const model = Radio.request("ModelList", "getModelByAttributes", {
                id: this.$store.state.Tools.AccessibilitiesLgln.id
            });

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
            a.download = "spatial_analysis_settings.json";
            a.click();
        }
    }
};
</script>

<template lang="html">
    <ToolTemplate
        :title="'Spatial Analysis'"
        :icon="icon"
        :active="active"
        :render-to-window="renderToWindow"
        :resizable-window="resizableWindow"
        :deactivate-gfi="deactivateGFI"
        :initial-width="450"
    >
        <template #toolBody>
            <div
                id="spatialAccessAccordion"
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
                    title="Schritt 2: Einrichtung wählen"
                    :status="statusStepTwo"
                    :opened="steps[1]"
                    @click="openStep(1)"
                >
                    <SelectFacility />
                    <AccordionFooter
                        @forwardClick="openStep(2)"
                        @backClick="openStep(0)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 3: Analyse-Parameter wählen"
                    :status="statusStepThree"
                    :opened="steps[2]"
                    @click="openStep(2)"
                >
                    <AccordionFooter
                        @forwardClick="openStep(3)"
                        @backClick="openStep(1)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 4: Transportmittel wählen"
                    :status="statusStepFour"
                    :opened="steps[3]"
                    @click="openStep(3)"
                >
                    <SelectTransport />
                    <AccordionFooter
                        @backClick="openStep(2)"
                        @forwardClick="openStep(4)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 5: Bevölkerungsparameter wählen"
                    :status="statusStepFour"
                    :opened="steps[4]"
                    @click="openStep(4)"
                >
                    <AccordionFooter
                        @backClick="openStep(3)"
                        @forwardClick="openStep(5)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 6: Untersuchungsgebiet wählen"
                    :status="statusStepFour"
                    :opened="steps[5]"
                    @click="openStep(5)"
                >
                    <SelectStudyArea />
                    <AccordionFooter
                        forward-text="Analyse starten"
                        :forward-active="paramsReady"
                        @forwardClick="() => { openStep(6); runAnalysis(); }"
                        @backClick="openStep(4)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 7: Zusammenfassung und Ergebnisse"
                    :status="statusStepSix"
                    :opened="steps[6]"
                    @click="openStep(6)"
                >
                    <AnalysisResults />
                    <AccordionFooter
                        forward-text="Analyse speichern"
                        @forwardClick="storeParams()"
                        @backClick="openStep(5)"
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

.callout {
  padding: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  background-color: var(--bd-callout-bg, var(--bs-gray-100));
  border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
}

.float-child {
  width: 50%;
  float: left;
}
.float-child-header {
  padding: 0px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow-y: hidden;
}
</style>
