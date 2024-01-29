<script>
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import BootstrapRangeSlider from "../../../share_components/BootstrapRangeSlider.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "InfrastructureWeighting",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem,
        BootstrapRangeSlider
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters))
    },
    watch: {
        "stepThree.selectedFacilities": {
            handler () {
                for (const group in this.stepThree.selectedFacilities) {
                    for (const name in this.stepThree.selectedFacilities[group]) {
                        if (this.stepThree.selectedFacilities[group][name] === "") {
                            this.stepSix.facilityWeights[group][name] = 0;
                        }
                    }
                }
                return "invalid";
            },
            deep: true
        }
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
                    return "default";
                }
            }
            return "deactivated";
        },

        getGroupName (name) {
            return this.translate("stepSix.weighting") + " " + this.translate(this.stepThree.facilities[name].text);
        },

        getFacilityName (group, name, value) {

            // stores values like "pharmacy", "clinic", "supermarket", etc.
            const item = this.stepThree.facilities[group].items[name];

            if ("items" in item) {
                // this if-condition is applied to physicians
                // checks if a physician has been chosen in th infrastructure selection, if not it only displays 'physicians' or 'Ärzte'
                if (value === "") {
                    return this.translate(item.text);
                }

                return this.translate(item.items[value].text);

            }

            return this.translate(item.text);

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
        <p>{{ translate('stepSix.text.text1') }}</p>
        <p>{{ translate('stepSix.text.text2') }}</p>
        <BootstrapAccordion
            id="Accordion3"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                v-for="(groupItem, groupName, groupIndex) in stepSix.facilityWeights"
                :id="`Accordion6-${groupIndex}`"
                :key="groupIndex"
                :text="getGroupName(groupName)"
                :status="selectionStatus(stepThree.selectedFacilities[groupName])"
            >
                <BootstrapRangeSlider
                    v-for="(item, name, index) in groupItem"
                    :id="`Range6-${groupIndex}-${index}`"
                    :key="index"
                    :value="stepSix.facilityWeights[groupName][name]"
                    :disabled="stepThree.selectedFacilities[groupName][name] === ''"
                    @input="e => stepSix.facilityWeights[groupName][name] = e"
                >
                    {{ getFacilityName(groupName, name, stepThree.selectedFacilities[groupName][name]) }}
                </BootstrapRangeSlider>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
    </div>
</template>

<style lang="scss" scoped>
</style>
