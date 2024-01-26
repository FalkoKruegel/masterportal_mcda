
<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import AccordionItem from "../../share_components/accordion/AccordionItem.vue";
import AccordionFooter from "../../share_components/accordion/AccordionFooter.vue";
import StartAnalysis from "./steps/StartAnalysis.vue";
import ChooseStudyArea from "./steps/ChooseStudyArea.vue";
import SelectedInfrastructure from "./steps/SelectedInfrastructure.vue";
import SelectedPopulation from "./steps/SelectedPopulation.vue";
import AccessibilityMeasurement from "./steps/AccessibilityMeasurement.vue";
import InfrastructureWeighting from "./steps/InfrastructureWeighting.vue";
import SettingsSummary from "./steps/SettingsSummary.vue";
import AnalysisResults from "./steps/AnalysisResults.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../store/getters";
import {getDummyLayer, getWMSLayer, getDummyLayer2} from "../utils/dummy_layer.js";
import {addLayer, removeLayer} from "../../share_utils/map.js";
import {runAnalysis} from "../utils/analysis/run_analysis";
import {storeToolParams} from "../utils/tool_params/load_params";

export default {
    name: "DecisionSupport",
    components: {
        ToolTemplate,
        AccordionItem,
        AccordionFooter,
        StartAnalysis,
        ChooseStudyArea,
        SelectedInfrastructure,
        SelectedPopulation,
        AccessibilityMeasurement,
        InfrastructureWeighting,
        SettingsSummary,
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
                6: false,
                7: false
            }
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters)),

        statusStepTwo () {
            if (this.stepTwo.wholeLowerSaxony || (this.stepTwo.ownArea && this.stepTwo.ownAreaExtent !== null)) {
                return "valid";
            }
            return "invalid";
        },
        statusStepThree () {
            for (const group in this.stepThree.selectedFacilities) {
                for (const name in this.stepThree.selectedFacilities[group]) {
                    if (this.stepThree.selectedFacilities[group][name] !== "") {
                        return "valid";
                    }
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
            for (const group in this.stepFive.timeZones) {
                for (const name in this.stepFive.timeZones[group]) {
                    for (let i = 0; i < 4; i++) {
                        if (this.stepFive.timeZones[group][name][i] < this.stepFive.minValue) {
                            return "invalid";
                        }
                        if (this.stepFive.timeZones[group][name][i] > this.stepFive.maxValue) {
                            return "invalid";
                        }
                    }
                    for (let i = 1; i < 4; i++) {
                        if (this.stepFive.timeZones[group][name][i] <= this.stepFive.timeZones[group][name][i - 1]) {
                            return "invalid";
                        }
                    }
                }
            }
            return "valid";
        },
        statusStepSix () {
            for (const group in this.stepThree.selectedFacilities) {
                for (const name in this.stepThree.selectedFacilities[group]) {
                    if (this.stepSix.facilityWeights[group][name] !== 0) {
                        return "valid";
                    }
                }
            }
            return "invalid";
        },
        statusStepSeven () {
            if (this.stepSeven.status === "changed") {
                return "invalid";
            }
            if (this.statusStepTwo === "valid" && this.statusStepThree === "valid" && this.statusStepFour === "valid" && this.statusStepFive === "valid" && this.statusStepSix === "valid") {
                return "valid";
            }
            return "invalid";
        },
        statusStepEight () {
            if (this.stepEight.status === "unfinished") {
                return "invalid";
            }
            if (this.stepEight.status === "finished") {
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
        ...mapActions("Tools/DecisionSupport", [
            "initialize", "initState"
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
        },

        openWMS () {
            const layer = getWMSLayer();

            addLayer(layer);
        },

        closeWMS () {
            removeLayer("wms");
        },

        openDummy () {
            const layer = getDummyLayer();

            addLayer(layer);
        },

        closeDummy () {
            removeLayer("dummy");
        },

        openDummy2 () {
            const layer = getDummyLayer2();

            addLayer(layer);
        },

        closeDummy2 () {
            removeLayer("dummy2");
        },

        runTest () {
            runAnalysis();
            // this.stepEight.status = "running";
            // setTimeout(() => {
            //     this.stepEight.status = "finished";
            // }, 2000);
        },

        storeTest () {
            const a = document.createElement("a");
            const blob = new Blob([JSON.stringify(storeToolParams())], {
                type: "application/json"
            });

            a.href = window.URL.createObjectURL(blob);
            a.download = "settings.json";
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
            const completeKey = "additional:modules.tools.decisionSupport." + key;

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
                id="decisionSupportAccordion"
                class="accordion accordion-flush full-window"
            >
                <AccordionItem
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
                    <ChooseStudyArea />
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
                    <SelectedInfrastructure />
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
                    <AccessibilityMeasurement />
                    <AccordionFooter
                        :forward-text="translate('accordionFooter.next')"
                        :back-text="translate('accordionFooter.back')"
                        @backClick="openStep(3)"
                        @forwardClick="openStep(5)"
                    />
                </AccordionItem>
                <AccordionItem
                    :title="translate('stepSix.title')"
                    :status="statusStepSix"
                    :opened="steps[5]"
                    @click="openStep(5)"
                >
                    <InfrastructureWeighting />
                    <AccordionFooter
                        :forward-text="translate('accordionFooter.next')"
                        :back-text="translate('accordionFooter.back')"
                        @backClick="openStep(4)"
                        @forwardClick="openStep(6)"
                    />
                </AccordionItem>
                <AccordionItem
                    :title="translate('stepSeven.title')"
                    :status="statusStepSeven"
                    :opened="steps[6]"
                    @click="openStep(6)"
                >
                    <SettingsSummary />
                    <AccordionFooter
                        :forward-text="translate('accordionFooter.startAnalysis')"
                        :back-text="translate('accordionFooter.back')"
                        :forward-active="statusStepSeven === 'valid'"
                        @backClick="openStep(5)"
                        @forwardClick="() => { openStep(7); runTest(); }"
                    />
                </AccordionItem>
                <AccordionItem
                    :title="translate('stepEight.title')"
                    :status="statusStepEight"
                    :opened="steps[7]"
                    @click="openStep(7)"
                >
                    <AnalysisResults />
                    <AccordionFooter
                        :forward-text="translate('accordionFooter.saveAnalysis')"
                        :back-text="translate('accordionFooter.back')"
                        @forwardClick="storeTest"
                        @backClick="openStep(6)"
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
