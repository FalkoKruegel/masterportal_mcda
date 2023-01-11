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
    }
};
</script>

<template lang="html">
    <div>
        <p>Das Tool „Entscheidungsunterstützung“ betrachtet die Versorgungssituation in der Daseinsvorsorge entsprechend ihrer selbstgewählten Kriterien.</p> 
        <p>Im Ergebnis erhalten Sie verschiedene Layer zur Versorgungslage. Diese können beispielsweise für die Einschätzung der Versorgungssituation, Bedarfsanalyse sowie Identifizierung struktureller räumlicher Unterschiede genutzt werden.</p>
    </div>
</template>
