<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import {getWMSLayer, LAYERS} from "../../utils/analysis/show_layers";
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
                    LAYERS.locations = getWMSLayer(
                        "spatial_access_locations",
                        "Spatial Access (Praxisstandorte)",
                        "http://172.26.63.162:8085/geoserver/DVAN_View_Data/ows?",
                        "outpatient_physicians_location_based"
                    );
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
                    LAYERS.scope = getWMSLayer(
                        "spatial_access_scope",
                        "Spatial Access (Praxisumfang)",
                        "http://172.26.63.162:8085/geoserver/DVAN_View_Data/ows?",
                        "outpatient_physicians_location_specialist_count"
                    );
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
                    LAYERS.population = getWMSLayer(
                        "spatial_access_population",
                        "Spatial Access (Bevölkerung)",
                        "http://172.26.63.162:8085/geoserver/DVAN_View_Data/ows?",
                        "dvan_view_bevoelkerung_2019",
                        "Bevoelkerung_Raster_EW_GESAMT"
                    );
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
        ...mapMutations("Tools/SpatialAccess", ["setActive"])
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
                Bitte starten Sie die Berechnung um die Ergebnisse zu erhalten.
            </div>
        </div>

        <div v-if="stepSix.status === 'running'">
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
        <div v-if="stepSix.status === 'finished'">
            <BootstrapCheckbox
                id="Checkbox6_1"
                v-model="stepSix.show_locations"
                text="Praxisstandorte anzeigen"
            />
            <BootstrapCheckbox
                id="Checkbox6_2"
                v-model="stepSix.show_scope"
                text="Versorgungsumfang am Standort anzeigen"
            />
            <BootstrapCheckbox
                id="Checkbox6_3"
                v-model="stepSix.show_population"
                text="Kleinräumliche Bevölkerungsdaten"
            />
            <BootstrapCheckbox
                id="Checkbox6_4"
                v-model="stepSix.show_accessibility"
                text="Anzeige der Zugangsberechnung"
            />
            <p>
                Die Analyseergebnisse bieten Ihnen Interpretationsmöglichkeiten zur kleinräumlichen zugangsbasierten Versorgungssituation.
                <br><br>
                Bitte beachten Sie, dass die Darstellung keinen Hinweis auf formelle bedarfsplanerische Maßzahlen wie Unter- und Überversorgung gibt. Es ist ein ergänzendes Planungstool um Planern zu ermöglichen, unabhängig der Planungsgrenzen kleinräumliche Versorgung oder kleinräumlichen Zugang im Rahmen des Sicherstellungsauftrages zu bewerten.
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
