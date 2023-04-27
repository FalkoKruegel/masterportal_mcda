<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectDistanceDecay",
    components: {
        BootstrapCheckbox,
        BootstrapAccordion,
        BootstrapAccordionItem
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
        <BootstrapAccordion
            id="Accordion5"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                id="Accordion5_1"
                parent-id="Accordion5"
                text="Transportmittel"
                :status="stepFive.transport === 'pkw' ? 'valid' : stepFive.transport === 'public_transport' ? 'invalid' : 'default'"
            >
                <p>Bitte wählen Sie, auf welches Transportmittel sich die Analyse beziehen soll:</p>
                <div class="container text-center">
                    <div
                        id="Buttonbar5_1"
                        class="btn-group"
                        role="group"
                        aria-label="Transportmittel"
                    >
                        <input
                            id="PKW"
                            v-model="stepFive.transport"
                            type="radio"
                            class="btn-check"
                            name="options"
                            value="pkw"
                        >
                        <label
                            class="btn btn-outline-primary"
                            for="PKW"
                        >
                            PKW
                        </label>
                        <input
                            id="ÖPNV"
                            v-model="stepFive.transport"
                            type="radio"
                            class="btn-check"
                            name="options"
                            value="public_transport"
                        >
                        <label
                            class="btn btn-outline-primary"
                            for="ÖPNV"
                        >
                            ÖPNV
                        </label>
                    </div>
                </div>
                <div
                    v-if="stepFive.transport === 'public_transport'"
                    id="Callout5_1"
                    class="callout-warning"
                >
                    <b>ÖPNV-Modus ist aktuell nicht verfügbar.</b>
                    Stellen Sie bitte auf PKW um.
                </div>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion5_2"
                parent-id="Accordion5"
                text="Entfernungsabgewichtung"
                :status="['linear', 'patient_behavior', 'minimum_standards'].includes(stepFive.distanceDecay) ? 'valid' : 'default'"
            >
                <BootstrapCheckbox
                    id="Checkbox5_2_1"
                    :value="stepFive.distanceDecay === 'linear'"
                    text="Linear"
                    @input="e => e ? stepFive.distanceDecay = 'linear' : stepFive.distanceDecay = ''"
                />
                <BootstrapCheckbox
                    id="Checkbox5_2_2"
                    :value="stepFive.distanceDecay === 'patient_behavior'"
                    text="KV-Abrechnungsdaten / Patientenverhalten"
                    @input="e => e ? stepFive.distanceDecay = 'patient_behavior' : stepFive.distanceDecay = ''"
                />
                <BootstrapCheckbox
                    id="Checkbox5_2_3"
                    :value="stepFive.distanceDecay === 'minimum_standards'"
                    text="Mindesterreichbarkeitsstandards"
                    @input="e => e ? stepFive.distanceDecay = 'minimum_standards' : stepFive.distanceDecay = ''"
                />
                <div
                    v-if="stepFive.distanceDecay === 'linear'"
                    id="Callout5_2_1"
                    class="callout"
                >
                    <b>Lineare Entfernungsabgewichtung</b>
                    <br>
                    <div class="img-container">
                        <img
                            src="./images/Abgewichtung_linear.png"
                            alt=""
                        >
                    </div>
                </div>
                <div
                    v-if="stepFive.distanceDecay === 'patient_behavior'"
                    id="Callout5_2_2"
                    class="callout"
                >
                    <b>Abgewichtung auf Grundlage der KV-Abrechnungsdaten.</b>
                    <br>
                    Gravitationsbasierte Analyse (Text wird weiter ausgebaut).
                </div>
                <div
                    v-if="stepFive.distanceDecay === 'minimum_standards'"
                    id="Callout5_2_3"
                    class="callout"
                >
                    <b>Potenzielle Wegzeit unter Berücksichtigung von Mindesterreichbarkeitsstandards.</b>
                    <br>
                    (Text wird weiter ausgebaut). Die Mindeststandards leiten sich aus verschiedenen Planungsdokumenten ab.
                </div>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
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

.callout-warning {
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: rgba(var(--bs-danger-rgb), .075);
    border-left: 0.25rem solid var(--bd-callout-border, rgba(var(--bs-danger-rgb), .5));
}

.img-container {
    max-width: 400px;
    max-height: 100%;
}

img {
    max-width: 100%;
    max-height: 100%;
}
</style>
