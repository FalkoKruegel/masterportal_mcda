<script>
import {mapActions, mapMutations} from "vuex";
import {loadToolParams} from "../../utils/tool_params/load_params";

export default {
    name: "StartAnalysis",
    emits: [
        // emitted events for buttons
        // there should be another one for loading older analysis
        "startAnalysis"
    ],
    data () {
        return {
            loadFailed: false
        };
    },
    methods: {
        ...mapActions("Tools/SpatialAccess", [
            "initialize"
        ]),
        ...mapMutations("Tools/SpatialAccess", [
            "setActive"
        ]),

        openAnalysis () {
            this.$refs.layerDialog.click();
        },
        openFile () {
            const files = this.$refs.layerDialog.files;
            const reader = new FileReader();

            reader.onloadend = () => {
                const obj = JSON.parse(reader.result);
                const suc = loadToolParams(obj);

                if (suc) {
                    this.$emit("startAnalysis");
                }
                else {
                    this.loadFailed = true;
                }
            };
            reader.readAsText(files[0]);
        }
    }
};
</script>

<template lang="html">
    <div>
        <p>Dieses Instrument hilft Ihnen dabei, Schritt für Schritt den räumlichen Zugang für eine bestimmte Facharztgruppe zu analysieren. Der räumliche Zugang zu Facharztpraxen hängt von Faktoren wie der Verteilung der Praxen, dem ärztlichen Teilnahmeumfang, der Größe des Einzugsgebietes und weiteren Erreichbarkeitsparametern ab.</p>
        <p>Sie können in diesem Analysetool die relevanten Faktoren selbst festlegen. Als Ergebnis erhalten Sie eine individuelle Darstellung des räumlichen Zugangs in einem 100 m x 100 m Raster, um die Versorgungssituation im Analysegebiet zu beurteilen.</p>
        <!--container to adjust position of following buttons-->
        <div
            class="container"
        >
            <div
                class="row mb-2"
            >
                <div
                    class="col text-start"
                >
                    <!--in the future this button should emit an event which triggers a dialog to load older analysis-->
                    <button
                        id="button1_2"
                        type="button"
                        class="btn btn-outline-primary btn-lg"
                        @click="openAnalysis"
                    >
                        Analyseeinstellung laden
                    </button>
                    <input
                        ref="layerDialog"
                        type="file"
                        style="display:none"
                        accept=".json"
                        @change="openFile"
                    >
                </div>
                <div
                    class="col text-end"
                >
                    <button
                        id="button1_1"
                        type="button"
                        class="btn btn-outline-primary btn-lg"
                        @click="$emit('startAnalysis')"
                    >
                        Neue Analyse durchführen
                    </button>
                </div>
            </div>
        </div>
        <!--following div is an placeholder to remind that dialog for loading an older analysis has to be implemented in the future-->
        <div
            v-if="loadFailed"
            class="callout-warning"
        >
            Die verwendete Parameter-Datei ist fehlerhaft. Bitte versuchen Sie es erneut.
        </div>
    </div>
</template>

<style lang="scss" scoped>
.callout-warning {
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: rgba(var(--bs-danger-rgb), .075);
    border-left: 0.25rem solid var(--bd-callout-border, rgba(var(--bs-danger-rgb), .5));
}
</style>
