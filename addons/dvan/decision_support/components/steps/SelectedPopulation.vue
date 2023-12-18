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
            if (this.stepFour.populationType === "standard") {
                if (this.stepFour.selectedAgeGroups.length === Object.keys(this.stepFour.standardAgeGroups).length) {
                    return true;
                }
            }
            return false;
        },

        allStatus () {
            if (this.allActivated) {
                return "valid";
            }
            if (this.stepFour.populationType === "kids") {
                return "deactivated";
            }
            return "default";
        },
        standardStatus () {
            if (this.stepFour.populationType === "standard") {
                return "valid";
            }
            if (this.stepFour.populationType === "kids") {
                return "deactivated";
            }
            return "default";
        },
        kitaStatus () {
            if (this.stepFour.populationType === "kids") {
                return "valid";
            }
            if (this.stepFour.populationType === "standard") {
                return "deactivated";
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
            this.stepFour.populationType = "standard";
            const vals = [];

            for (const name in this.stepFour.standardAgeGroups) {
                vals.push(name);
            }
            this.stepFour.selectedAgeGroups = vals;
        },
        deactivateAll () {
            this.stepFour.populationType = "";
            this.stepFour.selectedAgeGroups = [];
        },

        activate (type, name) {
            if (this.stepFour.populationType === "") {
                this.stepFour.populationType = type;
            }
            this.stepFour.selectedAgeGroups = [...this.stepFour.selectedAgeGroups, name];
        },
        deactivate (type, name) {
            this.stepFour.selectedAgeGroups = this.stepFour.selectedAgeGroups.filter(e => e !== name);
            if (this.stepFour.selectedAgeGroups.length === 0) {
                this.stepFour.populationType = "";
            }
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
    <div>
        {{ translate('stepFour.text.text1') }}
        <BootstrapAccordion
            id="Accordion4"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                id="Accordion4-1"
                parent-id="Accordion4"
                :text="translate('stepFour.accordion.accordion4_1')"
                :status="allStatus"
            >
                <BootstrapCheckbox
                    id="Checkbox4-1-1"
                    :value="allActivated"
                    :text="translate('stepFour.checkbox.checkbox4_1_1')"
                    @input="e => e ? activateAll() : deactivateAll()"
                />
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion4-2"
                parent-id="Accordion4"
                :text="translate('stepFour.accordion.accordion4_2')"
                :status="standardStatus"
            >
                <BootstrapCheckbox
                    v-for="(item, name, index) in stepFour.standardAgeGroups"
                    :id="`Checkbox4-2-${index}`"
                    :key="index"
                    :text="translate(item.text)"
                    :value="stepFour.selectedAgeGroups.includes(name)"
                    @input="e => e ? activate('standard', name) : deactivate('standard', name)"
                />
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion4_3"
                parent-id="Accordion4"
                :text="translate('stepFour.accordion.accordion4_3')"
                :status="kitaStatus"
            >
                <BootstrapCheckbox
                    v-for="(item, name, index) in stepFour.kidsAgeGroups"
                    :id="`Checkbox4-3-${index}`"
                    :key="index"
                    :text="translate(item.text)"
                    :value="stepFour.selectedAgeGroups.includes(name)"
                    @input="e => e ? activate('kids', name) : deactivate('kids', name)"
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
