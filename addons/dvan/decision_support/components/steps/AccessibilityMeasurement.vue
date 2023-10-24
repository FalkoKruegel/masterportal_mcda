<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import TimeInput from "../TimeInput.vue";

export default {
    name: "AccessibilityMeasurement",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem,
        TimeInput
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters))
    },
    watch: {
        // this watcher checks if the used physician infrastructure are general physicians.
        // If the used physicians are general physicians, the watcher will change the state of step 5 in that way that the default values for general physicians are used.
        "stepThree.health.physicians": function () {
            if (this.stepThree.selected_facilities.health.physicians === "general_physicians") {
                this.stepFive.time_zones.health.physicians = [2, 5, 10, 20];
            }
            else {
                this.stepFive.time_zones.health.physicians = [3, 7, 13, 25];
            }
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
            return this.translate("additional:modules.tools.decisionSupport.stepFive.text.threshold_text") + " " + this.translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${name}.text`);
        },

        getFacilityName (group, name, value) {
            // this method was modified to fit translation requirements

            // item stores values like "pharmacy", "clinic", "supermarket", etc.
            const item = this.stepThree.facilities[group].items[name];

            if (item.isGroup === true) {
                if (value === "") {

                    // return item.text
                    return this.translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${group}.${name}`);
                }

                // return item.items[value].text;
                return this.translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${group}.${name}.${value}`);

            }

            // return item.text
            return this.translate(`additional:modules.tools.decisionSupport.stepThree.accordion.${group}.${name}`);

        },

        setTimeZone (arr, value, index) {
            let val = value;

            if (val <= this.stepFive.minValue + index) {
                val = this.stepFive.minValue + index;
            }
            else if (val >= this.stepFive.maxValue - 3 + index) {
                val = this.stepFive.maxValue - 3 + index;
            }
            const new_arr = [];

            for (let i = 0; i < 4; i++) {
                if (i < index) {
                    new_arr.push(Math.min(val - (index - i), arr[i]));
                }
                if (i === index) {
                    new_arr.push(val);
                }
                if (i > index) {
                    new_arr.push(Math.max(val + (i - index), arr[i]));
                }
            }
            return new_arr;
        },

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
        <p>{{ translate('additional:modules.tools.decisionSupport.stepFive.text.textOne') }}</p>
        <p>{{ translate('additional:modules.tools.decisionSupport.stepFive.text.textTwo') }}</p>
        <BootstrapAccordion
            id="Accordion5"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                id="Accordion5_1"
                :text="translate('additional:modules.tools.decisionSupport.stepFive.accordion.accordion5_1')"
                status="valid"
            >
                <p>{{ translate('additional:modules.tools.decisionSupport.stepFive.text.textThree') }}</p>
                <ul>
                    <li>{{ translate('additional:modules.tools.decisionSupport.stepFive.travelModes.driving-car') }}</li>
                    <li>{{ translate('additional:modules.tools.decisionSupport.stepFive.travelModes.public-transit') }}</li>
                    <li>{{ translate('additional:modules.tools.decisionSupport.stepFive.travelModes.walking-foot') }}</li>
                </ul>
                <p>{{ translate('additional:modules.tools.decisionSupport.stepFive.text.textFour') }}</p>
                <ul>
                    <li>{{ translate('additional:modules.tools.decisionSupport.stepFive.timeInput.time_zones.veryGood') }} {{ translate('additional:modules.tools.decisionSupport.stepFive.timeInput.supply_situation') }}</li>
                    <li>{{ translate('additional:modules.tools.decisionSupport.stepFive.timeInput.time_zones.good') }} {{ translate('additional:modules.tools.decisionSupport.stepFive.timeInput.supply_situation') }}</li>
                    <li>{{ translate('additional:modules.tools.decisionSupport.stepFive.timeInput.time_zones.sufficient') }} {{ translate('additional:modules.tools.decisionSupport.stepFive.timeInput.supply_situation') }}</li>
                    <li>{{ translate('additional:modules.tools.decisionSupport.stepFive.timeInput.time_zones.deficient') }} {{ translate('additional:modules.tools.decisionSupport.stepFive.timeInput.supply_situation') }}</li>
                </ul>
                <p>{{ translate('additional:modules.tools.decisionSupport.stepFive.text.textFive') }}</p>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion5_2"
                parent-id="Accordion5"
                :text="translate('additional:modules.tools.decisionSupport.stepFive.accordion.accordion5_2')"
                status="valid"
            >
                <div class="container text-center">
                    <div
                        class="btn-group"
                        role="group"
                        aria-label="Transportmittel"
                    >
                        <div
                            v-for="(item, name, index) in stepFive.travelModes"
                            :key="index"
                        >
                            <input
                                :id="`Button_5_1_${index}`"
                                v-model="stepFive.transport"
                                type="radio"
                                class="btn-check"
                                name="options"
                                :value="name"
                            >
                            <label
                                class="btn btn-outline-primary"
                                :for="`Button_5_1_${index}`"
                            >
                                {{ translate(`additional:modules.tools.decisionSupport.stepFive.travelModes.${name}`) }}
                            </label>
                        </div>
                    </div>
                </div>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                v-for="(group_item, group_name, group_index) in stepThree.selected_facilities"
                :id="`Accordion5_${group_index+3}`"
                :key="group_index"
                parent-id="Accordion5"
                :text="getGroupName(group_name)"
                :status="selectionStatus(stepThree.selected_facilities[group_name])"
            >
                <BootstrapAccordion
                    :id="`Accordion5_${group_index+3}_1`"
                    body-padding-x="5px"
                    body-padding-y="5px"
                >
                    <BootstrapAccordionItem
                        v-for="(item, name, index) in group_item"
                        :id="`Accordion5_${group_index+3}_1_${index}`"
                        :key="index"
                        :text="getFacilityName(group_name, name, item)"
                        :status="stepThree.selected_facilities[group_name][name] === '' ? 'deactivated' : 'default'"
                    >
                        <div
                            class="container"
                        >
                            <TimeInput
                                :id="`input5_${group_index+3}_1_${index}_1`"
                                :value="stepFive.time_zones[group_name][name]"
                                :index="0"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                :supply-category="translate('additional:modules.tools.decisionSupport.stepFive.timeInput.time_zones.veryGood')"
                                @input="e => stepFive.time_zones[group_name][name] = setTimeZone(stepFive.time_zones[group_name][name], e, 0)"
                            />
                            <TimeInput
                                :id="`input5_${group_index+3}_1_${index}_2`"
                                :value="stepFive.time_zones[group_name][name]"
                                :index="1"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                :supply-category="translate('additional:modules.tools.decisionSupport.stepFive.timeInput.time_zones.good')"
                                @input="e => stepFive.time_zones[group_name][name] = setTimeZone(stepFive.time_zones[group_name][name], e, 1)"
                            />
                            <TimeInput
                                :id="`input5_${group_index+3}_1_${index}_3`"
                                :value="stepFive.time_zones[group_name][name]"
                                :index="2"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                :supply-category="translate('additional:modules.tools.decisionSupport.stepFive.timeInput.time_zones.sufficient')"
                                @input="e => stepFive.time_zones[group_name][name] = setTimeZone(stepFive.time_zones[group_name][name], e, 2)"
                            />
                            <TimeInput
                                :id="`input5_${group_index+3}_1_${index}_4`"
                                :value="stepFive.time_zones[group_name][name]"
                                :index="3"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                :supply-category="translate('additional:modules.tools.decisionSupport.stepFive.timeInput.time_zones.deficient')"
                                @input="e => stepFive.time_zones[group_name][name] = setTimeZone(stepFive.time_zones[group_name][name], e, 3)"
                            />
                        </div>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
    </div>
</template>
