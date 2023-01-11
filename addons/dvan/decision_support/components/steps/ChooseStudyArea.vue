<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import getters from "../../store/getters";

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
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters)),
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
        <BootstrapCheckbox
            id="Checkbox_2_1"
            v-model="stepTwo.wholeLowerSaxony"
            text="Niedersachsenweite Analyse"
        />
        <BootstrapCheckbox
            id="Checkbox_2_2"
            v-model="stepTwo.ownArea"
            text="Eigene Gebietsselektion"
        />
    </div>
</template>
