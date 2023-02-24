
<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import AccordionItem from "./AccordionItem.vue";
import AccordionFooter from "./AccordionFooter.vue";
import StartAnalysis from "./steps/StartAnalysis.vue";
import ChooseStudyArea from "./steps/ChooseStudyArea.vue";
import SelectedInfrastructure from "./steps/SelectedInfrastructure.vue";
import SelectedPopulation from "./steps/SelectedPopulation.vue";
import AccessibilityMeasurement from "./steps/AccessibilityMeasurement.vue";
import InfrastructureWeighting from "./steps/InfrastructureWeighting.vue";
import SettingsSummary from "./steps/SettingsSummary.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../store/getters";
import {getDummyLayer, getWMSLayer, getDummyLayer2} from "../utils/dummy_layer.js";
import {addLayer, removeLayer} from "../utils/map.js";

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
        SettingsSummary
    },
    data () {
        return {
            steps: {
                0: false,
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
            if (this.stepTwo.wholeLowerSaxony || this.stepTwo.ownArea) {
                return "valid";
            }
            return "invalid";
        },
        statusStepThree () {
            for (const item in this.stepThree.local_supply) {
                if (this.stepThree.local_supply[item] === true) {
                    return "valid";
                }
            }
            for (const item in this.stepThree.health) {
                if (this.stepThree.health[item] === true) {
                    return "valid";
                }
            }
            for (const item in this.stepThree.education) {
                if (this.stepThree.education[item] === true) {
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
            for (const item in this.stepFour.kita) {
                if (this.stepFour.kita[item] === true) {
                    return "valid";
                }
            }
            return "invalid";
        },
        statusStepFive () {
            // helper variable to check if one of the checkboxes in step three has been ticked
            let infraSelected = false;

            // checking status of local supply
            for (const item in this.stepThree.local_supply) {
                if (this.stepThree.local_supply[item] === true) {
                    infraSelected = true;
                    for (const timeItem in this.stepFive.local_supply[item]) {
                        if (this.stepFive.local_supply[item][timeItem] <= 0) {
                            return "invalid";
                        }
                    }
                }
            }
            // checking status of health
            for (let item in this.stepThree.health) {
                if (this.stepThree.health[item] === true) {
                    infraSelected = true;
                    if ((item !== "pharmacies") && (item !== "clinics")) {
                        item = "physicians";
                    }
                    for (const timeItem in this.stepFive.health[item]) {
                        if (this.stepFive.health[item][timeItem] <= 0) {
                            return "invalid";
                        }
                    }
                }
            }
            // checking status of education
            for (const item in this.stepThree.education) {
                if (this.stepThree.education[item] === true) {
                    infraSelected = true;
                    for (const timeItem in this.stepFive.education[item]) {
                        if (this.stepFive.education[item][timeItem] <= 0) {
                            return "invalid";
                        }
                    }
                }
            }
            if (infraSelected === false) {
                return "invalid";
            }
            return "valid";
        },
        statusStepSix () {
            for (const item in this.stepSix.local_supply) {
                if (this.stepSix.local_supply[item] !== 0) {
                    return "valid";
                }
            }
            for (const item in this.stepSix.health) {
                if (this.stepSix.health[item] !== 0) {
                    return "valid";
                }
            }
            for (const item in this.stepSix.education) {
                if (this.stepSix.education[item] !== 0) {
                    return "valid";
                }
            }
            return "invalid";
        },
        statusStepSeven () {
            if (this.stepSeven.status === "changed") {
                return "invalid";
            }
            if (this.statusStepTwo === "valid" && this.statusStepThree === "valid" && this.statusStepFour === "valid" && this.statusStepSix === "valid") {
                return "valid";
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
                <AccordionItem
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
                    title="Schritt 2: Untersuchungsgebiet wählen"
                    :status="statusStepTwo"
                    :opened="steps[1]"
                    @click="openStep(1)"
                >
                    <ChooseStudyArea />
                    <AccordionFooter
                        @forwardClick="openStep(2)"
                        @backClick="openStep(0)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 3: Relevante Infrastrukturen"
                    :status="statusStepThree"
                    :opened="steps[2]"
                    @click="openStep(2)"
                >
                    <SelectedInfrastructure />
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
                    title="Schritt 5: Erreichbarkeitsberechnung"
                    :status="statusStepFive"
                    :opened="steps[4]"
                    @click="openStep(4)"
                >
                    <AccessibilityMeasurement />
                    <AccordionFooter
                        @backClick="openStep(3)"
                        @forwardClick="openStep(5)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 6: Gewichtung"
                    :status="statusStepSix"
                    :opened="steps[5]"
                    @click="openStep(5)"
                >
                    <InfrastructureWeighting />
                    <AccordionFooter
                        @backClick="openStep(4)"
                        @forwardClick="openStep(6)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 7: Zusammenfassung der Eingabewerte"
                    :status="statusStepSeven"
                    :opened="steps[6]"
                    @click="openStep(6)"
                >
                    <SettingsSummary />
                    <AccordionFooter
                        forward-text="Analyse starten"
                        :forward-active="statusStepSeven === 'valid'"
                        @backClick="openStep(5)"
                        @forwardClick="openStep(7)"
                    />
                </AccordionItem>
                <AccordionItem
                    title="Schritt 8: Ergebnisse"
                    :opened="steps[7]"
                    @click="openStep(7)"
                >
                    <button
                        class="btn btn-outline-primary btn-sm"
                        @click="openWMS()"
                    >
                        Open WMS
                    </button>
                    <button
                        class="btn btn-outline-primary btn-sm"
                        @click="closeWMS()"
                    >
                        Close WMS
                    </button>
                    <br>
                    <button
                        class="btn btn-outline-primary btn-sm"
                        @click="openDummy()"
                    >
                        Open Dummy
                    </button>
                    <button
                        class="btn btn-outline-primary btn-sm"
                        @click="closeDummy()"
                    >
                        Close Dummy
                    </button>
                    <br>
                    <button
                        class="btn btn-outline-primary btn-sm"
                        @click="openDummy2()"
                    >
                        Open Dummy2
                    </button>
                    <button
                        class="btn btn-outline-primary btn-sm"
                        @click="closeDummy2()"
                    >
                        Close Dummy2
                    </button>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    <AccordionFooter
                        first-last-item="last"
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
