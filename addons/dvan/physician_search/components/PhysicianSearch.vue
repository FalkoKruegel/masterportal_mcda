
<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import AccordionItem from "../../share_components/accordion/AccordionItem.vue";
import AccordionFooter from "../../share_components/accordion/AccordionFooter.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../store/getters";
import SetLocation from "./steps/SetLocation.vue";
import SubjectCriteria from "./steps/SubjectCriteria.vue";
import RadiusFromLocation from "./steps/RadiusFromLocation.vue";
import ResultList from "./steps/ResultList.vue";

export default {
    name: "PhysicianSearch",
    components: {
        ToolTemplate,
        AccordionItem,
        AccordionFooter,
        SetLocation,
        SubjectCriteria,
        RadiusFromLocation,
        ResultList
    },
    data () {
        return {
            steps: {
                0: true,
                1: false,
                2: false,
                3: false
            }
        };
    },
    computed: {
        ...mapGetters("Tools/PhysicianSearch", Object.keys(getters)),

        statusStepOne () {
            if (this.stepOne.location.longitude !== null && this.stepOne.location.latitude !== null) {
                return "valid";
            }
            return "invalid";
        },

        statusStepTwo () {
            // checking if special Services refinement is selected
            if (this.stepTwo.specialServices.subject === "Bitte wählen..." || this.stepTwo.specialServices.additionalDesignation === "Bitte wählen..." || this.stepTwo.specialServices.servicesRequiringAuthorization === "Bitte wählen...") {
                return "invalid";
            }

            // checking if any of the checkboxes in the empowered physicians section is true
            // if none of them is true, "invalid" is returned
            // Object.values returns an array of the values of the given object
            // .some() checks if at least one element of an array passes the test given by a function
            if (!Object.values(this.stepTwo.empoweredPhys).some(val => val === true)) {
                return "invalid";
            }

            // checking if any of the checkboxes in the opening hours section is true
            // if none of them is true, "invalid" is returned
            // same functions as above are used
            if (!Object.values(this.stepTwo.openingHours).some(val => val === true)) {
                return "invalid";
            }

            // checking if useful valuesare selected for the accessibility and language section
            if (this.stepTwo.accessibilityAndLanguages.accessibility === "Bitte wählen..." || this.stepTwo.accessibilityAndLanguages.languages === "Bitte wählen...") {
                return "invalid";
            }
            return "valid";
        },

        statusStepThree () {
            if ((this.stepThree.distance.distanceSmallerThan > 0 || this.stepThree.time.timeSmallerThan > 0) & this.stepThree.transport !== "") {
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
        ...mapActions("Tools/PhysicianSearch", [
            "initialize"
        ]),
        ...mapMutations("Tools/PhysicianSearch", [
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
            const model = Radio.request("ModelList", "getModelByAttributes", {id: this.$store.state.Tools.PhysicianSearch.id});

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
        }
    }
};
</script>

<template lang="html">
    <ToolTemplate
        :title="'Arztsuche'"
        :icon="icon"
        :active="active"
        :render-to-window="renderToWindow"
        :resizable-window="resizableWindow"
        :deactivate-gfi="deactivateGFI"
        :initial-width="450"
    >
        <template #toolBody>
            <div
                id="physicianSearchAccordion"
                class="accordion accordion-flush full-window"
            >
                <AccordionItem
                    id="Accordion1"
                    title="Schritt 1: Eigenen Standort festlegen"
                    :status="statusStepOne"
                    :opened="steps[0]"
                    @click="openStep(0)"
                >
                    <SetLocation />
                    <AccordionFooter
                        :back-render="false"
                        @forwardClick="openStep(1)"
                        @backClick="openStep(0)"
                    />
                </AccordionItem>
                <AccordionItem
                    id="Accordion2"
                    title="Schritt 2: Fachkriterien"
                    :status="statusStepTwo"
                    :opened="steps[1]"
                    @click="openStep(1)"
                >
                    <SubjectCriteria />
                    <AccordionFooter
                        @forwardClick="openStep(2)"
                        @backClick="openStep(0)"
                    />
                </AccordionItem>
                <AccordionItem
                    id="Accordion3"
                    title="Schritt 3: Radius vom Suchort"
                    :status="statusStepThree"
                    :opened="steps[2]"
                    @click="openStep(2)"
                >
                    <RadiusFromLocation />
                    <AccordionFooter
                        forward-text="Ärzte suchen"
                        @backClick="openStep(1)"
                    />
                </AccordionItem>
                <AccordionItem
                    id="Accordion3"
                    title="Schritt 4: Ergebnisliste"
                    status="invalid"
                    :opened="steps[3]"
                    @click="openStep(3)"
                >
                    <ResultList />
                    <AccordionFooter
                        :forward-render="false"
                        @backClick="openStep(2)"
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
