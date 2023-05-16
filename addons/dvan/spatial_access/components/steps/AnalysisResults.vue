<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "AnalysisResults",
    components: {
        BootstrapCheckbox
    },
    data () {
        return {
            temp: null
        };
    },
    computed: {
        ...mapGetters("Tools/SpatialAccess", Object.keys(getters))
    },
    methods: {
        ...mapActions("Tools/SpatialAccess", [
            "initialize"
        ]),
        ...mapMutations("Tools/SpatialAccess", [
            "setActive"
        ])
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
                v-model="temp"
                text="Versorgungsstandorte anzeigen"
            />
            <BootstrapCheckbox
                id="Checkbox6_2"
                v-model="temp"
                text="Kleinräumliche Bevölkerungsdaten"
            />
            <BootstrapCheckbox
                id="Checkbox6_3"
                v-model="temp"
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
