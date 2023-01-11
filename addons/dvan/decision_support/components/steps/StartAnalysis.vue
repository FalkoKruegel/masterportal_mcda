<script>
import {mapGetters, mapActions, mapMutations} from "vuex";

export default {
    name: "StartAnalysis",
    data () {
        return {
            loadAnalysis: false
        };
    },
    methods: {
        ...mapActions("Tools/DecisionSupport", [
            "initialize"
        ]),
        ...mapMutations("Tools/DecisionSupport", [
            "setActive"
        ])
    },
    emits: [
        // emitted events for buttons
        // there should be another one for loading older analysis
        "startAnalysis"
    ],
};
</script>

<template lang="html">
    <div>
        <p>Das Tool „Entscheidungsunterstützung“ betrachtet die Versorgungssituation in der Daseinsvorsorge entsprechend ihrer selbstgewählten Kriterien.</p> 
        <p>Im Ergebnis erhalten Sie verschiedene Layer zur Versorgungslage. Diese können beispielsweise für die Einschätzung der Versorgungssituation, Bedarfsanalyse sowie Identifizierung struktureller räumlicher Unterschiede genutzt werden.</p>
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
                        @click="loadAnalysis = !loadAnalysis"
                    >
                        Analyseeinstellung laden
                    </button>
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
            v-if="loadAnalysis"
            class="callout-warning"
        >
            Das Interface zum Laden von vorherigen Analysen ist noch nicht implementiert.
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
