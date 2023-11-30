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
        <p>
            {{ translate('stepTwo.text.text1') }}
        </p>
        <BootstrapCheckbox
            id="Checkbox2-1"
            v-model="stepTwo.wholeLowerSaxony"
            :text="translate('stepTwo.checkbox.checkbox2_1')"
            :disabled="stepTwo.ownArea"
        />
        <BootstrapCheckbox
            id="Checkbox2-2"
            :value="stepTwo.ownArea"
            :text="translate('stepTwo.checkbox.checkbox2_2')"
            :disabled="stepTwo.wholeLowerSaxony"
            @input="e => activateOwnArea(e)"
        />
        <!--following div will only be rendered if checkbox for own area (above) is checked-->
        <div
            v-if="stepTwo.ownArea"
            id="Callout2-1"
            class="callout"
        >
            {{ translate('stepTwo.callout.callout2_1') }}
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
