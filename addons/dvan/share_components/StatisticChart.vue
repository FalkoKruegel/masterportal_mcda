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
        chartType: {
            type: String,
            default: "bar"
        },
        chartOptions: {
            type: Object,
            default: () => {}
        },
        chartData: {
            type: Object,
            default: () => {}
        }
    },
    emits: ["focus", "selection"],
    data () {
        return {
            chart: null,
            focused: false,
            is_mouse_down: false,
            is_drag_active: false,
            drag_start: null,
            drag_end: null,

            toggle: false
        };
    },
    computed: {},
    watch: {
        chart_type: function () {
            if (this.chartType === null || this.chartType === undefined) {
                this.chart.type = "bar";
            }
            else {
                this.chart.type = this.chart_type;
            }
            this.chart.update();
        },
        chart_data: function () {
            if (this.chartData === null || this.chartData === undefined) {
                this.chart.data = {};
            }
            else {
                this.chart.data = this.chartData;
            }
            this.chart.update();
        },
        chart_options: function () {
            if (this.chartOptions === null || this.chartOptions === undefined) {
                this.chart.options = {};
            }
            else {
                this.chart.options = this.chartOptions;
            }
            this.chart.update();
        }
    },
    mounted () {
        this.chart = new Chart(this.$refs.canvas, {
            type: this.chartType === null || this.chartType === undefined ? "bar" : this.chartType,
            options: this.chartOptions === null || this.chartOptions === undefined ? {} : this.chartOptions,
            data: this.chartData === null || this.chartData === undefined ? {} : this.chartData
        });
    },
    methods: {
        documentClick (e) {
            this.focused = false;
            this.$emit("focus", this.focused);
            document.removeEventListener("click", this.documentClick);
        },
        clickInside (e) {
            if (this.focused) {
                e.stopPropagation();
                return;
            }
            document.addEventListener("click", this.documentClick);
            this.focused = true;
            this.$emit("focus", this.focused);
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
            this.is_mouse_active = true;
        },
        onmousemove (e) {
            if (this.is_mouse_active || this.is_drag_active) {
                const area = this.chart.chartArea;

                if (e.offsetX + 100 < area.left || e.offsetX - 100 > area.right || e.offsetY + 100 < area.top || e.offsetY - 100 > area.bottom) {
                    return;
                }
                const rect = this.$refs.overlay.getBoundingClientRect();
                const scaleX = this.$refs.overlay.width / rect.width;
                const scaleY = this.$refs.overlay.height / rect.height;
                const drag_end = [e.offsetX * scaleX, e.offsetY * scaleY];

                this.drag_end = drag_end;
                if (Math.sqrt(Math.pow(drag_end[0] - this.drag_start[0], 2) + Math.pow(drag_end[1] - this.drag_start[1], 2)) > 3) {
                    this.is_drag_active = true;
                }

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

                const rect = this.$refs.overlay.getBoundingClientRect();
                const scaleX = this.$refs.overlay.width / rect.width;
                const scaleY = this.$refs.overlay.height / rect.height;

                const yTop = this.chart.chartArea.top;
                const yBottom = this.chart.chartArea.bottom;
                let y_axis = null;

                for (const key in this.chart.scales) {
                    if (key.startsWith("y-")) {
                        y_axis = this.chart.scales[key];
                        break;
                    }
                }
                const yMin = y_axis.min;
                const yMax = y_axis.max;
                const y_start = ((Math.abs((this.drag_start[1] / scaleY - yTop) / (yBottom - yTop)) - 1) * -1) * Math.abs(yMax - yMin) + yMin;
                const y_end = ((Math.abs((this.drag_end[1] / scaleY - yTop) / (yBottom - yTop)) - 1) * -1) * Math.abs(yMax - yMin) + yMin;

                const xTop = this.chart.chartArea.left;
                const xBottom = this.chart.chartArea.right;
                let x_axis = null;

                for (const key in this.chart.scales) {
                    if (key.startsWith("x-")) {
                        x_axis = this.chart.scales[key];
                        break;
                    }
                }
                const xMin = x_axis.min;
                const xMax = x_axis.max;
                const x_start = Math.abs((this.drag_start[0] / scaleX - xTop) / (xBottom - xTop)) * Math.abs(xMax - xMin) + xMin;
                const x_end = Math.abs((this.drag_end[0] / scaleX - xTop) / (xBottom - xTop)) * Math.abs(xMax - xMin) + xMin;

                const x_min = x_start < x_end ? x_start : x_end;
                const x_max = x_start > x_end ? x_start : x_end;
                const y_min = y_start < y_end ? y_start : y_end;
                const y_max = y_start > y_end ? y_start : y_end;

                this.$emit("selection", {
                    x: [x_min, x_max],
                    y: [y_min, y_max]
                });

                this.is_drag_active = false;
                this.drag_start = null;
                this.drag_end = null;
            }
            this.is_mouse_active = false;
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
        }
    }
};
</script>

<template lang="html">
    <div
        :class="{card: true, focused: focused}"
        @click="clickInside"
        @keypress="clickInside"
        @mousedown="clickInside"
        @mouseup="clickInside"
    >
        <div class="card-body">
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
