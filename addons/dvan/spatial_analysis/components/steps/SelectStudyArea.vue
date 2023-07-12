<script>
import {DragBox} from "ol/interaction";
import {Vector as VectorLayer} from "ol/layer";
import {Vector as VectorSource} from "ol/source";
import Feature from "ol/Feature.js";
import Polygon from "ol/geom/Polygon.js";
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";


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

export default {
    name: "SelectStudyArea",
    components: {
        BootstrapCheckbox
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/SpatialAnalysis", Object.keys(getters))
    },
    watch: {
        "stepSix.area_selection": function (newVal) {
            if (newVal === "ownArea") {
                dragBox.on("boxend", () => {
                    const extent = dragBox.getGeometry().getExtent();

                    this.stepSix.area_extent = null;
                    this.stepSix.area_extent = extent;
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
                this.stepSix.area_extent = null;
                this.removeInteraction(dragBox);
                this.removeLayerFromMap(layer);
            }
        }
    },
    methods: {
        ...mapActions("Tools/SpatialAnalysis", [
            "initialize"
        ]),
        ...mapMutations("Tools/SpatialAnalysis", [
            "setActive"
        ]),
        ...mapActions("Maps", ["addInteraction", "removeInteraction", "addLayer"]),
        ...mapMutations("Maps", ["removeLayerFromMap"]),

        activateOwnArea (newVal) {
            if (newVal) {
                this.stepSix.area_selection = "ownArea";
            }
            else {
                this.stepSix.area_selection = null;
            }
        }
    }
};
</script>

<template lang="html">
    <div>
        <p>Bitte wählen Sie ein Analysegebiet aus:</p>

        <BootstrapCheckbox
            id="Checkbox_2_1"
            :value="stepSix.area_selection === 'wholeLowerSaxony'"
            text="Niedersachsenweite Analyse"
            :disabled="stepSix.area_selection === 'ownArea'"
            @input="e => e === true ? stepSix.area_selection = 'wholeLowerSaxony' : stepSix.area_selection = null"
        />
        <BootstrapCheckbox
            id="Checkbox_2_2"
            :value="stepSix.area_selection === 'ownArea'"
            text="Eigene Gebietsselektion"
            :disabled="stepSix.area_selection === 'wholeLowerSaxony'"
            @input="e => activateOwnArea(e)"
        />
        <div
            v-if="stepSix.area_selection === 'ownArea'"
            id="Callout2_1"
            class="callout"
        >
            Halten Sie die Strg-Taste gedrückt und ziehen Sie für die Gebietsselektion ein Kartenfenster auf!
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

.callout-warning {
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: rgba(var(--bs-danger-rgb), .075);
    border-left: 0.25rem solid var(--bd-callout-border, rgba(var(--bs-danger-rgb), .5));
}
</style>
