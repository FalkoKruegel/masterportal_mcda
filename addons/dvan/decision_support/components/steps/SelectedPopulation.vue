<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectedPopulation",
    components: {
        BootstrapCheckbox,
        BootstrapAccordion,
        BootstrapAccordionItem
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters)),

        allActivated () {
            for (const item in this.stepFour.standard) {
                if (this.stepFour.standard[item] === false) {
                    return false;
                }
            }
            return true;
        },

        allStatus () {
            if (this.allActivated) {
                return "valid";
            }
            for (const item in this.stepFour.kita) {
                if (this.stepFour.kita[item] === true) {
                    return "deactivated";
                }
            }
            return "default";
        },
        standardStatus () {
            for (const item in this.stepFour.standard) {
                if (this.stepFour.standard[item] === true) {
                    return "valid";
                }
            }
            for (const item in this.stepFour.kita) {
                if (this.stepFour.kita[item] === true) {
                    return "deactivated";
                }
            }
            return "default";
        },
        kitaStatus () {
            for (const item in this.stepFour.standard) {
                if (this.stepFour.standard[item] === true) {
                    return "deactivated";
                }
            }
            for (const item in this.stepFour.kita) {
                if (this.stepFour.kita[item] === true) {
                    return "valid";
                }
            }
            return "default";
        }
    },
    methods: {
        ...mapActions("Tools/DecisionSupport", [
            "initialize"
        ]),
        ...mapMutations("Tools/DecisionSupport", [
            "setActive"
        ]),

        activateAll (e) {
            for (const item in this.stepFour.standard) {
                this.stepFour.standard[item] = e;
            }
        }
    }
};
</script>

<template lang="html">
    <div>
        Wählen Sie die Altersgruppen der Bevölkerung am Wohnort, die Sie für die Analyse berücksichtigen wollen:
        <BootstrapAccordion
            id="Accordion4"
            body-padding-y="5px"
        >
            <!-- Nahversorgungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion4_1"
                parent-id="Accordion4"
                text="Gesamte Bevölkerung"
                :status="allStatus"
            >
                <BootstrapCheckbox
                    id="Checkbox4_1_1"
                    :value="allActivated"
                    text="Berücksichtigung der Gesamtbevölkerung"
                    @input="activateAll"
                />
            </BootstrapAccordionItem>

            <!-- Gesundheits Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion4_2"
                parent-id="Accordion4"
                text="DVAN-Standardbevölkerungsgruppen"
                :status="standardStatus"
            >
                <BootstrapCheckbox
                    id="Checkbox4_2_1"
                    v-model="stepFour.standard.first"
                    text="0-9 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_2_2"
                    v-model="stepFour.standard.second"
                    text="10-19 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_2_3"
                    v-model="stepFour.standard.third"
                    text="20-39 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_2_4"
                    v-model="stepFour.standard.fourth"
                    text="40-49 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_2_5"
                    v-model="stepFour.standard.fifth"
                    text="50-59 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_2_6"
                    v-model="stepFour.standard.sixth"
                    text="60-79 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_2_7"
                    v-model="stepFour.standard.seventh"
                    text="ab 80 Jahre"
                />
            </BootstrapAccordionItem>

            <!-- Bildungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion4_3"
                parent-id="Accordion4"
                text="DVAN-Bevölkerungsgruppen für Kita-/Schulbedarf"
                :status="kitaStatus"
            >
                <BootstrapCheckbox
                    id="Checkbox4_3_1"
                    v-model="stepFour.kita.first"
                    text="0-2 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_3_2"
                    v-model="stepFour.kita.second"
                    text="3-5 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_3_3"
                    v-model="stepFour.kita.third"
                    text="6-9 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_3_4"
                    v-model="stepFour.kita.fourth"
                    text="10-14 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_3_5"
                    v-model="stepFour.kita.fifth"
                    text="15-17 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_3_6"
                    v-model="stepFour.kita.sixth"
                    text="18-19 Jahre"
                />
                <BootstrapCheckbox
                    id="Checkbox4_3_7"
                    v-model="stepFour.kita.seventh"
                    text="ab 20 Jahre"
                />
            </BootstrapAccordionItem>
        </BootstrapAccordion>
    </div>
</template>

<style lang="scss" scoped>
.callout {
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: var(--bd-callout-bg, var(--bs-gray-100));
    border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
}
</style>
