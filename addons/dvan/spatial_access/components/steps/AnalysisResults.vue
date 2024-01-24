<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import {LAYERS} from "../../utils/analysis/show_layers";
import {addLayer, removeLayer} from "../../../share_utils/map.js";

export default {
    name: "AnalysisResults",
    components: {
        BootstrapCheckbox
    },
    data () {
        return {};
    },
    computed: {
        ...mapGetters("Tools/SpatialAccess", Object.keys(getters))
    },
    watch: {
        "stepSix.show_locations": function (newVal) {
            if (newVal) {
                if (LAYERS.locations === null) {
                    return;
                }
                addLayer(LAYERS.locations, () => {
                    this.stepSix.show_locations = false;
                });
            }
            else {
                removeLayer("spatial_access_locations");
            }
        },
        "stepSix.show_scope": function (newVal) {
            if (newVal) {
                if (LAYERS.scope === null) {
                    return;
                }
                addLayer(LAYERS.scope, () => {
                    this.stepSix.show_scope = false;
                });
            }
            else {
                removeLayer("spatial_access_scope");
            }
        },
        "stepSix.show_population": function (newVal) {
            if (newVal) {
                if (LAYERS.population === null) {
                    return;
                }
                addLayer(LAYERS.population, () => {
                    this.stepSix.show_population = false;
                });
            }
            else {
                removeLayer("spatial_access_population");
            }
        },
        "stepSix.show_accessibility": function (newVal) {
            if (newVal) {
                if (LAYERS.accessibility === null) {
                    return;
                }
                addLayer(LAYERS.accessibility, () => {
                    this.stepSix.show_accessibility = false;
                });
            }
            else {
                removeLayer("spatial_access_accessibility");
            }
        }
    },
    methods: {
        ...mapActions("Tools/SpatialAccess", ["initialize"]),
        ...mapMutations("Tools/SpatialAccess", ["setActive"]),

        /**
         * Function from populationRequest addon (original Masterportal)
         * translates the given key, checks if the key exists and throws a console warning if not
         * @param {String} key the key to translate
         * @param {Object} [options=null] for interpolation, formating and plurals
         * @returns {String} the translation or the key itself on error
         */
        translate (key, options = null) {
            // creating completed key. This improves readability in template
            const completeKey = "additional:modules.tools.spatialAccess." + key;

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
        <div v-if="stepSix.status === 'unfinished'">
            <div
                id="Infotext6_1"
                class="callout"
            >
                {{ translate('stepSix.callout.callout1') }}
            </div>
        </div>

        <div v-if="stepSix.status === 'running'">
            <div class="d-flex justify-content-center">
                <div
                    class="spinner-border"
                    role="status"
                >
                    <span class="visually-hidden">{{ translate('stepSix.text.text1') }}</span>
                </div>
            </div>
            <div
                id="Infotext6_2"
                class="callout"
            >
                {{ translate('stepSix.text.text2') }}
            </div>
        </div>
        <div v-if="stepSix.status === 'finished'">
            <BootstrapCheckbox
                id="Checkbox6_1"
                v-model="stepSix.show_locations"
                :text="translate('stepSix.layers.layer1')"
            />
            <BootstrapCheckbox
                id="Checkbox6_2"
                v-model="stepSix.show_scope"
                :text="translate('stepSix.layers.layer2')"
            />
            <BootstrapCheckbox
                id="Checkbox6_3"
                v-model="stepSix.show_population"
                :text="translate('stepSix.layers.layer3')"
            />
            <BootstrapCheckbox
                id="Checkbox6_4"
                v-model="stepSix.show_accessibility"
                :text="translate('stepSix.layers.layer4')"
            />
            <p>
                {{ translate('stepSix.text.text3') }}
                <br><br>
                {{ translate('stepSix.text.text4') }}
            </p>
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
