<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import BootstrapToggleButton from "../../../share_components/BootstrapToggleButton.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import {LAYERS, select_data_subset, select_all_data} from "../../utils/run_analysis";
import {addLayer, removeLayer} from "../../../share_utils/map.js";
import Chart from "chart.js";
import {DragBox} from "ol/interaction";
import {Vector as VectorLayer} from "ol/layer";
import {Vector as VectorSource} from "ol/source";
import {Style, Stroke} from "ol/style";
import Feature from "ol/Feature.js";
import Polygon from "ol/geom/Polygon.js";

const dragBox = new DragBox({});
const style = new Style({
    stroke: new Stroke({
        color: "red",
        width: 1.25
    })
});
const layer = new VectorLayer({
    source: new VectorSource({
        features: []
    }),
    style: style
});
let listener = null;

export default {
    name: "AnalysisResults",
    components: {
        BootstrapCheckbox,
        BootstrapToggleButton
    },
    data () {
        return {
            chart: null,
            is_drag_active: false,
            drag_start: null,
            drag_end: null,

            toggle: false
        };
    },
    computed: {
        ...mapGetters("Tools/SpatialAnalysis", Object.keys(getters))
    },
    watch: {
        "stepSeven.show_result": function (newVal) {
            if (newVal) {
                if (LAYERS.result === null) {
                    return;
                }
                addLayer(LAYERS.result.getOlLayer(), () => {
                    this.stepSeven.show_result = false;
                });
            }
            else {
                removeLayer("spatial_analysis_result");
            }
        },
        "stepSeven.show_population": function (newVal) {
            if (newVal) {
                if (LAYERS.population === null) {
                    return;
                }
                addLayer(LAYERS.population.getOlLayer(), () => {
                    this.stepSeven.show_population = false;
                });
            }
            else {
                removeLayer("spatial_analysis_population");
            }
        },
        "stepSeven.plot_data_1": function () {
            this.chart.data.datasets[0].data = this.stepSeven.plot_data_1;
            this.chart.update();
        },
        "stepSeven.plot_data_2": function () {
            this.chart.data.datasets[1].data = this.stepSeven.plot_data_2;
            this.chart.update();
        }
    },
    mounted () {
        this.chart = new Chart(this.$refs.canvas, {
            type: "scatter",
            options: {
                maintainAspectRatio: false,
                animation: false,
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    y: {
                        ticks: {
                            min: 0,
                            max: 100
                        },
                        scaleLabel: {
                            display: false,
                            labelString: "Anzahl"
                        }
                    },
                    x: {
                        scaleLabel: {
                            display: true,
                            labelString: "Minuten"
                        },
                        type: "linear",
                        position: "bottom"
                    }
                }
            },
            data: {
                datasets: [
                    {
                        label: "counts1",
                        backgroundColor: "red",
                        data: this.stepSeven.plot_data_1
                    },
                    {
                        label: "counts2",
                        backgroundColor: "green",
                        data: this.stepSeven.plot_data_2
                    }
                ]
            }
        });

        this.set_data();
    },
    methods: {
        ...mapActions("Tools/SpatialAnalysis", ["initialize"]),
        ...mapMutations("Tools/SpatialAnalysis", ["setActive"]),
        ...mapActions("Maps", ["addInteraction", "removeInteraction", "addLayer"]),
        ...mapMutations("Maps", ["removeLayerFromMap"]),

        set_data () {
            if (this.drag_end !== null && this.drag_start !== null) {
                const rect = this.$refs.overlay.getBoundingClientRect();
                const scaleX = this.$refs.overlay.width / rect.width;
                const scaleY = this.$refs.overlay.height / rect.height;

                const yTop = this.chart.chartArea.top;
                const yBottom = this.chart.chartArea.bottom;
                const yMin = this.chart.scales["y-axis-1"].min;
                const yMax = this.chart.scales["y-axis-1"].max;
                const y_start = ((Math.abs((this.drag_start[1] / scaleY - yTop) / (yBottom - yTop)) - 1) * -1) * Math.abs(yMax - yMin) + yMin;
                const y_end = ((Math.abs((this.drag_end[1] / scaleY - yTop) / (yBottom - yTop)) - 1) * -1) * Math.abs(yMax - yMin) + yMin;

                const xTop = this.chart.chartArea.left;
                const xBottom = this.chart.chartArea.right;
                const xMin = this.chart.scales["x-axis-1"].min;
                const xMax = this.chart.scales["x-axis-1"].max;
                const x_start = Math.abs((this.drag_start[0] / scaleX - xTop) / (xBottom - xTop)) * Math.abs(xMax - xMin) + xMin;
                const x_end = Math.abs((this.drag_end[0] / scaleX - xTop) / (xBottom - xTop)) * Math.abs(xMax - xMin) + xMin;

                const x_min = x_start < x_end ? x_start : x_end;
                const x_max = x_start > x_end ? x_start : x_end;
                const y_min = y_start < y_end ? y_start : y_end;
                const y_max = y_start > y_end ? y_start : y_end;

                select_data_subset(x_min, y_min, x_max, y_max);
            }
            else {
                select_all_data();
            }
        },

        onmousedown (e) {
            const area = this.chart.chartArea;

            if (e.offsetX + 100 < area.left || e.offsetX - 100 > area.right || e.offsetY + 100 < area.top || e.offsetY - 100 > area.bottom) {
                return;
            }
            const rect = this.$refs.overlay.getBoundingClientRect();
            const scaleX = this.$refs.overlay.width / rect.width;
            const scaleY = this.$refs.overlay.height / rect.height;
            const drag_start = [e.offsetX * scaleX, e.offsetY * scaleY];

            this.drag_start = drag_start;
            this.is_drag_active = true;
        },
        onmousemove (e) {
            if (this.is_drag_active) {
                const area = this.chart.chartArea;

                if (e.offsetX + 100 < area.left || e.offsetX - 100 > area.right || e.offsetY + 100 < area.top || e.offsetY - 100 > area.bottom) {
                    return;
                }
                const rect = this.$refs.overlay.getBoundingClientRect();
                const scaleX = this.$refs.overlay.width / rect.width;
                const scaleY = this.$refs.overlay.height / rect.height;
                const drag_end = [e.offsetX * scaleX, e.offsetY * scaleY];

                this.drag_end = drag_end;

                const ctx = this.$refs.overlay.getContext("2d");

                ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
                ctx.clearRect(0, 0, this.$refs.overlay.width, this.$refs.overlay.height);
                const x = this.drag_start[0];
                const y = this.drag_start[1];
                const width = this.drag_end[0] - this.drag_start[0];
                const height = this.drag_end[1] - this.drag_start[1];

                ctx.fillRect(x, y, width, height);
            }
        },
        onmouseup (e) {
            if (this.is_drag_active) {
                const ctx = this.$refs.overlay.getContext("2d");

                ctx.clearRect(0, 0, this.$refs.overlay.width, this.$refs.overlay.height);

                this.set_data();

                this.is_drag_active = false;
                this.drag_start = null;
                this.drag_end = null;
            }
        },
        func (e) {
            this.onmouseup(e);
            document.removeEventListener("mouseup", this.func);
        },
        onmouseleave (e) {
            if (this.is_drag_active) {
                document.addEventListener("mouseup", this.func);
            }
        },
        onmouseenter (e) {
            if (this.is_drag_active) {
                document.removeEventListener("mouseup", this.func);
            }
        },

        activateExtent (activate) {
            this.removeInteraction(dragBox);
            if (listener !== null) {
                dragBox.un("boxend", listener);
            }
            this.toggle = activate;
            if (activate === true) {
                listener = () => {
                    const extent = dragBox.getGeometry().getExtent();

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

                    this.removeLayerFromMap(layer);
                    layer.setSource(source);
                    layer.setZIndex(1000);
                    this.addLayer(layer);
                };
                dragBox.on("boxend", listener);
                this.addInteraction(dragBox);
            }
        }
    }
};
</script>

