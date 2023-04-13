<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "PhysicianCapacity",
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
        <div>
            <p>
                Bitte wählen Sie, wie Sie die ärztliche Verfügbarkeit in der Analyse berücksichtigen wollen.
            </p>
            <BootstrapCheckbox
                id="Checkbox_3_1"
                v-model="stepThree.physicianAvailability.facility"
                text="Betriebsstättenbetrachtung"
                :disabled="stepThree.physicianAvailability.physicianNumber || stepThree.physicianAvailability.employmentVolume || stepThree.physicianAvailability.demandLimit"
            />
            <BootstrapCheckbox
                id="Checkbox_3_2"
                v-model="stepThree.physicianAvailability.physicianNumber"
                text="Facharztzahl an der Betriebsstätte"
                :disabled="stepThree.physicianAvailability.facility || stepThree.physicianAvailability.employmentVolume || stepThree.physicianAvailability.demandLimit"
            />
            <BootstrapCheckbox
                id="Checkbox_3_3"
                v-model="stepThree.physicianAvailability.employmentVolume"
                text="Beschäftigungsumfang der Fachärzte an der Betriebsstätten"
                :disabled="stepThree.physicianAvailability.facility || stepThree.physicianAvailability.physicianNumber || stepThree.physicianAvailability.demandLimit"
            />
            <BootstrapCheckbox
                id="Checkbox_3_4"
                v-model="stepThree.physicianAvailability.demandLimit"
                text="Fallzahlabhängige Bedarfsgrenzen an den Betriebsstätten"
                :disabled="stepThree.physicianAvailability.facility || stepThree.physicianAvailability.physicianNumber || stepThree.physicianAvailability.employmentVolume"
            />
            <p />
        </div>
        <div>
            <div
                id="Callout2_1"
                class="callout"
            >
                Neben dem von Ihnen ausgewählten Planugsbereich werden für eine verbesserte Interpretation von Mitversorgungseffekten die benachbarten Planungsbereiche in die Analyse und Darstellung einbezogen.
            </div>
            <div
                id="Callout2_2"
                class="callout callout-warn"
            >
                Sie haben sich für eine landesweite Analyse entschieden. Durch die hohen Anforderungen an die Berechnung werden alle weiteren Parameter voreingestellt und sind nicht änderbar. Sie können die Einstellungen in den folgenden Schritten einsehen und anschließend in Schritt 5 auf  "Analyse starten" klicken.
            </div>
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
.callout-warn {
    --bd-callout-bg: rgba(255,0,0,0.3);
    --bd-callout-border: rgb(100,0,0,0.3);
}
</style>
