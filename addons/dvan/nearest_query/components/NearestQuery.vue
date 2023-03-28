
<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import {DragBox} from "ol/interaction";
import {Vector as VectorLayer} from "ol/layer";
import {Vector as VectorSource} from "ol/source";
import {Style, Stroke, Fill} from "ol/style";
import Feature from "ol/Feature.js";
import Polygon from "ol/geom/Polygon.js";
import getters from "../store/getters";
import BootstrapCheckbox from "../../share_components/BootstrapCheckbox.vue";
import BootstrapAccordion from "../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../share_components/accordion/BootstrapAccordionItem.vue";
import BootstrapMultiSelect from "../../share_components/BootstrapMultiSelect.vue";
import BootstrapToggleButton from "../../share_components/BootstrapToggleButton.vue";
import StatisticChart from "./StatisticChart.vue";

const dragBox = new DragBox({
    condition: (e) => {
        return e.originalEvent.ctrlKey;
    }
});
const layer = new VectorLayer({
    source: new VectorSource({
        features: []
    })
});

const dragBox2 = new DragBox({});
let listener2 = null;
let layers2 = [null, null];
const defaultStyle = new Style({
    stroke: new Stroke({
        color: "#3399CC",
        width: 1.25
    }),
    fill: new Fill({
        color: "rgba(255,255,255,0.4)"
    })
});
const highlightStyle = new Style({
    stroke: new Stroke({
        color: "red",
        width: 1.25
    }),
    fill: new Fill({
        color: "rgba(255, 0, 0, 0.2)"
    })
});

