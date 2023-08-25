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
            return "Gewichtung " + this.stepThree.facilities[name].text;
        },

        getFacilityName (group, name, value) {
            const item = this.stepThree.facilities[group].items[name];

            if (item.isGroup === true) {
                if (value === "") {
                    return item.text;
                }

                return item.items[value].text;

            }

            return item.text;

        }
    }
};
</script>

<template lang="html">
    <div>
        <p>Sie haben die Möglichkeit, individuelle Gewichtungen zuzuweisen, um zu bestimmen, wie wichtig jede Infrastruktur in Ihrer Analyse sein soll.</p>
        <p>Sie können Werte zwischen 0 und 100  über den Schieberegler vergeben. Bitte beachten Sie, dass ein Wert von 0 bedeutet, dass die Infrastruktur in der Analyse nicht berücksichtigt wird.</p>
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