<template lang="html">
    <div>
        <div v-if="stepSeven.status === 'unfinished'">
            <div
                id="Infotext6_1"
                class="callout"
            >
                Bitte starten Sie die Berechnung um die Ergebnisse zu erhalten.
            </div>
        </div>

        <div v-if="stepSeven.status === 'running'">
            <div class="d-flex justify-content-center">
                <div
                    class="spinner-border"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div
                id="Infotext6_2"
                class="callout"
            >
                Das Ergebnis steht in Kürze bereit...
            </div>
        </div>
        <div v-show="stepSeven.status === 'finished'">
            <BootstrapCheckbox
                id="Checkbox6_1"
                v-model="stepSeven.show_result"
                text="Ergebniss anzeigen"
            />
            <BootstrapCheckbox
                id="Checkbox6_2"
                v-model="stepSeven.show_population"
                text="Bevölkerungsdaten anzeigen"
            />
            <br>
            <BootstrapToggleButton
                :value="toggle"
                @input="e => activateExtent(!toggle)"
            >
                Select Area
            </BootstrapToggleButton>
            <br>
            <div
                class="chart"
                @mousedown="onmousedown"
                @mousemove="onmousemove"
                @mouseup="onmouseup"
                @mouseleave="onmouseleave"
                @focusout="onmouseleave"
                @mouseenter="onmouseenter"
                @focusin="onmouseenter"
            >
                <canvas
                    ref="canvas"
                    class="canvas"
                />
                <canvas
                    ref="overlay"
                    class="canvas"
                />
            </div>
        </div>
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

.chart {
    position: relative;
    height: 200px;
}
.chart .canvas {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
}
</style>