export default {
    name: "NearestQuery",
    components: {
        ToolTemplate,
        BootstrapCheckbox,
        BootstrapAccordion,
        BootstrapAccordionItem,
        BootstrapMultiSelect,
        BootstrapToggleButton,
        StatisticChart
    },
    data () {
        return {
            toggles: {0: false, 1: false}
        };
    },
    computed: {
        ...mapGetters("Tools/NearestQuery", Object.keys(getters))
    },
    watch: {
        "results.facility_count_values": {
            async handler () {
                await this.requestComputed();
                await this.requestStatistics();
            },
            deep: true
        },
        "results.visualization_value": async function () {
            await this.requestComputed();
            await this.requestStatistics();
        },
        "results.statistics_type": function (newVal) {
            for (const layer of layers2) {
                if (layer === null) {
                    continue;
                }
                this.removeLayerFromMap(layer);
            }
            if (newVal === "all") {
                this.results.statistic_extends = [null];
                this.results.statistics = [
                    {
                        chart_counts: [],
                        chart_mean: 0,
                        chart_std: 0,
                        chart_median: 0,
                        chart_min: 0,
                        chart_max: 0
                    }
                ];
                layers2 = [null];
            }
            else if (newVal === "selected") {
                this.results.statistic_extends = [null];
                this.results.statistics = [
                    {
                        chart_counts: [],
                        chart_mean: 0,
                        chart_std: 0,
                        chart_median: 0,
                        chart_min: 0,
                        chart_max: 0
                    }
                ];
                layers2 = [null];
            }
            else {
                this.results.statistic_extends = [null, null];
                this.results.statistics = [
                    {
                        chart_counts: [],
                        chart_mean: 0,
                        chart_std: 0,
                        chart_median: 0,
                        chart_min: 0,
                        chart_max: 0
                    },
                    {
                        chart_counts: [],
                        chart_mean: 0,
                        chart_std: 0,
                        chart_median: 0,
                        chart_min: 0,
                        chart_max: 0
                    }
                ];
                layers2 = [null, null];
            }
            this.requestStatistics();
        }
    },
    created () {
        this.$on("close", this.close);
    },
    mounted () {
        this.initialize();
        if (this.isActive) {
            this.setActive(true);
        }
    },
    methods: {
        ...mapActions("Tools/NearestQuery", [
            "initialize",
            "runRequest",
            "requestComputed",
            "requestStatistics"
        ]),
        ...mapMutations("Tools/NearestQuery", ["setActive"]),
        ...mapActions("Maps", ["addInteraction", "removeInteraction", "addLayer"]),
        ...mapMutations("Maps", ["removeLayerFromMap"]),

        /**
     * Closes this tool window by setting active to false
     * @returns {void}
     */
        close () {
            this.setActive(false);

            // TODO replace trigger when Menu is migrated
            // set the backbone model to active false for changing CSS class in menu (menu/desktop/tool/view.toggleIsActiveClass)
            // else the menu-entry for this tool is always highlighted
            const model = Radio.request("ModelList", "getModelByAttributes", {
                id: this.$store.state.Tools.AccessibilitiesLgln.id
            });

            if (model) {
                model.set("isActive", false);
            }
        },

        activateOwnArea (newVal) {
            if (newVal === true) {
                this.params.area_selection = "ownArea";
                dragBox.on("boxend", () => {
                    const extent = dragBox.getGeometry().getExtent();

                    this.params.area_extent = null;
                    this.params.area_extent = extent;
                    this.removeLayerFromMap(layer);
                    const feature = new Feature({
                        geometry: new Polygon([
                            [
                                [extent[0], extent[1]],
                                [extent[0], extent[3]],
                                [extent[2], extent[3]],
                                [extent[2], extent[1]]
                            ]
                        ]),
                        name: "ownAreaExtent"
                    });
                    const source = new VectorSource({
                        features: [feature],
                        useSpatialIndex: false
                    });

                    layer.setSource(source);
                    layer.setZIndex(1000);
                    this.addLayer(layer);
                });
                this.addInteraction(dragBox);
            }
            else {
                this.params.area_selection = null;
                this.params.area_extent = null;
                this.removeInteraction(dragBox);
                this.removeLayerFromMap(layer);
            }
        },

        activateStatisticsExtend (index, activate) {
            this.removeInteraction(dragBox2);
            if (listener2 !== null) {
                dragBox2.un("boxend", listener2);
            }
            for (const key in this.toggles) {
                this.toggles[key] = false;
            }
            this.toggles[index] = activate;
            if (activate === true) {
                listener2 = () => {
                    const extent = dragBox2.getGeometry().getExtent();

                    this.results.statistic_extends[index] = [
                        extent[0],
                        extent[1],
                        extent[2],
                        extent[3]
                    ];
                    this.requestStatistics();
                    const feature = new Feature({
                        geometry: new Polygon([
                            [
                                [extent[0], extent[1]],
                                [extent[0], extent[3]],
                                [extent[2], extent[3]],
                                [extent[2], extent[1]]
                            ]
                        ])
                    });
                    const source = new VectorSource({
                        features: [feature],
                        useSpatialIndex: false
                    });
                    let layer2 = layers2[index];

                    if (layer2 !== null) {
                        this.removeLayerFromMap(layer2);
                        layer2.setSource(source);
                    }
                    else {
                        layer2 = new VectorLayer({
                            source: source,
                            style: defaultStyle
                        });
                    }
                    layer2.setZIndex(1000);
                    this.addLayer(layer2);
                    layers2[index] = layer2;
                };
                dragBox2.on("boxend", listener2);
                this.addInteraction(dragBox2);
            }
        },

        highlightExtent (index, highlight) {
            const layer2 = layers2[index];

            if (layer2 === null) {
                return;
            }
            if (highlight) {
                layer2.setStyle(highlightStyle);
            }
            else {
                layer2.setStyle(defaultStyle);
            }
        }
    }
};
</script>

