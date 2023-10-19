<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectedInfrastructure",
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
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters))
    },
    methods: {
        ...mapActions("Tools/DecisionSupport", [
            "initialize"
        ]),
        ...mapMutations("Tools/DecisionSupport", [
            "setActive"
        ]),

        selectionStatus (items) {
            for (const name in items) {
                if (items[name] !== "") {
                    return "valid";
                }
            }
            return "default";
        },

        /**
         * Function from populationRequest addon (original Masterportal)
         * translates the given key, checkes if the key exists and throws a console warning if not
         * @param {String} key the key to translate
         * @param {Object} [options=null] for interpolation, formating and plurals
         * @returns {String} the translation or the key itself on error
         */
        translate (key, options = null) {
            if (key === "additional:" + this.$t(key)) {
                console.warn("the key " + JSON.stringify(key) + " is unknown to the additional translation");
            }

            return this.$t(key, options);
        }
    }
};
</script>

<template lang="html">
    <div>
        {{ translate('additional:modules.tools.decisionSupport.stepThree.text.textOne') }}
        <BootstrapAccordion
            id="Accordion_3"
            body-padding-y="5px"
        >
            <!-- Erik: When using the locales files, I think the group_item variable is no longer needed here. Please check.-->
            <BootstrapAccordionItem
                v-for="(group_item, group_name, group_index) in stepThree.facilities"
                :id="`Accordion_3_${group_index}`"
                :key="group_index"
                :text="translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${group_name}.text`)"
                :status="selectionStatus(stepThree.selected_facilities[group_name])"
            >
                <!-- Erik: When using the locales files, I think the item variable is no longer needed here. Please check.-->
                <div
                    v-for="(item, name, index) in group_item.items"
                    :key="index"
                >
                    <div v-if="item.hasOwnProperty('isGroup')">
                        <!-- Erik: When using the locales files, I think the inner_item variable is no longer needed here. Please check.-->
                        <BootstrapCheckbox
                            v-for="(inner_item, inner_name, inner_index) in item.items"
                            :id="`Checkbox_3_${group_index}_${index}_${inner_index}`"
                            :key="inner_index"
                            :value="stepThree.selected_facilities[group_name][name] === inner_name"
                            :text="translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${group_name}.${name}.${inner_name}`)"
                            :disabled="stepThree.selected_facilities[group_name][name] !== inner_name && stepThree.selected_facilities[group_name][name] !== ''"
                            :tooltip-text="inner_item['tooltip']"
                            @input="e => e === true ? stepThree.selected_facilities[group_name][name] = inner_name : stepThree.selected_facilities[group_name][name] = ''"
                        />
                    </div>
                    <div v-else>
                        <BootstrapCheckbox
                            :id="`Checkbox_3_${group_index}_${index}`"
                            :value="stepThree.selected_facilities[group_name][name] === name"
                            :text="translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${group_name}.${name}`)"
                            :tooltip-text="item['tooltip']"
                            @input="e => e === true ? stepThree.selected_facilities[group_name][name] = name : stepThree.selected_facilities[group_name][name] = ''"
                        />
                    </div>
                </div>
                <!-- Erik: sonst wurden callout IDs zumeist callout3_1 etc. genannt -->
                <div
                    v-if="group_name === 'health' && stepThree.selected_facilities['health']['physicians'] !== ''"
                    id="Infotext_3_1"
                    class="callout"
                >
                    {{ translate('additional:modules.tools.decisionSupport.stepThree.callout.callout3_1') }}
                </div>
                <div
                    v-if="group_name === 'education'"
                    id="Infotext_3_2"
                    class="callout"
                >
                    {{ translate('additional:modules.tools.decisionSupport.stepThree.callout.callout3_2.firstPart') }}<a
                        href="https://www.mk.niedersachsen.de/startseite/schule/unsere_schulen/unsere-schulen-6470.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Link</a>{{ translate('additional:modules.tools.decisionSupport.stepThree.callout.callout3_2.secondPart') }}
                </div>
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
