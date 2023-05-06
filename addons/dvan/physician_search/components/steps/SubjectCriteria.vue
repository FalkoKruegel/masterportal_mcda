<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";

export default {
    name: "SubjectCriteria",
    components: {
        BootstrapCheckbox
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/PhysicianSearch", Object.keys(getters))
    },
    methods: {
        ...mapActions("Tools/PhysicianSearch", [
            "initialize"
        ]),
        ...mapMutations("Tools/PhysicianSearch", [
            "setActive"
        ])
    }
};
</script>

<template lang="html">
    <div>
        <div
            id="medicalService"
        >
            <p>Legen Sie fest nach welcher ärztlichen Leistung Sie suchen</p>
            <BootstrapCheckbox
                id="generalPhysCheckbox"
                v-model="stepTwo.medicalService.generalPhysician"
                text="Hausarzt"
            />
            <BootstrapCheckbox
                id="specialistCheckbox"
                v-model="stepTwo.medicalService.specialist"
                text="Facharzt"
            />
            <BootstrapCheckbox
                id="psychotherapistCheckbox"
                v-model="stepTwo.medicalService.psychotherapist"
                text="Psychotherapeut"
            />
        </div>
    </div>
</template>
