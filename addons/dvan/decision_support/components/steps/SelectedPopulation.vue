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
                if (this.stepFour.selectedAgeGroups.length === Object.keys(this.stepFour.population.standard.items).length) {
                    return true;
                }
            }
            return false;
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

            for (const name in this.stepFour.population.standard.items) {
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
        allStatus () {
            if (this.allActivated) {
                return "valid";
            }
            if (["standard", ""].includes(this.stepFour.populationType)) {
                return "default";
            }
            return "deactivated";
        },
        groupStatus (name) {
            if (this.stepFour.populationType === name) {
                return "valid";
            }
            if (this.stepFour.populationType === "") {
                return "default";
            }
            return "deactivated";
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
            <!-- Local Supply Infrastructures -->
            <BootstrapAccordionItem
                v-if="'standard' in stepFour.population"
                id="Accordion4-1"
                parent-id="Accordion4"
                :text="translate('stepFour.all_group')"
                :status="allStatus()"
            >
                <BootstrapCheckbox
                    id="Checkbox4-1-1"
                    :value="allActivated"
                    :text="translate('stepFour.all_checkbox')"
                    @input="e => e ? activateAll() : deactivateAll()"
                />
            </BootstrapAccordionItem>

            <BootstrapAccordionItem
                v-for="(group, group_name, group_index) in stepFour.population"
                :id="`Accordion4-${group_index+2}`"
                :key="group_index"
                parent-id="Accordion4"
                :text="translate(group['text'])"
                :status="groupStatus(group_name)"
            >
                <BootstrapCheckbox
                    v-for="(item, name, index) in group['items']"
                    :id="`Checkbox4-${group_index+2}-${index}`"
                    :key="index"
                    :text="item.length > 1 ? translate('population.range', {start: item[0], end: item[1]}) : translate('population.end', {start: item[0]})"
                    :value="stepFour.selectedAgeGroups.includes(name)"
                    @input="e => e ? activate(group_name, name) : deactivate(group_name, name)"
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
