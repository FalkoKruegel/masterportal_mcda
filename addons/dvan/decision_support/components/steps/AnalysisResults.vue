<script>
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import {changeLayer} from "../../utils/analysis/run_analysis";
import {convertLayerName} from "../../utils/util";

export default {
    name: "AnalysisResults",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem,
        BootstrapCheckbox
    },
    data () {
        return {
            selected_layer: "grid",
            selected_attr: "multiCriteria",
            weighted: false
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters)),

        checkedLayers () {
            const layers = ["multiCriteria"];

            for (const group in this.stepThree.selectedFacilities) {
                for (const item in this.stepThree.selectedFacilities[group]) {
                    const name = this.stepThree.selectedFacilities[group][item];

                    if (name === "") {
                        continue;
                    }
                    layers.push(name);
                }
            }

            return layers;
        }
    },
    watch: {
        selected_layer (newVal) {
            if (this.weighted) {
                changeLayer(newVal, this.selected_attr + "_weighted");
            }
            else {
                changeLayer(newVal, this.selected_attr);
            }
        },
        selected_attr (newVal) {
            if (this.weighted) {
                changeLayer(this.selected_layer, newVal + "_weighted");
            }
            else {
                changeLayer(this.selected_layer, newVal);
            }
        },
        weighted (newVal) {
            if (newVal) {
                changeLayer(this.selected_layer, this.selected_attr + "_weighted");
            }
            else {
                changeLayer(this.selected_layer, this.selected_attr);
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

        convert (name) {
            return convertLayerName(name);
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
        <p>{{ translate('stepEight.text.text1') }}</p>
        <p>{{ translate('stepEight.text.text2') }}</p>

        <div v-if="stepEight.status === 'unfinished'">
            <div
                id="Callout8-1"
                class="callout"
            >
                {{ translate('stepEight.callout.callout8_1') }}
            </div>
        </div>

        <div v-if="stepEight.status === 'running'">
            <div class="d-flex justify-content-center">
                <div
                    class="spinner-border"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div
                id="Callout8-2"
                class="callout"
            >
                {{ translate('stepEight.callout.callout8_2') }}
            </div>
        </div>

        <div v-if="stepEight.status === 'finished'">
            <div class="btn-group">
                <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                >
                    {{ convert(selected_attr) }}
                </button>
                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        class="bi bi-caret-down-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </button>
                <ul class="dropdown-menu">
                    <li
                        v-for="layer in checkedLayers"
                        :key="layer"
                    >
                        <a
                            class="dropdown-item"
                            href="#"
                            @click="selected_attr = layer"
                        >{{ convert(layer) }}</a>
                    </li>
                </ul>
            </div>
            <br>
            <br>
            <p>{{ translate('stepEight.text.text3') }}</p>
            <p>{{ translate('stepEight.text.text4') }}</p>

            <BootstrapCheckbox
                id="Checkbox8-1"
                v-model="weighted"
                :text="translate('stepEight.checkbox.checkbox8_1')"
            />
            <BootstrapCheckbox
                id="Checkbox8-2"
                :value="selected_layer === 'heatmap'"
                :text="translate('stepEight.checkbox.checkbox8_2')"
                @input="e => e ? selected_layer = 'heatmap' : selected_layer = 'grid'"
            />
        </div>
        <br>

        <BootstrapAccordion
            id="Accordion8"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                id="Accordion-Item8-1"
                :text="translate('stepEight.accordion.title')"
            >
                <BootstrapAccordion
                    id="Accordion8-1"
                    body-padding-y="5px"
                >
                    <BootstrapAccordionItem
                        id="Accordion8-1-1"
                        :text="translate('stepEight.accordion.accordion8_1_1.title')"
                    >
                        <p>{{ translate('stepEight.accordion.accordion8_1_1.text') }}</p>
                    </BootstrapAccordionItem>

                    <BootstrapAccordionItem
                        id="Accordion8-1-2"
                        :text="translate('stepEight.accordion.accordion8_1_2.title')"
                    >
                        <p>{{ translate('stepEight.accordion.accordion8_1_2.text') }}</p>
                    </BootstrapAccordionItem>

                    <BootstrapAccordionItem
                        id="Accordion8-1-3"
                        :text="translate('stepEight.accordion.accordion8_1_3.title')"
                    >
                        <p>{{ translate('stepEight.accordion.accordion8_1_3.text') }}</p>
                    </BootstrapAccordionItem>

                    <BootstrapAccordionItem
                        id="Accordion8-1-4"
                        :text="translate('stepEight.accordion.accordion8_1_4.title')"
                    >
                        <p>{{ translate('stepEight.accordion.accordion8_1_4.text') }}</p>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
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
