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
                v-for="(item, name, index) in stepThree.availabilityOptions"
                :id="`Checkbox_3_${index}`"
                :key="index"
                :text="item['text']"
                :value="stepThree.physicianAvailability === name"
                :disabled="stepThree.physicianAvailability !== name && stepThree.physicianAvailability !== ''"
                @input="e => e ? stepThree.physicianAvailability = name : stepThree.physicianAvailability = ''"
            />
            <p />
        </div>
        <div>
            <div
                v-if="stepThree.physicianAvailability === 'facility'"
                id="Callout3_1"
                class="callout"
            >
                <p>
                    <b>
                        Analyseergebnis stärker durch die Sicht Erreichbarkeit dominiert
                    </b>
                </p>
                <p>
                    Sie haben sich für eine rein standortabhängie Betrachtung entschieden. Das Analyseergebnis wird grundsätzlich stärker durch die Dimension "Erreichbarkeit" der Versorgung als durch die Dimension "Verfügbarkeit" der Versorgung dominiert, da die Anzahl der Ärzte oder der Teilnahmeumfang an der vertragsärztlichen Versorgung am Standort nicht berücksichtig werden.
                </p>
            </div>
            <div
                v-if="stepThree.physicianAvailability === 'physicianNumber'"
                id="Callout3_2"
                class="callout"
            >
                <p>
                    <b>
                        Analyseergebnis stärker durch die Sicht Versorgungssicherheit dominiert.
                    </b>
                </p>
                <p>
                    Mit der Auswahl wird der Beschäftigungsumfang der Ärzte am Standort berücksichtigt. Standorte mit hohen Arztzahlen tragen somit stärker zur Versorgung bei als Standorte mit niedrigen Arztzahlen. Berücksichtigen Sie bei der Interpretation der Analyseergebnisse, das dadurch die Dimension "Verfügbarkeit" stärker berücksichtigt wird. Das Ergebnis lässt sich dadurch im Sinne einer regionalen Versorgungssicherheit interpretieren.
                </p>
            </div>
            <div
                v-if="stepThree.physicianAvailability === 'employmentVolume'"
                id="Callout3_3"
                class="callout"
            >
                <p>
                    <b>
                        Ausgewogene und realitätsnahe Ergebnisdarstellung der fachätztlichen Verfügbarkeit und Erreichbarkeit.
                    </b>
                </p>
                <p>
                    Das Analyseergebnis wird ausgewogen durch die Dimensionen "Erreichbarkeit" und "Verfügbarkeit" von fachärztlicher Versorgungsleistung dominiert.
                </p>
            </div>
            <div
                v-if="stepThree.physicianAvailability === 'demandLimit'"
                id="Callout3_4"
                class="callout callout-warn"
            >
                <p>
                    <b>
                        KV-Spezifikation notwendig: Auslastungsabhängige Ergebnisdarstellung anhand der Fallzahlen der Betriebsstätte.
                    </b>
                </p>
                <p>
                    Dieses Instrument ist noch nicht verfügbar. Es sind kontextabhängige Spezifikationen, Daten und Absprachen mit Kassenärztlichen Vereinigungen notwendig.
                </p>
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
