<script>
import Chart from "chart.js";

export default {
    name: "StatisticChart",
    components: {},
    props: {
        id: {
            type: String,
            default: ""
        },
        ranges: {
            type: Array,
            default () {
                return [];
            }
        },
        counts: {
            type: Array,
            default () {
                return [];
            }
        },
        yScale: {
            type: Number,
            default: 10
        },
        mean: {
            type: Number,
            default: 0
        },
        std: {
            type: Number,
            default: 0
        },
        median: {
            type: Number,
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        }
    },
    emits: ["focus"],
    data () {
        return {
            chart: null,
            focused: false
        };
    },
    computed: {},
    watch: {
        ranges: function () {
            this.chart.data.labels = this.ranges;
            this.chart.data.datasets[0].data = this.counts;
            this.chart.update();
        },
        counts: function () {
            this.chart.data.labels = this.ranges;
            this.chart.data.datasets[0].data = this.counts;
            this.chart.update();
        },
        yScale: function () {
            this.chart.options.scales.yAxes[0].ticks.max = this.yScale;
            this.chart.update();
        }
    },
    mounted () {
        this.chart = new Chart(this.$refs.canvas, {
            type: "bar",
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
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: this.yScale
                            },
                            scaleLabel: {
                                display: false,
                                labelString: "Anzahl"
                            }
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: "Minuten"
                            }
                        }
                    ]
                }
            },
            data: {
                labels: this.ranges,
                datasets: [
                    {
                        label: "counts",
                        backgroundColor: "#003063",
                        data: this.counts
                    }
                ]
            }
        });
    },
    methods: {
        documentClick (e) {
            if (e["id_1929489_" + this.id]) {
                return;
            }
            this.focused = false;
            this.$emit("focus", this.focused);
            document.removeEventListener("click", this.documentClick, true);
        },

        clickInside (e) {
            e["id_1929489_" + this.id] = true;
            if (this.focused) {
                return;
            }
            document.addEventListener("click", this.documentClick, true);
            this.focused = true;
            this.$emit("focus", this.focused);
        }
    }
};
</script>

<template lang="html">
    <div
        :class="{card: true, focused: focused}"
        @click="clickInside"
        @keypress="clickInside"
    >
        <div class="card-body">
            <div class="row">
                <div>Mittelwert: {{ mean }} &plusmn; {{ std }} min</div>
                <div>Median: {{ median }} min</div>
                <div>Minimum: {{ min }} min</div>
                <div>Maximum: {{ max }} min</div>
            </div>
            <br>
            <div class="chart">
                <canvas ref="canvas" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
  --bs-card-border-width: 0px;
  border-radius: 5px;
  background: transparent;
}

.focused {
  --bs-card-box-shadow: 0px 0px 3px 3px var(--bs-primary);
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 1rem;
  overflow-y: hidden;
}
.row div {
  width: fit-content;
  text-align: center;
}

.chart {
  height: 200px;
}
</style>
