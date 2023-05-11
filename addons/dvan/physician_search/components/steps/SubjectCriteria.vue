<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";

export default {
    name: "SubjectCriteria",
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
        ...mapGetters("Tools/PhysicianSearch", Object.keys(getters))
    },
    watch: {
        "stepTwo.medicalService.generalPhysician": function () {
            if (this.stepTwo.medicalService.generalPhysician === false) {
                this.stepTwo.subject = "Bitte wählen...";
            }
        },
        "stepTwo.medicalService.specialist": function () {
            if (this.stepTwo.medicalService.specialist === false) {
                this.stepTwo.subject = "Bitte wählen...";
            }
        },
        "stepTwo.medicalService.psychotherapist": function () {
            if (this.stepTwo.medicalService.psychotherapist === false) {
                this.stepTwo.subject = "Bitte wählen...";
            }
        }
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
                id="checkbox2_1"
                v-model="stepTwo.medicalService.generalPhysician"
                text="Hausarzt"
                :disabled="stepTwo.medicalService.specialist || stepTwo.medicalService.psychotherapist"
            />
            <BootstrapCheckbox
                id="checkbox2_2"
                v-model="stepTwo.medicalService.specialist"
                text="Facharzt"
                :disabled="stepTwo.medicalService.generalPhysician || stepTwo.medicalService.psychotherapist"
            />
            <BootstrapCheckbox
                id="checkbox2_3"
                v-model="stepTwo.medicalService.psychotherapist"
                text="Psychotherapeut"
                :disabled="stepTwo.medicalService.generalPhysician || stepTwo.medicalService.specialist"
            />
        </div>
        <p />
        <div
            id="additionalRefinement"
        >
            <p>optionale Eingrenzung:</p>
            <BootstrapAccordion
                id="Accordion2_1"
            >
                <BootstrapAccordionItem
                    id="Accordion2_2_1"
                    parent-id="Accordion2_1"
                    text="Spezialisierung und besondere Leistungen"
                >
                    <div
                        class="select-element-margin"
                    >
                        <label
                            for="Dropdown2_2_1_1"
                        >
                            Fachgebiet / Schwerpunkt:
                        </label>
                        <select
                            id="Dropdown2_2_1_1"
                            v-model="stepTwo.subject"
                            class="form-select"
                            aria-label="DropdownPhysicianSubject"
                            :disabled="!(stepTwo.medicalService.generalPhysician || stepTwo.medicalService.specialist || stepTwo.medicalService.psychotherapist)"
                        >
                            <option
                                selected
                                value="Bitte wählen..."
                            >
                                Bitte wählen...
                            </option>
                            <option
                                v-if="stepTwo.medicalService.generalPhysician"
                                value="Hausärzte"
                            >
                                Hausärzte
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="Augenärzte"
                            >
                                Augenärzte
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="Chirurgen und Orthopäden"
                            >
                                Chirurgen und Orthopäden
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="Frauenärzte"
                            >
                                Frauenärzte
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="Hautärzte"
                            >
                                Hautärzte
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="HNO-Ärzte"
                            >
                                HNO-Ärzte
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="Kinderärzte"
                            >
                                Kinderärzte
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="Nervenärzte"
                            >
                                Nervenärzte
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist || stepTwo.medicalService.psychotherapist"
                                value="Psychotherapeuten"
                            >
                                Psychotherapeuten
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="Urologen"
                            >
                                Urologen
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="fachärztlich tätige Internisten"
                            >
                                fachärztlich tätige Internisten
                            </option>
                            <option
                                v-if="stepTwo.medicalService.psychotherapist"
                                value="Kinder- und Jugendpsychiater"
                            >
                                Kinder- und Jugendpsychiater
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="Radiologen"
                            >
                                Radiologen
                            </option>
                            <option
                                v-if="stepTwo.medicalService.specialist"
                                value="Anästhesisten"
                            >
                                Anästhesisten
                            </option>
                        </select>
                    </div>
                    <div
                        class="select-element-margin"
                    >
                        <label
                            for="Dropdown2_2_1_1"
                        >
                            Zusatzbezeichnung:
                        </label>
                        <select
                            id="Dropdown2_2_1_1"
                            v-model="stepTwo.additionalDesignation"
                            class="form-select"
                            aria-label="DropdownPhysicianAdditionalDesignation"
                        >
                            <option
                                selected
                                value="Bitte wählen..."
                            >
                                Bitte wählen...
                            </option>
                            <option
                                value="Eingrenzung aktuell nicht möglich"
                            >
                                Eingrenzung aktuell nicht möglich
                            </option>
                        </select>
                    </div>
                    <div
                        class="select-element-margin"
                    >
                        <label
                            for="Dropdown2_2_1_1"
                        >
                            Genehmigungspflichtige Leistungen:
                        </label>
                        <select
                            id="Dropdown2_2_1_1"
                            v-model="stepTwo.servicesRequiringAuthorization"
                            class="form-select"
                            aria-label="DropdownPhysicianServicesRequiringAuthorization"
                        >
                            <option
                                selected
                                value="Bitte wählen..."
                            >
                                Bitte wählen...
                            </option>
                            <option
                                value="Eingrenzung aktuell nicht möglich"
                            >
                                Eingrenzung aktuell nicht möglich
                            </option>
                        </select>
                    </div>
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion2_2_2"
                    parent-id="Accordion2_1"
                    text="Ermächtigte Ärzte"
                >
                    <p>Ermächtigte Ärzte und Psychotherapeuten anzeigen?</p>
                    <BootstrapCheckbox
                        id="checkbox2_2_2_1"
                        v-model="stepTwo.empoweredPhys.no"
                        text="nein"
                        :disabled="stepTwo.empoweredPhys.yes || stepTwo.empoweredPhys.onlyPhys"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_2_2_2"
                        v-model="stepTwo.empoweredPhys.yes"
                        text="ja"
                        :disabled="stepTwo.empoweredPhys.no || stepTwo.empoweredPhys.onlyPhys"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_2_2_1"
                        v-model="stepTwo.empoweredPhys.onlyPhys"
                        text="ausschließlich ermächtigte Ärzte"
                        :disabled="stepTwo.empoweredPhys.yes || stepTwo.empoweredPhys.no"
                    />
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion2_2_3"
                    parent-id="Accordion2_1"
                    text="Sprechzeiten"
                />
                <BootstrapAccordionItem
                    id="Accordion2_2_4"
                    parent-id="Accordion2_1"
                    text="Barrierefreiheit und Fremdsprachen"
                />
            </BootstrapAccordion>
        </div>
    </div>
</template>

<style lang="css">
    .select-element-margin {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .form-select {
        margin-top: 5px;
    }
</style>
