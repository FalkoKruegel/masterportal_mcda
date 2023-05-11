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
        ...mapGetters("Tools/PhysicianSearch", Object.keys(getters)),

        // setting status for Accordion2_1_1
        statusSpecialServices () {
            // only if select items are assigned the standard value this element will be invalid
            if (this.stepTwo.specialServices.subject === "Bitte wählen..." || this.stepTwo.specialServices.additionalDesignation === "Bitte wählen..." || this.stepTwo.specialServices.servicesRequiringAuthorization === "Bitte wählen...") {
                return "invalid";
            }
            return "valid";
        },

        // setting status for Accordion2_1_2
        statusEmpoweredPhys () {
            // checking if one of the checkboxes is set active
            for (const item in this.stepTwo.empoweredPhys) {
                if (this.stepTwo.empoweredPhys[item] === true) {
                    return "valid";
                }
            }
            return "invalid";
        },

        // setting status for Accordion2_1_3
        statusOpeningHours () {
            // checking if one of the checkboxes is set active
            for (const item in this.stepTwo.openingHours) {
                if (this.stepTwo.openingHours[item] === true) {
                    return "valid";
                }
            }
            return "invalid";
        },

        // setting status for Accordion2_1_4
        statusAccessibilityAndLanguages () {
            // only if select items are assigned the standard value this element will be invalid
            if (this.stepTwo.accessibilityAndLanguages.accessibility === "Bitte wählen..." || this.stepTwo.accessibilityAndLanguages.languages === "Bitte wählen...") {
                return "invalid";
            }
            return "valid";
        }
    },
    watch: {
        // following watchers make sure, that subject value is resetted if status of checkboxes changes
        "stepTwo.medicalService.generalPhysician": function () {
            if (this.stepTwo.medicalService.generalPhysician === false) {
                this.stepTwo.specialServices.subject = "Bitte wählen...";
            }
        },
        "stepTwo.medicalService.specialist": function () {
            if (this.stepTwo.medicalService.specialist === false) {
                this.stepTwo.specialServices.subject = "Bitte wählen...";
            }
        },
        "stepTwo.medicalService.psychotherapist": function () {
            if (this.stepTwo.medicalService.psychotherapist === false) {
                this.stepTwo.specialServices.subject = "Bitte wählen...";
            }
        },
        // watcher deselects checkboxes for weekdays if "noRefinement" is chosen
        "stepTwo.openingHours.noRefinement": function () {
            if (this.stepTwo.openingHours.noRefinement === true) {
                this.stepTwo.openingHours.monday = false;
                this.stepTwo.openingHours.tuesday = false;
                this.stepTwo.openingHours.wednesday = false;
                this.stepTwo.openingHours.thursday = false;
                this.stepTwo.openingHours.friday = false;
                this.stepTwo.openingHours.saturday = false;
                this.stepTwo.openingHours.sunday = false;
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
                    id="Accordion2_1_1"
                    parent-id="Accordion2_1"
                    text="Spezialisierung und besondere Leistungen"
                    :status="statusSpecialServices"
                >
                    <div
                        class="select-element-margin"
                    >
                        <label
                            for="Dropdown2_1_1_1"
                        >
                            Fachgebiet / Schwerpunkt:
                        </label>
                        <select
                            id="Dropdown2_1_1_1"
                            v-model="stepTwo.specialServices.subject"
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
                            for="Dropdown2_1_1_2"
                        >
                            Zusatzbezeichnung:
                        </label>
                        <select
                            id="Dropdown2_2_1_2"
                            v-model="stepTwo.specialServices.additionalDesignation"
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
                            for="Dropdown2_1_1_3"
                        >
                            Genehmigungspflichtige Leistungen:
                        </label>
                        <select
                            id="Dropdown2_1_1_3"
                            v-model="stepTwo.specialServices.servicesRequiringAuthorization"
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
                    id="Accordion2_1_2"
                    parent-id="Accordion2_1"
                    text="Ermächtigung"
                    :status="statusEmpoweredPhys"
                >
                    <p>Ermächtigte Ärzte und Psychotherapeuten anzeigen?</p>
                    <BootstrapCheckbox
                        id="checkbox2_1_2_1"
                        v-model="stepTwo.empoweredPhys.no"
                        text="nein"
                        :disabled="stepTwo.empoweredPhys.yes || stepTwo.empoweredPhys.onlyPhys"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_1_2_2"
                        v-model="stepTwo.empoweredPhys.yes"
                        text="ja"
                        :disabled="stepTwo.empoweredPhys.no || stepTwo.empoweredPhys.onlyPhys"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_1_2_1"
                        v-model="stepTwo.empoweredPhys.onlyPhys"
                        text="ausschließlich ermächtigte Ärzte"
                        :disabled="stepTwo.empoweredPhys.yes || stepTwo.empoweredPhys.no"
                    />
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion2_1_3"
                    parent-id="Accordion2_1"
                    text="Sprechzeiten"
                    :status="statusOpeningHours"
                >
                    <p>Sprechzeiten eingrenzen?</p>
                    <BootstrapCheckbox
                        id="checkbox2_1_3_1"
                        v-model="stepTwo.openingHours.noRefinement"
                        text="keine Einschränkung"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_1_3_2"
                        v-model="stepTwo.openingHours.monday"
                        text="Montag"
                        :disabled="stepTwo.openingHours.noRefinement"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_1_3_3"
                        v-model="stepTwo.openingHours.tuesday"
                        text="Dienstag"
                        :disabled="stepTwo.openingHours.noRefinement"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_1_3_4"
                        v-model="stepTwo.openingHours.wednesday"
                        text="Mittwoch"
                        :disabled="stepTwo.openingHours.noRefinement"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_1_3_5"
                        v-model="stepTwo.openingHours.thursday"
                        text="Donnerstag"
                        :disabled="stepTwo.openingHours.noRefinement"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_1_3_6"
                        v-model="stepTwo.openingHours.friday"
                        text="Freitag"
                        :disabled="stepTwo.openingHours.noRefinement"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_1_3_7"
                        v-model="stepTwo.openingHours.saturday"
                        text="Samstag"
                        :disabled="stepTwo.openingHours.noRefinement"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_1_3_8"
                        v-model="stepTwo.openingHours.sunday"
                        text="Sonntag"
                        :disabled="stepTwo.openingHours.noRefinement"
                    />
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion2_1_4"
                    parent-id="Accordion2_1"
                    text="Barrierefreiheit und Fremdsprachen"
                    :status="statusAccessibilityAndLanguages"
                >
                    <div
                        class="select-element-margin"
                    >
                        <label
                            for="Dropdown2_1_4_1"
                        >
                            Barrierefreiheit:
                        </label>
                        <select
                            id="Dropdown2_1_4_1"
                            v-model="stepTwo.accessibilityAndLanguages.accessibility"
                            class="form-select"
                            aria-label="DropdownAccessibility"
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
                            for="Dropdown2_1_4_2"
                        >
                            Fremdsprache:
                        </label>
                        <select
                            id="Dropdown2_1_4_2"
                            v-model="stepTwo.accessibilityAndLanguages.languages"
                            class="form-select"
                            aria-label="DropdownLanguages"
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
            </BootstrapAccordion>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .select-element-margin {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .form-select {
        margin-top: 5px;
    }
</style>
