<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectedPhysicians",
    components: {
        BootstrapCheckbox
    },
    data () {
        return {
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
        <p>
            Bitte wählen Sie eine Versorgungsebene aus:
        </p>
        <BootstrapCheckbox
            id="Checkbox_2_1"
            v-model="stepTwo.supplyLevel.generalPhysician"
            text="Hausärztliche Versorgung - Versorgungsebene 1"
            :disabled="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.specializedSpecialist"
        />
        <BootstrapCheckbox
            id="Checkbox_2_2"
            v-model="stepTwo.supplyLevel.generalSpecialist"
            text="Allgemeine fachärztliche Versorgung  - Versorgungsebene 2"
            :disabled="stepTwo.supplyLevel.generalPhysician || stepTwo.supplyLevel.specializedSpecialist"
        />
        <BootstrapCheckbox
            id="Checkbox_2_3"
            v-model="stepTwo.supplyLevel.specializedSpecialist"
            text="Spezialisierte fachärztliche Versorgung - Versorgungsebene 3"
            :disabled="stepTwo.supplyLevel.generalPhysician || stepTwo.supplyLevel.generalSpecialist"
        />
        <BootstrapCheckbox
            id="Checkbox_2_4"
            v-model="stepTwo.supplyLevel.lowerSaxony"
            text="Niedersachsen - Versorgungsebene / KV-Bezirk"
        />
        <!--following div will only be rendered if checkbox for own area (above) is checked-->
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
