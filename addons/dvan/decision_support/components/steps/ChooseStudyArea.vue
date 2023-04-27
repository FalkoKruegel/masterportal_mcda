<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import {DragBox} from "ol/interaction";
import {Vector as VectorLayer} from "ol/layer";
import {Vector as VectorSource} from "ol/source";
import Feature from "ol/Feature.js";
import Polygon from "ol/geom/Polygon.js";
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
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
    name: "ChooseStudyArea",
    components: {
        BootstrapCheckbox
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters))
    },
    watch: {
        "stepTwo.ownAreaExtent": function (newVal) {
            if (newVal === null) {
                this.removeLayerFromMap(layer);
            }
            else {
                this.removeLayerFromMap(layer);
                const feature = new Feature({
                    geometry: new Polygon([[[newVal[0], newVal[1]], [newVal[0], newVal[3]], [newVal[2], newVal[3]], [newVal[2], newVal[1]]]]),
                    name: "ownAreaExtent"
                });
                const source = new VectorSource({
                    features: [feature],
                    useSpatialIndex: false
                });

                layer.setSource(source);
                layer.setZIndex(1000);
                this.addLayer(layer);
            }
        }
    },
    methods: {
        ...mapActions("Tools/DecisionSupport", [
            "initialize"
        ]),
        ...mapActions("Maps", [
            "addInteraction", "removeInteraction", "addLayer"
        ]),
        ...mapMutations("Tools/DecisionSupport", [
            "setActive"
        ]),
        ...mapMutations("Maps", [
            "removeLayerFromMap"
        ]),

        activateOwnArea (newVal) {
            this.stepTwo.ownArea = newVal;
            if (newVal === true) {
                dragBox.on("boxend", () => {
                    const extent = dragBox.getGeometry().getExtent();

                    this.stepTwo.ownAreaExtent = null;
                    this.stepTwo.ownAreaExtent = extent;
                });
                this.addInteraction(dragBox);
            }
            else {
                this.stepTwo.ownAreaExtent = null;
                this.removeInteraction(dragBox);
            }
        }
    }
};
</script>

<template lang="html">
    <div>
        <p>
            Bitte wählen Sie ein Analysegebiet aus einer der Listen.
        </p>
        <BootstrapCheckbox
            id="Checkbox_2_1"
            v-model="stepTwo.wholeLowerSaxony"
            text="Niedersachsenweite Analyse"
            :disabled="stepTwo.ownArea"
        />
        <!--there must be a bounding box-tool which is connected with the following checkbox-->
        <BootstrapCheckbox
            id="Checkbox_2_2"
            :value="stepTwo.ownArea"
            text="Eigene Gebietsselektion"
            :disabled="stepTwo.wholeLowerSaxony"
            @input="e => activateOwnArea(e)"
        />
        <!--following div will only be rendered if checkbox for own area (above) is checked-->
        <div
            v-if="stepTwo.ownArea"
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
</style>
