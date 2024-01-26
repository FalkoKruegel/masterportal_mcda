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
            if (this.stepThree.selectedFacilities.health.physicians === "generalPhysicians") {
                this.stepFive.timeZones.health.physicians = [2, 5, 10, 20];
            }
            else {
                this.stepFive.timeZones.health.physicians = [3, 7, 13, 25];
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
            return this.translate("stepFive.text.thresholdText") + " " + this.translate(this.stepThree.facilities[name].text);
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

        setTimeZone (arr, value, index) {
            let val = value;

            if (val <= this.stepFive.minValue + index) {
                val = this.stepFive.minValue + index;
            }
            else if (val >= this.stepFive.maxValue - 3 + index) {
                val = this.stepFive.maxValue - 3 + index;
            }
            const newArray = [];

            for (let i = 0; i < 4; i++) {
                if (i < index) {
                    newArray.push(Math.min(val - (index - i), arr[i]));
                }
                if (i === index) {
                    newArray.push(val);
                }
                if (i > index) {
                    newArray.push(Math.max(val + (i - index), arr[i]));
                }
            }
            return newArray;
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
        <p>{{ translate('stepFive.text.text1') }}</p>
        <p>{{ translate('stepFive.text.text2') }}</p>
        <BootstrapAccordion
            id="Accordion5"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                id="Accordion5-1"
                :text="translate('stepFive.accordion.accordion5_1')"
                status="valid"
            >
                <p>{{ translate('stepFive.text.text3') }}</p>
                <ul>
                    <li
                        v-for="(item, name, index) in stepFive.travelModes"
                        :key="index"
                    >
                        {{ translate(item['text']) }}
                    </li>
                </ul>
                <p>{{ translate('stepFive.text.text4') }}</p>
                <ul>
                    <li>{{ translate('stepFive.timeInput.timeZones.veryGood') }} {{ translate('stepFive.timeInput.supplySituation') }}</li>
                    <li>{{ translate('stepFive.timeInput.timeZones.good') }} {{ translate('stepFive.timeInput.supplySituation') }}</li>
                    <li>{{ translate('stepFive.timeInput.timeZones.sufficient') }} {{ translate('stepFive.timeInput.supplySituation') }}</li>
                    <li>{{ translate('stepFive.timeInput.timeZones.deficient') }} {{ translate('stepFive.timeInput.supplySituation') }}</li>
                </ul>
                <p>{{ translate('stepFive.text.text5') }}</p>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion5-2"
                parent-id="Accordion5"
                :text="translate('stepFive.accordion.accordion5_2')"
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
                                :id="`Button-5-1-${index}`"
                                v-model="stepFive.transport"
                                type="radio"
                                class="btn-check"
                                name="options"
                                :value="name"
                            >
                            <label
                                class="btn btn-outline-primary"
                                :for="`Button-5-1-${index}`"
                            >
                                {{ translate(item['text']) }}
                            </label>
                        </div>
                    </div>
                </div>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                v-for="(groupItem, groupName, groupIndex) in stepThree.selectedFacilities"
                :id="`Accordion5-${groupIndex+3}`"
                :key="groupIndex"
                parent-id="Accordion5"
                :text="getGroupName(groupName)"
                :status="selectionStatus(stepThree.selectedFacilities[groupName])"
            >
                <BootstrapAccordion
                    :id="`Accordion5-${groupIndex+3}-1`"
                    body-padding-x="5px"
                    body-padding-y="5px"
                >
                    <BootstrapAccordionItem
                        v-for="(item, name, index) in groupItem"
                        :id="`Accordion5-${groupIndex+3}-1-${index}`"
                        :key="index"
                        :text="getFacilityName(groupName, name, item)"
                        :status="stepThree.selectedFacilities[groupName][name] === '' ? 'deactivated' : 'default'"
                    >
                        <div
                            class="container"
                        >
                            <TimeInput
                                :id="`input5-${groupIndex+3}-1-${index}-1`"
                                :value="stepFive.timeZones[groupName][name]"
                                :index="0"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                :supply-category="translate('stepFive.timeInput.timeZones.veryGood')"
                                @input="e => stepFive.timeZones[groupName][name] = setTimeZone(stepFive.timeZones[groupName][name], e, 0)"
                            />
                            <TimeInput
                                :id="`input5-${groupIndex+3}-1-${index}-2`"
                                :value="stepFive.timeZones[groupName][name]"
                                :index="1"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                :supply-category="translate('stepFive.timeInput.timeZones.good')"
                                @input="e => stepFive.timeZones[groupName][name] = setTimeZone(stepFive.timeZones[groupName][name], e, 1)"
                            />
                            <TimeInput
                                :id="`input5-${groupIndex+3}-1-${index}-3`"
                                :value="stepFive.timeZones[groupName][name]"
                                :index="2"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                :supply-category="translate('stepFive.timeInput.timeZones.sufficient')"
                                @input="e => stepFive.timeZones[groupName][name] = setTimeZone(stepFive.timeZones[groupName][name], e, 2)"
                            />
                            <TimeInput
                                :id="`input5-${groupIndex+3}-1-${index}-4`"
                                :value="stepFive.timeZones[groupName][name]"
                                :index="3"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                :supply-category="translate('stepFive.timeInput.timeZones.deficient')"
                                @input="e => stepFive.timeZones[groupName][name] = setTimeZone(stepFive.timeZones[groupName][name], e, 3)"
                            />
                        </div>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
    </div>
</template>
