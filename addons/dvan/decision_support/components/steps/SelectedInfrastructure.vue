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

        getTooltipText (tooltipItem) {
            // creating string with key for translation
            const translationKey = "modules.tools.decisionSupport.stepThree.tooltip." + tooltipItem;
            const translationString = "additional:" + translationKey;

            // getting translation
            const translation = this.translate(translationString);

            // checking if key exists
            if (translation === translationKey) {
                return null;
            }
            return translation;
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
                return undefined;
            }

            return this.$t(completeKey, options);
        }
    }
};
</script>

<template lang="html">
    <div>
        {{ translate('stepThree.text.text1') }}
        <BootstrapAccordion
            id="Accordion3"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                v-for="(groupItem, groupName, groupIndex) in stepThree.facilities"
                :id="`Accordion3-${groupIndex}`"
                :key="groupIndex"
                :text="translate(groupItem.text)"
                :status="selectionStatus(stepThree.selectedFacilities[groupName])"
            >
                <div
                    v-for="(item, name, index) in groupItem.items"
                    :key="index"
                >
                    <div v-if="item.hasOwnProperty('items')">
                        <BootstrapCheckbox
                            v-for="(innerItem, innerName, innerIndex) in item.items"
                            :id="`Checkbox3-${groupIndex}-${index}-${innerIndex}`"
                            :key="innerIndex"
                            :value="stepThree.selectedFacilities[groupName][name] === innerName"
                            :text="translate(innerItem.text)"
                            :disabled="stepThree.selectedFacilities[groupName][name] !== innerName && stepThree.selectedFacilities[groupName][name] !== ''"
                            :tooltip-text="translate(innerItem.tooltip)"
                            @input="e => e === true ? stepThree.selectedFacilities[groupName][name] = innerName : stepThree.selectedFacilities[groupName][name] = ''"
                        />
                    </div>
                    <div v-else>
                        <BootstrapCheckbox
                            :id="`Checkbox3-${groupIndex}-${index}`"
                            :value="stepThree.selectedFacilities[groupName][name] === name"
                            :text="translate(item.text)"
                            :tooltip-text="translate(item['tooltip'])"
                            @input="e => e === true ? stepThree.selectedFacilities[groupName][name] = name : stepThree.selectedFacilities[groupName][name] = ''"
                        />
                    </div>
                </div>
                <div
                    v-if="groupName === 'health' && stepThree.selectedFacilities['health']['physicians'] !== ''"
                    id="Callout3-1"
                    class="callout"
                >
                    {{ translate('stepThree.callout.callout3_1') }}
                </div>
                <div
                    v-if="groupName === 'education'"
                    id="Callout3-2"
                    class="callout"
                >
                    {{ translate('stepThree.callout.callout3_2.firstPart') }}<a
                        href="https://www.mk.niedersachsen.de/startseite/schule/unsere_schulen/unsere-schulen-6470.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Link</a>{{ translate('stepThree.callout.callout3_2.secondPart') }}
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
