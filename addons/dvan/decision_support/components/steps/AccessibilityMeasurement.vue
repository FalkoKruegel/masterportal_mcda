<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import TimeInput from "../../../share_components/TimeInput.vue";

export default {
    name: "AccessibilityMeasurement",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem,
        TimeInput
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters)),

        // compute status of Accordion5_3
        localSupplyStatus () {
            for (const item in this.stepThree.local_supply) {
                if (this.stepThree.local_supply[item] === true) {
                    return "valid";
                }
            }
            return "deactivated";
        },
        // compute status of Accordion5_3_1
        supermarketStatus () {
            if (this.stepThree.local_supply.supermarket === true) {
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_3_2
        discounterStatus () {
            if (this.stepThree.local_supply.discounter === true) {
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_3_3
        othersStatus () {
            if (this.stepThree.local_supply.others === true) {
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_4
        healthStatus () {
            for (const item in this.stepThree.health) {
                if (this.stepThree.health[item] === true) {
                    return "valid";
                }
            }
            return "deactivated";
        },
        // compute status of Accordion5_4_1
        pharmaciesStatus () {
            if (this.stepThree.health.pharmacies === true) {
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_4_2
        clinicsStatus () {
            if (this.stepThree.health.clinics === true) {
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_4_3
        physiciansStatus () {
            for (const item in this.stepThree.health) {
                if ((item !== "pharmacies") && (item !== "clinics") && (this.stepThree.health[item] === true)) {
                    return "valid";
                }
            }
            return "deactivated";
        },
        // compute status of Accordion5_5
        educationStatus () {
            for (const item in this.stepThree.education) {
                if (this.stepThree.education[item] === true) {
                    return "valid";
                }
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_1
        nurseriesStatus () {
            if (this.stepThree.education.nurseries === true) {
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_2
        primarySchoolsStatus () {
            if (this.stepThree.education.primary_schools === true) {
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_3
        secondary1Status () {
            if (this.stepThree.education.secondary_1 === true) {
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_2
        secondary2Status () {
            if (this.stepThree.education.secondary_2 === true) {
                return "valid";
            }
            return "deactivated";
        },
        // compute name of physician in Accordion5_4_3
        physicianName () {
            for (const item in this.stepThree.health) {
                if (item !== "pharmacies" & item !== "clinics" & this.stepThree.health[item] === true) {
                    if (item === "general_physicians") {
                        return "Schwellwert Hausärzte";
                    }
                    if (item === "paediatricians") {
                        return "Schwellwert Kinder- und Jugendärzte";
                    }
                    if (item === "ophthalmologists") {
                        return "Schwellwert Augenärzte";
                    }
                    if (item === "surgeons") {
                        return "Schwellwert Chirurgen und Orthopäden";
                    }
                    if (item === "gynaecologists") {
                        return "Schwellwert Frauenärzte";
                    }
                    if (item === "dermatologists") {
                        return "Schwellwert Hautärzte";
                    }
                    if (item === "otolaryngologist") {
                        return "Schwellwert HNO-Ärzte";
                    }
                    if (item === "neurologist") {
                        return "Schwellwert Nervenärzte";
                    }
                    if (item === "psychotherapists") {
                        return "Schwellwert Psychotherapeuten";
                    }
                    if (item === "urologists") {
                        return "Schwellwert Urologen";
                    }
                }
            }
            return "Schwellwert Arzttyp";
        }
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
        <p>Über Mindeststandards in der Erreichbarkeit (Reiseweg / Reisezeit) zu Einrichtungen und Dienstleistungen der Daseinsvorsorge wird die flächendeckende Versorgung gewährleistet.</p>
        <p>Werden entsprechende Grenzwerte erreicht, kann von einer Unterversorgung ausgegangen werden. Ebenso steigt die Versorgungsqualität je geringer die Reisewege vom Wohnstandort zur Infrastruktur ist. Zu den ausgewählten Infrastrukturen sind bereits empfohlene Werte hinterlegt. Sie gelten für die Erreichbarkeit über PKW. Für bedarfsgrechte Simulationen können die voreingestellten Reisezeiten angepasst werden.</p>
        <BootstrapAccordion
            id="Accordion5"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                id="Accordion5_1"
                text="Erläuterung zur Anpassung der Reisezeiten"
                status="valid"
            >
                <p>Bitte hinterlegen Sie, welches Transportmittel zur Ermittlung der Reisezeit für Ihre Analyse gelten soll. Folgende Transportmittel sind für die Berechnung verfübar:</p>
                <ul>
                    <li>PKW</li>
                    <li>ÖPNV</li>
                    <li>Fuß</li>
                </ul>
                <p>Hinterlegen Sie zudem für jede der ausgewählten Infrastrukturen, welche Versorgungssituation eintreten soll, wenn eine gewisse Reisezeit überschritten wird, um diese Infrastruktur vom Nachfrageort zu erreichen. Die Kategorien sind wie folgt eingeteilt:</p>
                <ul>
                    <li>Sehr gute Versorgungslage</li>
                    <li>Gute Versorgungslage</li>
                    <li>Ausreichende Versorgungslage</li>
                    <li>Mangelhafte Versorgungslage</li>
                </ul>
                <p>Wenn die Reisezeit vom Nachfrageort zur Infrastruktur den Schwellwert der mangelhaften Versorgungslage übersteigt, erfolgt keine Versorgung des Nachfrageortes durch die Infrastruktur.</p>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion5_2"
                parent-id="Accordion5"
                text="Transportmittel"
                status="valid"
            >
                <div class="container text-center">
                    <div
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
                        <input
                            id="Fuß"
                            v-model="stepFive.transport"
                            type="radio"
                            class="btn-check"
                            name="options"
                            value="foot"
                        >
                        <label
                            class="btn btn-outline-primary"
                            for="Fuß"
                        >
                            Fuß
                        </label>
                    </div>
                </div>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion5_3"
                parent-id="Accordion5"
                text="Schwellwerte Nahversorgung"
                :status="localSupplyStatus"
            >
                <BootstrapAccordion
                    id="Accordion5_3"
                    body-padding-x="5px"
                    body-padding-y="5px"
                >
                    <BootstrapAccordionItem
                        id="Accordion5_3_1"
                        text="Schwellwerte Supermärkte"
                        :status="supermarketStatus"
                    >
                        <div
                            class="container"
                        >
                            Minuten fuer sehr gute Versorgung Supermaerkte{{ stepFive.local_supply.supermarket.very_good }}
                            <TimeInput
                                id="input5_3_1_1"
                                v-model="stepFive.local_supply.supermarket.very_good"
                                :max-time="40"
                                :min-time="0"
                            />
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_1_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_1_2"
                                            v-model="stepFive.local_supply.supermarket.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_1_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_1_3"
                                            v-model="stepFive.local_supply.supermarket.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_1_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_1_4"
                                            v-model="stepFive.local_supply.supermarket.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                    <BootstrapAccordionItem
                        id="Accordion5_3_2"
                        text="Schwellwerte Discounter"
                        :status="discounterStatus"
                    >
                        <div
                            class="container"
                        >
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Sehr gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_2_1"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_2_1"
                                            v-model="stepFive.local_supply.discounter.very_good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="veryGood"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_2_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_2_2"
                                            v-model="stepFive.local_supply.discounter.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_2_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_2_3"
                                            v-model="stepFive.local_supply.discounter.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_2_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_2_4"
                                            v-model="stepFive.local_supply.discounter.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                    <BootstrapAccordionItem
                        id="Accordion5_3_3"
                        text="Schwellwerte sonstige Lebensmittelgeschäfte"
                        :status="othersStatus"
                    >
                        <div
                            class="container"
                        >
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Sehr gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_3_1"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_3_1"
                                            v-model="stepFive.local_supply.others.very_good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="veryGood"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_3_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_3_2"
                                            v-model="stepFive.local_supply.others.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_3_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_3_3"
                                            v-model="stepFive.local_supply.others.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_3_3_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_3_3_4"
                                            v-model="stepFive.local_supply.others.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion5_4"
                parent-id="Accordion5"
                text="Schwellwerte Gesundheit"
                :status="healthStatus"
            >
                <BootstrapAccordion
                    id="Accordion5_4"
                    body-padding-x="5px"
                    body-padding-y="5px"
                >
                    <BootstrapAccordionItem
                        id="Accordion5_4_1"
                        text="Schwellwerte Apotheken"
                        :status="pharmaciesStatus"
                    >
                        <div
                            class="container"
                        >
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Sehr gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_1_1"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_1_1"
                                            v-model="stepFive.health.pharmacies.very_good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="veryGood"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_1_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_1_2"
                                            v-model="stepFive.health.pharmacies.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_1_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_1_3"
                                            v-model="stepFive.health.pharmacies.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_1_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_1_4"
                                            v-model="stepFive.health.pharmacies.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                    <BootstrapAccordionItem
                        id="Accordion5_4_2"
                        text="Schwellwerte Hochschulkliniken und Plankrankenhäuser"
                        :status="clinicsStatus"
                    >
                        <div
                            class="container"
                        >
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Sehr gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_2_1"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_2_1"
                                            v-model="stepFive.health.clinics.very_good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="veryGood"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_2_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_2_2"
                                            v-model="stepFive.health.clinics.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_2_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_2_3"
                                            v-model="stepFive.health.clinics.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_2_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_2_4"
                                            v-model="stepFive.health.clinics.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                    <BootstrapAccordionItem
                        id="Accordion5_4_3"
                        :text="physicianName"
                        :status="physiciansStatus"
                    >
                        <div
                            class="container"
                        >
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Sehr gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_3_1"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_3_1"
                                            v-model="stepFive.health.physicians.very_good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="veryGood"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_3_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_3_2"
                                            v-model="stepFive.health.physicians.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_3_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_3_3"
                                            v-model="stepFive.health.physicians.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_4_3_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_4_3_4"
                                            v-model="stepFive.health.physicians.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion5_5"
                parent-id="Accordion5"
                text="Schwellwerte Bildung"
                :status="educationStatus"
            >
                <BootstrapAccordion
                    id="Accordion5_5"
                    body-padding-x="5px"
                    body-padding-y="5px"
                >
                    <BootstrapAccordionItem
                        id="Accordion5_5_1"
                        text="Schwellwerte Kindertagesstätten"
                        :status="nurseriesStatus"
                    >
                        <div
                            class="container"
                        >
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Sehr gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_1_1"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_1_1"
                                            v-model="stepFive.education.nurseries.very_good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="veryGood"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_1_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_1_2"
                                            v-model="stepFive.education.nurseries.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_1_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_1_3"
                                            v-model="stepFive.education.nurseries.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_1_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_1_4"
                                            v-model="stepFive.education.nurseries.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                    <BootstrapAccordionItem
                        id="Accordion5_5_2"
                        text="Schwellwerte Primarschulen"
                        :status="primarySchoolsStatus"
                    >
                        <div
                            class="container"
                        >
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Sehr gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_2_1"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_2_1"
                                            v-model="stepFive.education.primary_schools.very_good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="veryGood"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_2_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_2_2"
                                            v-model="stepFive.education.primary_schools.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_2_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_2_3"
                                            v-model="stepFive.education.primary_schools.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_2_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_2_4"
                                            v-model="stepFive.education.primary_schools.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                    <BootstrapAccordionItem
                        id="Accordion5_5_3"
                        text="Schwellwerte Sekundarschulen Bereich I und II, ohne (Fach)Hochschulreife"
                        :status="secondary1Status"
                    >
                        <div
                            class="container"
                        >
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Sehr gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_3_1"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_3_1"
                                            v-model="stepFive.education.secondary_1.very_good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="veryGood"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_3_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_3_2"
                                            v-model="stepFive.education.secondary_1.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_3_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_3_3"
                                            v-model="stepFive.education.secondary_1.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_3_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_3_4"
                                            v-model="stepFive.education.secondary_1.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                    <BootstrapAccordionItem
                        id="Accordion5_5_4"
                        text="Schwellwerte Sekundarschulen Bereich I und II, mit (Fach)Hochschulreife"
                        :status="secondary2Status"
                    >
                        <div
                            class="container"
                        >
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Sehr gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_4_1"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_4_1"
                                            v-model="stepFive.education.secondary_2.very_good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="veryGood"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Gute Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_4_2"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_4_2"
                                            v-model="stepFive.education.secondary_2.good"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="good"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Ausreichende Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_4_3"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_4_3"
                                            v-model="stepFive.education.secondary_2.sufficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="sufficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                            <div
                                class="row align-items-center"
                            >
                                <div
                                    class="col-7 text-start"
                                >
                                    Mangelhafte Versorgungslage bis
                                </div>
                                <div
                                    class="col-3 text-end"
                                >
                                    <label
                                        for="input5_5_4_4"
                                        class="col-form-label"
                                    >
                                        <input
                                            id="input5_5_4_4"
                                            v-model="stepFive.education.secondary_2.deficient"
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="40"
                                            name="deficient"
                                            class="form-control"
                                        >
                                    </label>
                                </div>
                                <div
                                    class="col text-start"
                                >
                                    min
                                </div>
                            </div>
                        </div>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
    </div>
</template>
