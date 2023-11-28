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
            return this.translate("stepSix.weighting") + " " + this.translate(this.stepThree.facilities[name].text);
        },

        getFacilityName (group, name, value) {

            // stores values like "pharmacy", "clinic", "supermarket", etc.
            const item = this.stepThree.facilities[group].items[name];

            if (item.isGroup === true) {
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
         * translates the given key, checkes if the key exists and throws a console warning if not
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
        <p>{{ translate('stepSix.text.textOne') }}</p>
        <p>{{ translate('stepSix.text.textTwo') }}</p>
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
