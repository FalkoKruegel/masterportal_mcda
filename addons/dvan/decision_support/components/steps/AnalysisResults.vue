<script>
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import AccordionItem from "../../../share_components/accordion/AccordionItem.vue";
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import StatisticChart from "../../../share_components/StatisticChart.vue";
import BootstrapSelect from "../../../share_components/BootstrapSelect.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import {changeLayer} from "../../utils/analysis/run_analysis";
import {loadStatistic1, loadStatistic2, loadStatistic3, loadHotspot} from "../../utils/analysis/statistics";
import {convertLayerName} from "../../utils/util";

export default {
    name: "AnalysisResults",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem,
        AccordionItem,
        BootstrapCheckbox,
        BootstrapSelect,
        StatisticChart
    },
    data () {
        return {
            selected_layer: "grid",
            selected_attr: "multiCriteria",
            weighted: false,
            statistic: false,
            statistics: {
                0: false,
                1: false,
                2: false
            },
            hotspot: false,
            filter: null
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
        },

        checkedLayers2 () {
            const layers = [];

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
        },

        openStatistics (index) {
            if (this.statistics[index] === true) {
                this.statistics[index] = false;
            }
            else {
                this.statistics[index] = true;
                switch (index) {
                    case 0:
                        loadStatistic1();
                        break;
                    case 1:
                        loadStatistic2();
                        break;
                    case 2:
                        loadStatistic3();
                        break;
                    default:
                        break;
                }
            }
        },
        selectStatistic2Layer (layer) {
            this.stepEight.statistics.b.facility = layer;
            this.stepEight.statistics.b.options = null;
            this.stepEight.statistics.b.data = null;
            loadStatistic2();
        },
        selectStatistic3Layer (layer) {
            this.stepEight.statistics.c.facility = layer;
            this.stepEight.statistics.c.options = null;
            this.stepEight.statistics.c.data = null;
            loadStatistic3();
        },
        openStatistic () {
            if (this.statistic === true) {
                this.statistic = false;
            }
            else {
                this.statistic = true;
            }
        },
        openHotspot () {
            if (this.hotspot === true) {
                this.hotspot = false;
                this.stepEight.hotspot.filter = null;
            }
            else {
                this.hotspot = true;
                loadHotspot();
            }
        },
        setFilter (filter) {
            this.stepEight.hotspot.filter = filter;
            if (this.selected_layer === "grid" && this.selected_attr === "multiCriteria") {
                changeLayer(this.selected_layer, this.selected_attr);
            }
            else {
                this.selected_layer = "grid";
                this.selected_attr = "multiCriteria";
            }
        },
        setHotspotFocus (focus) {
            if (focus === false) {
                this.stepEight.hotspot.filter = null;
                changeLayer(this.selected_layer, this.selected_attr);
            }
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

            <br>

            <BootstrapAccordion
                id="Accordion9"
                body-padding-y="5px"
            >
                <AccordionItem
                    id="Accordion-Item9-1"
                    title="Additional Statistics"
                    :opened="statistic"
                    @click="() => openStatistic()"
                >
                    <BootstrapAccordion
                        id="Accordion9-1"
                        body-padding-y="5px"
                    >
                        <AccordionItem
                            id="Accordion9-1-1"
                            title="Service Count per Population-Cell"
                            :opened="statistics[0]"
                            @click="() => openStatistics(0)"
                        >
                            <p>Anzahl der Versorgungseinrichtungen pro Bevölkerungszelle</p>
                            <div
                                v-if="stepEight.statistics.a.loading"
                                class="d-flex justify-content-center"
                            >
                                <div
                                    class="spinner-border"
                                    role="status"
                                />
                            </div>
                            <StatisticChart
                                v-if="!stepEight.statistics.a.loading"
                                id="Chart9-1-1"
                                chart-type="bar"
                                :chart-data="stepEight.statistics.a.data"
                                :chart-options="stepEight.statistics.a.options"
                            />
                        </AccordionItem>
                        <AccordionItem
                            id="Accordion9-1-2"
                            title="Service Quality per Infrastructure"
                            :opened="statistics[1]"
                            @click="() => openStatistics(1)"
                        >
                            <p>Anzahl der sehr gut, gut, usw. versorgten Bevölkerungszellen</p>
                            <BootstrapSelect
                                :values="checkedLayers2"
                                default-text="Select Layer"
                                :convert="convert"
                                @input="selectStatistic2Layer"
                            />
                            <div
                                v-if="stepEight.statistics.b.loading"
                                class="d-flex justify-content-center"
                            >
                                <div
                                    class="spinner-border"
                                    role="status"
                                />
                            </div>
                            <StatisticChart
                                v-if="!stepEight.statistics.b.loading"
                                id="Chart9-1-3"
                                chart-type="bar"
                                :chart-data="stepEight.statistics.b.data"
                                :chart-options="stepEight.statistics.b.options"
                            />
                        </AccordionItem>
                        <AccordionItem
                            id="Accordion9-1-3"
                            title="Service Count per Infrastructure"
                            :opened="statistics[2]"
                            @click="() => openStatistics(2)"
                        >
                            <p>Anzahl der Versorgungseinrichtungen pro Bevölkerungszelle</p>
                            <BootstrapSelect
                                :values="checkedLayers2"
                                default-text="Select Layer"
                                :convert="convert"
                                @input="selectStatistic3Layer"
                            />
                            <div
                                v-if="stepEight.statistics.c.loading"
                                class="d-flex justify-content-center"
                            >
                                <div
                                    class="spinner-border"
                                    role="status"
                                />
                            </div>
                            <StatisticChart
                                v-if="!stepEight.statistics.c.loading"
                                id="Chart9-1-3"
                                chart-type="bar"
                                :chart-data="stepEight.statistics.c.data"
                                :chart-options="stepEight.statistics.c.options"
                            />
                        </AccordionItem>
                    </BootstrapAccordion>
                </AccordionItem>
            </BootstrapAccordion>

            <br>

            <BootstrapAccordion
                id="Accordion10"
                body-padding-y="5px"
            >
                <AccordionItem
                    id="Accordion-Item10-1"
                    title="Identify Hotspots"
                    :opened="hotspot"
                    @click="() => openHotspot()"
                >
                    <p>Anzahl der Versorgungseinrichtungen pro Bevölkerungszelle</p>
                    <div
                        v-if="stepEight.hotspot.loading"
                        class="d-flex justify-content-center"
                    >
                        <div
                            class="spinner-border"
                            role="status"
                        />
                    </div>
                    <StatisticChart
                        v-if="!stepEight.hotspot.loading"
                        id="Chart9-1-3"
                        chart-type="scatter"
                        :chart-data="stepEight.hotspot.data"
                        :chart-options="stepEight.hotspot.options"
                        @selection="(e) => setFilter(e)"
                        @focus="(e) => setHotspotFocus(e)"
                    />
                </AccordionItem>
            </BootstrapAccordion>
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
