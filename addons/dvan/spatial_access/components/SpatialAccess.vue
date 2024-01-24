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
                if (this.stepTwo.physicianGroup !== "unselected" && this.stepTwo.planningArea !== "unselected") {
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
        this.initState();
        if (this.isActive) {
            this.setActive(true);
        }
    },
    methods: {
        ...mapActions("Tools/SpatialAccess", [
            "initialize", "initState"
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
        },

        /**
         * Function from populationRequest addon (original Masterportal)
         * translates the given key, checks if the key exists and throws a console warning if not
         * @param {String} key the key to translate
         * @param {Object} [options=null] for interpolation, formating and plurals
         * @returns {String} the translation or the key itself on error
         */
        translate (key, options = null) {
            // creating completed key. This improves readability in template
            const completeKey = "additional:modules.tools.spatialAccess." + key;

            if (completeKey === "additional:" + this.$t(completeKey)) {
                console.warn("the key " + JSON.stringify(completeKey) + " is unknown to the additional translation");
            }
            return this.$t(completeKey, options);
        }
    }
};
</script>

<template lang="html">
    <ToolTemplate
        :title="translate('title')"
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
                    :title="translate('stepOne.title')"
                    status="valid"
                    :opened="steps[0]"
                    @click="openStep(0)"
                >
                    <StartAnalysis
                        @startAnalysis="openStep(1)"
                    />
                </AccordionItem>
                <AccordionItem
                    :title="translate('stepTwo.title')"
                    :status="statusStepTwo"
                    :opened="steps[1]"
                    @click="openStep(1)"
                >
                    <SelectedPhysicians />
                    <AccordionFooter
                        :forward-text="translate('accordionFooter.next')"
                        :back-text="translate('accordionFooter.back')"
                        @forwardClick="openStep(2)"
                        @backClick="openStep(0)"
                    />
                </AccordionItem>
                <AccordionItem
                    :title="translate('stepThree.title')"
                    :status="statusStepThree"
                    :opened="steps[2]"
                    @click="openStep(2)"
                >
                    <PhysicianCapacity />
                    <AccordionFooter
                        :forward-text="translate('accordionFooter.next')"
                        :back-text="translate('accordionFooter.back')"
                        @forwardClick="openStep(3)"
                        @backClick="openStep(1)"
                    />
                </AccordionItem>
                <AccordionItem
                    :title="translate('stepFour.title')"
                    :status="statusStepFour"
                    :opened="steps[3]"
                    @click="openStep(3)"
                >
                    <SelectedPopulation />
                    <AccordionFooter
                        :forward-text="translate('accordionFooter.next')"
                        :back-text="translate('accordionFooter.back')"
                        @backClick="openStep(2)"
                        @forwardClick="openStep(4)"
                    />
                </AccordionItem>
                <AccordionItem
                    :title="translate('stepFive.title')"
                    :status="statusStepFive"
                    :opened="steps[4]"
                    @click="openStep(4)"
                >
                    <SelectDistanceDecay />
                    <AccordionFooter
                        :forward-active="paramsReady"
                        :forward-text="translate('accordionFooter.startAnalysis')"
                        :back-text="translate('accordionFooter.back')"
                        @forwardClick="() => { openStep(5); runAnalysis(); }"
                        @backClick="openStep(3)"
                    />
                </AccordionItem>
                <AccordionItem
                    :title="translate('stepSix.title')"
                    :status="statusStepSix"
                    :opened="steps[5]"
                    @click="openStep(5)"
                >
                    <AnalysisResults />
                    <AccordionFooter
                        :forward-text="translate('accordionFooter.saveAnalysis')"
                        :back-text="translate('accordionFooter.back')"
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
