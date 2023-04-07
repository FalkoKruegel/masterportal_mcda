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
            <p />
        </div>
        <div>
            <p>Bitte wählen Sie eine Facharztgruppe aus:</p>
            <div>
                <select
                    id="Dropdown2_1"
                    v-model="stepTwo.physicianGroup"
                    class="form-select"
                    aria-label="DropdownPhysicians"
                    :disabled="!(stepTwo.supplyLevel.generalPhysician || stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.specializedSpecialist || stepTwo.supplyLevel.lowerSaxony)"
                >
                    <option
                        selected
                        value="Bitte wählen..."
                    >
                        Bitte wählen...
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalPhysician || stepTwo.supplyLevel.lowerSaxony"
                        value="Hausärzte"
                    >
                        Hausärzte
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Augenärzte"
                    >
                        Augenärzte
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Chirurgen und Orthopäden"
                    >
                        Chirurgen und Orthopäden
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Frauenärzte"
                    >
                        Frauenärzte
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Hautärzte"
                    >
                        Hautärzte
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="HNO-Ärzte"
                    >
                        HNO-Ärzte
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Kinderärzte"
                    >
                        Kinderärzte
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Nervenärzte"
                    >
                        Nervenärzte
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Psychotherapeuten"
                    >
                        Psychotherapeuten
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.generalSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Urologen"
                    >
                        Urologen
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.specializedSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="fachärztlich tätige Internisten"
                    >
                        fachärztlich tätige Internisten
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.specializedSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Kinder- und Jugendpsychiater"
                    >
                        Kinder- und Jugendpsychiater
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.specializedSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Radiologen"
                    >
                        Radiologen
                    </option>
                    <option
                        v-if="stepTwo.supplyLevel.specializedSpecialist || stepTwo.supplyLevel.lowerSaxony"
                        value="Anästhesisten"
                    >
                        Anästhesisten
                    </option>
                </select>
                <p />
            </div>
            <div>
                <p>Bitte wählen Sie einen Planungsbereich aus:</p>
                <select
                    id="Dropdown2_2"
                    v-model="stepTwo.planningArea"
                    class="form-select"
                    aria-label="DropdownArea"
                >
                    <option selected>
                        Bitte wählen...
                    </option>
                    <option
                        value="Platzhalter"
                    >
                        Platzhalter
                    </option>
                    <option
                        value="Niedersachsen"
                    >
                        Niedersachsen
                    </option>
                    <option
                        value="KV-Bezirk"
                    >
                        KV-Bezirk
                    </option>
                </select>
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
</style>
