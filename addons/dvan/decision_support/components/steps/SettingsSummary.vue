<script>
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
export default {
    name: "SettingsSummary",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem
    },
    data () {
        return {
            checkIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                        </svg>`,
            xIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                    </svg>`
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters))
    },
    watch: {
        stepTwo: {
            handler: function () {
                this.stepSeven.status = "changed";
            },
            deep: true
        },
        stepThree: {
            handler: function () {
                this.stepSeven.status = "changed";
            },
            deep: true
        },
        stepFour: {
            handler: function () {
                this.stepSeven.status = "changed";
            },
            deep: true
        },
        stepFive: {
            handler: function () {
                this.stepSeven.status = "changed";
            },
            deep: true
        },
        stepSix: {
            handler: function () {
                this.stepSeven.status = "changed";
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
            return this.translate("stepSeven.summary") + " " + this.translate(`stepThree.accordion.${name}.text`);
        },

        getFacilityName (group, name, value) {
            // this method was modified to fit translation requirements

            // item stores values like "pharmacy", "clinic", "supermarket", etc.
            const item = this.stepThree.facilities[group].items[name];

            if (item.isGroup === true) {
                if (value === "") {

                    // return item.text
                    return this.translate(`stepThree.accordion.${group}.${name}.text`);
                }

                // return item.items[value].text;
                return this.translate(`stepThree.accordion.${group}.${name}.${value}`);

            }

            // return item.text
            return this.translate(`stepThree.accordion.${group}.${name}`);

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
        <p>{{ translate('stepSeven.text.textOne') }}</p>
        <BootstrapAccordion
            id="Accordion_7"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                v-for="(group_item, group_name, group_index) in stepThree.selected_facilities"
                :id="`Accordion7_${group_index}`"
                :key="group_index"
                :text="getGroupName(group_name)"
                :status="selectionStatus(stepThree.selected_facilities[group_name])"
            >
                <div class="card">
                    <div class="card-header">
                        <span class="text">{{ translate('stepSeven.text.textTwo') }}</span>
                        <span class="value">{{ translate('stepSeven.text.textThree') }}<br>{{ translate('stepSeven.text.textFour') }}</span>
                        <span class="value">{{ translate('stepSeven.text.textFive') }}</span>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li
                            v-for="(item, name, index) in group_item"
                            :key="index"
                            class="list-group-item"
                        >
                            <span class="text">{{ getFacilityName(group_name, name, item) }}</span>
                            <span
                                class="icon"
                                v-html="item !== '' ? checkIcon : xIcon"
                            />
                            <span class="value">{{ stepSix.facility_weights[group_name][name] }}%</span>
                        </li>
                    </ul>
                </div>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
        <br>
        <p>{{ translate('stepSeven.text.textSix') }} "{{ translate('accordionFooter.startAnalysis') }}"{{ translate('stepSeven.text.textSeven') }} "{{ translate('accordionFooter.back') }}"{{ translate('stepSeven.text.textEight') }}</p>
        <p>{{ translate('stepSeven.text.textNine') }}</p>
    </div>
</template>

<style lang="scss" scoped>
.card {
    width: 100%;
    border-radius: 5px;
}
.card .card-header {
    --bs-card-cap-padding-x: 10px;
    --bs-card-cap-padding-y: 0px;
}
.list-group .list-group-item {
    --bs-list-group-item-padding-x: 10px;
}
.text {
    display: inline-block;
    width: calc(100% - 100px);
    vertical-align: middle;
}
.icon {
    position: relative;
    top: -2px;
    display: inline-block;
    width: 45px;
    text-align: center;
    vertical-align: middle;
}
.value {
    display: inline-block;
    text-align: center;
    width: 45px;
    vertical-align: middle;
}
</style>
