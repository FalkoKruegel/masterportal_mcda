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
            :disabled="stepTwo.ownArea"
        />
        <!--there must be a bounding box-tool which is connected with the following checkbox-->
        <BootstrapCheckbox
            id="Checkbox_2_2"
            v-model="stepTwo.ownArea"
            text="Eigene Gebietsselektion"
            :disabled="stepTwo.wholeLowerSaxony"
        />
        <!--following div will only be rendered if checkbox for own area (above) is checked-->
        <div
            v-if="stepTwo.ownArea"
            id="Callout2_1"
            class="callout"
        >
            Ziehen Sie für die Gebietsselektion ein Kartenfenster auf!
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
