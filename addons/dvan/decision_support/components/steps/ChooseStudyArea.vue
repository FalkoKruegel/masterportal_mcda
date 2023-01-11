<script>
import {mapActions, mapMutations} from "vuex";

export default {
    name: "ChooseStudyArea",
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
        <p>
            Bitte wählen Sie ein Analysegebiet aus einer der Listen.
        </p>
    </div>
</template>