<template lang="html">
    <ToolTemplate
        :title="'Nearest Query Tool'"
        :icon="icon"
        :active="active"
        :render-to-window="renderToWindow"
        :resizable-window="resizableWindow"
        :deactivate-gfi="deactivateGFI"
    >
        <template #toolBody>
            <div
                v-if="active"
                id="vue-addon"
            >
                <p>Bitte wählen Sie Infrastrukturen, die Sie in die Analyse einbeziehen wollen:</p>
                <BootstrapAccordion
                    id="Accordion_3"
                    body-padding-y="5px"
                >
                    <!-- Nahversorgungs Infrastrukturen -->
                    <BootstrapAccordionItem
                        id="Accordion_3_1"
                        parent-id="Accordion_3"
                        text="Nahversorgung"
                    >
                        <BootstrapCheckbox
                            id="Checkbox_3_1_1"
                            :value="params.infrastructure === 'supermarket'"
                            text="Supermärkte"
                            @input="e => e === true ? params.infrastructure = 'supermarket' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_1_2"
                            :value="params.infrastructure === 'discounter'"
                            text="Discounter"
                            @input="e => e === true ? params.infrastructure = 'discounter' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_1_3"
                            :value="params.infrastructure === 'others'"
                            text="sonstige Lebensmittelgeschäfte"
                            tooltip-text="Hierzu zählen Standorte des Lebensmittelhandwerkes<br> (Bäcker/Fleischer), Hof- und Bioläden und sonstige<br> Lebensmittelgeschäfte."
                            @input="e => e === true ? params.infrastructure = 'others' : params.infrastructure = null"
                        />
                    </BootstrapAccordionItem>

                    <!-- Gesundheits Infrastrukturen -->
                    <BootstrapAccordionItem
                        id="Accordion_3_2"
                        parent-id="Accordion_3"
                        text="Gesundheit"
                    >
                        <BootstrapCheckbox
                            id="Checkbox_3_2_1"
                            :value="params.infrastructure === 'pharmacies'"
                            text="Apotheken"
                            @input="e => e === true ? params.infrastructure = 'pharmacies' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_2"
                            :value="params.infrastructure === 'clinics'"
                            text="Hochschulkliniken und Plankrankenhäuser"
                            @input="e => e === true ? params.infrastructure = 'clinics' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_3"
                            :value="params.infrastructure === 'general_physicians'"
                            text="Hausärzte"
                            @input="e => e === true ? params.infrastructure = 'general_physicians' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_4"
                            :value="params.infrastructure === 'paediatricians'"
                            text="Kinder- und Jugendärzte"
                            @input="e => e === true ? params.infrastructure = 'paediatricians' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_5"
                            :value="params.infrastructure === 'ophthalmologists'"
                            text="Augenärzte"
                            @input="e => e === true ? params.infrastructure = 'ophthalmologists' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_6"
                            :value="params.infrastructure === 'surgeons'"
                            text="Chirurgen und Orthopäden"
                            @input="e => e === true ? params.infrastructure = 'surgeons' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_7"
                            :value="params.infrastructure === 'gynaecologists'"
                            text="Frauenärzte"
                            @input="e => e === true ? params.infrastructure = 'gynaecologists' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_8"
                            :value="params.infrastructure === 'dermatologists'"
                            text="Hautärzte"
                            @input="e => e === true ? params.infrastructure = 'dermatologists' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_9"
                            :value="params.infrastructure === 'otolaryngologist'"
                            text="HNO-Ärzte"
                            @input="e => e === true ? params.infrastructure = 'otolaryngologist' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_10"
                            :value="params.infrastructure === 'neurologist'"
                            text="Nervenärzte"
                            @input="e => e === true ? params.infrastructure = 'neurologist' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_11"
                            :value="params.infrastructure === 'psychotherapists'"
                            text="Psychotherapeuten"
                            @input="e => e === true ? params.infrastructure = 'psychotherapists' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_2_12"
                            :value="params.infrastructure === 'urologists'"
                            text="Urologen"
                            @input="e => e === true ? params.infrastructure = 'urologists' : params.infrastructure = null"
                        />
                    </BootstrapAccordionItem>

                    <!-- Bildungs Infrastrukturen -->
                    <BootstrapAccordionItem
                        id="Accordion_3_3"
                        parent-id="Accordion_3"
                        text="Bildung"
                    >
                        <BootstrapCheckbox
                            id="Checkbox_3_3_1"
                            :value="params.infrastructure === 'nurseries'"
                            text="Kindertagesstätten"
                            tooltip-text="Einrichtungen zur Betreuung von Kindern  bis zum sechsten Lebensjahr. Ohne Horteinrichtungen."
                            @input="e => e === true ? params.infrastructure = 'nurseries' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_3_2"
                            :value="params.infrastructure === 'primary_schools'"
                            text="Primärschulen"
                            tooltip-text="Primärbereich umfasst die 1. bis 4. Schuljahrgänge."
                            @input="e => e === true ? params.infrastructure = 'primary_schools' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_3_3"
                            :value="params.infrastructure === 'secondary_1'"
                            text="Sekundarstufe Bereich 1, ohne (Fach)Hochschulreife"
                            tooltip-text="Haupt-, Real-, Ober- und Gesamtschulen ohne Möglichkeit zum Erwerb der (Fach)Hochschulreife."
                            @input="e => e === true ? params.infrastructure = 'secondary_1' : params.infrastructure = null"
                        />
                        <BootstrapCheckbox
                            id="Checkbox_3_3_4"
                            :value="params.infrastructure === 'secondary_2'"
                            text="Sekundarstufe Bereich 1 und 2, mit Möglichkeit zu Erwerb der (Fach)Hochschulreife"
                            tooltip-text="Gesamtschulen und Gymnasien mit Möglichkeiten zum Erwerb der (Fach)Hochschulreife."
                            @input="e => e === true ? params.infrastructure = 'secondary_2' : params.infrastructure = null"
                        />
                        <div
                            id="Infotext_3_2"
                            class="callout"
                        >
                            Die niedersächsischen Schulstrukturen und die Schulform lassen sich unter folgendem <a
                                href="https://www.mk.niedersachsen.de/startseite/schule/unsere_schulen/unsere-schulen-6470.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >Link</a> abrufen.
                        </div>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
                <br>
                <p>Ausgewählte Infrastrukturen: <b>{{ params.infrastructure }}</b></p>

                <p>Bitte wählen Sie aus zu wie vielen nächst gelegenen Infrastruktuen die Erreichbarkeit bestimmt werden soll:</p>
                <div>
                    <label
                        for="facility_count_1"
                        class="col-form-label"
                    >
                        <input
                            id="facility_count_1"
                            v-model="params.facility_count"
                            type="number"
                            step="1"
                            :min="1"
                            :max="10"
                            class="form-control"
                        >
                    </label>
                </div>
                <br>

                <p>Bitte wählen Sie ein Analysegebiet aus:</p>

                <BootstrapCheckbox
                    id="Checkbox_2_1"
                    :value="params.area_selection === 'wholeLowerSaxony'"
                    text="Niedersachsenweite Analyse"
                    :disabled="params.area_selection === 'ownArea'"
                    @input="e => e === true ? params.area_selection = 'wholeLowerSaxony' : params.area_selection = null"
                />
                <BootstrapCheckbox
                    id="Checkbox_2_2"
                    :value="params.area_selection === 'ownArea'"
                    text="Eigene Gebietsselektion"
                    :disabled="params.area_selection === 'wholeLowerSaxony'"
                    @input="e => activateOwnArea(e)"
                />
                <div
                    v-if="params.area_selection === 'ownArea'"
                    id="Callout2_1"
                    class="callout"
                >
                    Halten Sie die Strg-Taste gedrückt und ziehen Sie für die Gebietsselektion ein Kartenfenster auf!
                </div>
                <br>

                <p>Wählen Sie die zu verwendenden Erreichbarkeitsparameter aus:</p>
                <select
                    v-model="params.travel_mode"
                    class="form-select"
                >
                    <option
                        value="driving-car"
                        selected
                    >
                        PKW
                    </option>
                    <option value="pedestrian">
                        Füßgänger
                    </option>
                </select>
                <br>
                <select
                    v-model="params.range_type"
                    class="form-select"
                >
                    <option
                        value="discrete"
                        selected
                    >
                        Diskrete Erreichbarkeitsschritte
                    </option>
                    <option value="continuus">
                        Kontinuirliche Erreichbarkeiten
                    </option>
                </select>
                <br>
                <div>
                    <label
                        :for="id"
                        class="form-label"
                    >
                        Maximale Reichweite: {{ params.range_max }}
                    </label>
                    <input
                        id="Range_1_1"
                        v-model="params.range_max"
                        class="form-range"
                        type="range"
                        :min="60"
                        :max="3600"
                        :step="60"
                    >
                </div>
                <div v-if="params.range_type === 'discrete'">
                    <label
                        :for="id"
                        class="form-label"
                    >
                        Reichweiten Steps: {{ params.range_steps }}
                    </label>
                    <input
                        id="Range_1_2"
                        v-model="params.range_steps"
                        class="form-range"
                        type="range"
                        :min="1"
                        :max="20"
                        :step="1"
                    >
                </div>
                <br>
                <div class="col text-end">
                    <button
                        type="button"
                        class="btn btn-outline-primary btn-sm"
                        @click="runRequest"
                    >
                        Starte Berechnung
                    </button>
                </div>
                <br>

                <div v-if="results.status === 'running'">
                    <div class="d-flex justify-content-center">
                        <div
                            class="spinner-border"
                            role="status"
                        >
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div
                        id="Infotext8_2"
                        class="callout"
                    >
                        Das Ergebnis steht in Kürze bereit...
                    </div>
                </div>

                <BootstrapAccordion
                    id="Accordion_2"
                    body-padding-y="5px"
                >
                    <!-- Nahversorgungs Infrastrukturen -->
                    <BootstrapAccordionItem
                        id="Accordion_2_1"
                        text="Ergebnisse"
                        :status="results.status === 'finished' ? 'valid' : 'deactivated'"
                    >
                        <p>Wählen Sie aus für welche Facilities Ergebnisse angezeigt werden sollen:</p>
                        <BootstrapMultiSelect
                            v-model="results.facility_count_values"
                            default-text="Please select some Items"
                        />
                        <br>
                        <p>Wählen Sie den visualisierten Wert aus:</p>
                        <select
                            v-model="results.visualization_value"
                            class="form-select"
                        >
                            <option
                                value="mean"
                                selected
                            >
                                Durchschnitt
                            </option>
                            <option value="median">
                                Median
                            </option>
                            <option value="min">
                                Minimum
                            </option>
                            <option value="max">
                                Maximum
                            </option>
                        </select>
                        <br>
                        <p>Wählen Sie den zu analysierenden Bereich aus:</p>
                        <select
                            v-model="results.statistics_type"
                            class="form-select"
                        >
                            <option
                                value="all"
                                selected
                            >
                                Gesamt
                            </option>
                            <option value="selected">
                                Teilbereich
                            </option>
                            <option value="selected_compare">
                                Vergleich von Teilbereichen
                            </option>
                        </select>
                        <br>
                        <div v-if="results.statistics_type === 'all'">
                            <StatisticChart
                                :ranges="results.chart_ranges.map(range => range / 60)"
                                :counts="results.statistics[0].chart_counts"
                                :y-scale="results.statistics_chart_scale"
                                :mean="results.statistics[0].chart_mean"
                                :std="results.statistics[0].chart_std"
                                :median="results.statistics[0].chart_median"
                                :min="results.statistics[0].chart_min"
                                :max="results.statistics[0].chart_max"
                            />
                        </div>
                        <div v-if="results.statistics_type === 'selected'">
                            <p>Bitte wählen Sie den Teilausschnitt aus für den die Statistik ermittelt werden soll:</p>
                            <div class="float-child-header">
                                <BootstrapToggleButton
                                    :value="toggles[0]"
                                    @input="e => activateStatisticsExtend(0, !toggles[0])"
                                >
                                    Select Area
                                </BootstrapToggleButton>
                            </div>
                            <StatisticChart
                                :ranges="results.chart_ranges.map(range => range / 60)"
                                :counts="results.statistics[0].chart_counts"
                                :y-scale="results.statistics_chart_scale"
                                :mean="results.statistics[0].chart_mean"
                                :std="results.statistics[0].chart_std"
                                :median="results.statistics[0].chart_median"
                                :min="results.statistics[0].chart_min"
                                :max="results.statistics[0].chart_max"
                                @focus="e => highlightExtent(0, e)"
                            />
                        </div>
                        <div v-if="results.statistics_type === 'selected_compare'">
                            <p>Bitte wählen Sie den Teilausschnitt aus für den die Statistik ermittelt werden soll:</p>
                            <div class="float-child">
                                <div class="float-child-header">
                                    <BootstrapToggleButton
                                        :value="toggles[0]"
                                        @input="e => activateStatisticsExtend(0, !toggles[0])"
                                    >
                                        Select Area
                                    </BootstrapToggleButton>
                                </div>
                                <StatisticChart
                                    :ranges="results.chart_ranges.map(range => range / 60)"
                                    :counts="results.statistics[0].chart_counts"
                                    :y-scale="results.statistics_chart_scale"
                                    :mean="results.statistics[0].chart_mean"
                                    :std="results.statistics[0].chart_std"
                                    :median="results.statistics[0].chart_median"
                                    :min="results.statistics[0].chart_min"
                                    :max="results.statistics[0].chart_max"
                                    @focus="e => highlightExtent(0, e)"
                                />
                            </div>

                            <div class="float-child">
                                <div class="float-child-header">
                                    <BootstrapToggleButton
                                        :value="toggles[1]"
                                        @input="e => activateStatisticsExtend(1, !toggles[1])"
                                    >
                                        Select Area
                                    </BootstrapToggleButton>
                                </div>
                                <StatisticChart
                                    :ranges="results.chart_ranges.map(range => range / 60)"
                                    :counts="results.statistics[1].chart_counts"
                                    :y-scale="results.statistics_chart_scale"
                                    :mean="results.statistics[1].chart_mean"
                                    :std="results.statistics[1].chart_std"
                                    :median="results.statistics[1].chart_median"
                                    :min="results.statistics[1].chart_min"
                                    :max="results.statistics[1].chart_max"
                                    @focus="e => highlightExtent(1, e)"
                                />
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
                <button @click="testLog(results.facility_count_values)">
                    test
                </button>
            </div>
        </template>
    </ToolTemplate>
</template>

<style lang="scss" scoped>
.callout {
  padding: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  background-color: var(--bd-callout-bg, var(--bs-gray-100));
  border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
}

.float-child {
  width: 50%;
  float: left;
}
.float-child-header {
  padding: 0px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow-y: hidden;
}
</style>
