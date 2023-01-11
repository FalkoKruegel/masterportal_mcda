<script>
import {mapGetters, mapActions, mapMutations} from "vuex";

export default {
    name: "StartAnalysis",
    data () {
        return {
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
        "loadAnalysis",
        "startAnalysis"
    ],
};
</script>

<template lang="html">
    <div>
        <p>Das Tool „Entscheidungsunterstützung“ betrachtet die Versorgungssituation in der Daseinsvorsorge entsprechend ihrer selbstgewählten Kriterien.</p> 
        <p>Im Ergebnis erhalten Sie verschiedene Layer zur Versorgungslage. Diese können beispielsweise für die Einschätzung der Versorgungssituation, Bedarfsanalyse sowie Identifizierung struktureller räumlicher Unterschiede genutzt werden.</p>
        <div
            class="container"
        >
            <div
                class="row mb-2"
            >
                <div
                    class="col text-start"
                >
                    <button
                        id="button1_2"
                        type="button"
                        class="btn btn-outline-primary btn-lg"
                        @click="$emit('loadAnalysis')"
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
    </div>
</template>
