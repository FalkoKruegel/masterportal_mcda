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
        "stepThree.selected_facilities": {
            handler () {
                for (const group in this.stepThree.selected_facilities) {
                    for (const name in this.stepThree.selected_facilities[group]) {
                        if (this.stepThree.selected_facilities[group][name] === "") {
                            this.stepSix.facility_weights[group][name] = 0;
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
            // this method was modified to fit translation requirements
            return this.translate("additional:modules.tools.decisionSupport.stepSix.weighting") + " " + this.translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${name}.text`);
        },

        getFacilityName (group, name, value) {
            // this method was modified to fit translation requirements

            // item stores values like "pharmacy", "clinic", "supermarket", etc.
            const item = this.stepThree.facilities[group].items[name];

            if (item.isGroup === true) {
                if (value === "") {

                    // return item.text
                    return this.translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${group}.${name}.text`);
                }

                // return item.items[value].text;
                return this.translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${group}.${name}.${value}`);

            }

            // return item.text
            return this.translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${group}.${name}`);

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
        <p>{{ translate('additional:modules.tools.decisionSupport.stepSix.text.textOne') }}</p>
        <p>{{ translate('additional:modules.tools.decisionSupport.stepSix.text.textTwo') }}</p>
        <BootstrapAccordion
            id="Accordion_3"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                v-for="(group_item, group_name, group_index) in stepSix.facility_weights"
                :id="`Accordion6_${group_index}`"
                :key="group_index"
                :text="getGroupName(group_name)"
                :status="selectionStatus(stepThree.selected_facilities[group_name])"
            >
                <BootstrapRangeSlider
                    v-for="(item, name, index) in group_item"
                    :id="`Range6_${group_index}_${index}`"
                    :key="index"
                    :value="stepSix.facility_weights[group_name][name]"
                    :disabled="stepThree.selected_facilities[group_name][name] === ''"
                    @input="e => stepSix.facility_weights[group_name][name] = e"
                >
                    {{ getFacilityName(group_name, name, stepThree.selected_facilities[group_name][name]) }}
                </BootstrapRangeSlider>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
    </div>
</template>

<style lang="scss" scoped>
</style>
