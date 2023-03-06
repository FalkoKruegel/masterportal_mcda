<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import TimeInput from "../TimeInput.vue";

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
            if (this.supermarketStatus === "deactivated" && this.discounterStatus === "deactivated" && this.othersStatus === "deactivated") {
                return "deactivated";
            }
            if (this.supermarketStatus === "invalid" || this.discounterStatus === "invalid" || this.othersStatus === "invalid") {
                return "invalid";
            }
            return "valid";
        },
        // compute status of Accordion5_3_1
        supermarketStatus () {
            if (this.stepThree.local_supply.supermarket === true) {
                for (const timeItem in this.stepFive.local_supply.supermarket) {
                    if (this.stepFive.local_supply.supermarket[timeItem] <= 0) {
                        return "invalid";
                    }
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_3_2
        discounterStatus () {
            if (this.stepThree.local_supply.discounter === true) {
                for (const timeItem in this.stepFive.local_supply.discounter) {
                    if (this.stepFive.local_supply.discounter[timeItem] <= 0) {
                        return "invalid";
                    }
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_3_3
        othersStatus () {
            if (this.stepThree.local_supply.others === true) {
                for (const timeItem in this.stepFive.local_supply.others) {
                    if (this.stepFive.local_supply.others[timeItem] <= 0) {
                        return "invalid";
                    }
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_4
        healthStatus () {
            if (this.pharmaciesStatus === "deactivated" && this.clinicsStatus === "deactivated" && this.physiciansStatus === "deactivated") {
                return "deactivated";
            }
            if (this.pharmaciesStatus === "invalid" || this.clinicsStatus === "invalid" || this.physiciansStatus === "invalid") {
                return "invalid";
            }
            return "valid";
        },
        // compute status of Accordion5_4_1
        pharmaciesStatus () {
            if (this.stepThree.health.pharmacies === true) {
                for (const timeItem in this.stepFive.health.pharmacies) {
                    if (this.stepFive.health.pharmacies[timeItem] <= 0) {
                        return "invalid";
                    }
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_4_2
        clinicsStatus () {
            if (this.stepThree.health.clinics === true) {
                for (const timeItem in this.stepFive.health.clinics) {
                    if (this.stepFive.health.clinics[timeItem] <= 0) {
                        return "invalid";
                    }
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_4_3
        physiciansStatus () {
            for (const item in this.stepThree.health) {
                if ((item !== "pharmacies") && (item !== "clinics") && (this.stepThree.health[item] === true)) {
                    for (const timeItem in this.stepFive.health.physicians) {
                        if (this.stepFive.health.physicians[timeItem] <= 0) {
                            return "invalid";
                        }
                    }
                    return "valid";
                }
            }
            return "deactivated";
        },
        // compute status of Accordion5_5
        educationStatus () {
            if (this.nurseriesStatus === "deactivated" && this.primarySchoolsStatus === "deactivated" && this.secondary1Status === "deactivated" && this.secondary2Status === "deactivated") {
                return "deactivated";
            }
            if (this.nurseriesStatus === "invalid" || this.primarySchoolsStatus === "invalid" || this.secondary1Status === "invalid" || this.secondary2Status === "invalid") {
                return "invalid";
            }
            return "valid";
        },
        // compute status of Accordion5_5_1
        nurseriesStatus () {
            if (this.stepThree.education.nurseries === true) {
                for (const timeItem in this.stepFive.education.nurseries) {
                    if (this.stepFive.education.nurseries[timeItem] <= 0) {
                        return "invalid";
                    }
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_2
        primarySchoolsStatus () {
            if (this.stepThree.education.primary_schools === true) {
                for (const timeItem in this.stepFive.education.primary_schools) {
                    if (this.stepFive.education.primary_schools[timeItem] <= 0) {
                        return "invalid";
                    }
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_3
        secondary1Status () {
            if (this.stepThree.education.secondary_1 === true) {
                for (const timeItem in this.stepFive.education.secondary_1) {
                    if (this.stepFive.education.secondary_1[timeItem] <= 0) {
                        return "invalid";
                    }
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_2
        secondary2Status () {
            if (this.stepThree.education.secondary_2 === true) {
                for (const timeItem in this.stepFive.education.secondary_2) {
                    if (this.stepFive.education.secondary_2[timeItem] <= 0) {
                        return "invalid";
                    }
                }
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
    watch: {
        // this watcher checks if the used physician infrastructure are general physicians.
        // If the used physicians are general physicians, the watcher will change the state of step 5 in that way that the default values for general physicians are used.
        "stepThree.health.general_physicians": function () {
            if (this.stepThree.health.general_physicians === true) {
                this.stepFive.health.physicians.very_good = 2;
                this.stepFive.health.physicians.good = 5;
                this.stepFive.health.physicians.sufficient = 10;
                this.stepFive.health.physicians.deficient = 20;
            }
            else {
                this.stepFive.health.physicians.very_good = 3;
                this.stepFive.health.physicians.good = 7;
                this.stepFive.health.physicians.sufficient = 13;
                this.stepFive.health.physicians.deficient = 25;
            }
        },
        // these watchers should ensure that the values of the time slots make sense together
        // this functionality is only implemented for the supermarkets yet.
        // Maybe there is a better alternative to implement this than using watchers
        "stepFive.local_supply.supermarket.very_good": function () {
            if (this.stepFive.local_supply.supermarket.good <= this.stepFive.local_supply.supermarket.very_good) {
                this.stepFive.local_supply.supermarket.good = this.stepFive.local_supply.supermarket.very_good + 1;
            }
        },
        "stepFive.local_supply.supermarket.good": function () {
            if (this.stepFive.local_supply.supermarket.sufficient <= this.stepFive.local_supply.supermarket.good) {
                this.stepFive.local_supply.supermarket.sufficient = this.stepFive.local_supply.supermarket.good + 1;
            }
            if (this.stepFive.local_supply.supermarket.good <= this.stepFive.local_supply.supermarket.very_good) {
                this.stepFive.local_supply.supermarket.very_good = this.stepFive.local_supply.supermarket.good - 1;
            }
        },
        "stepFive.local_supply.supermarket.sufficient": function () {
            if (this.stepFive.local_supply.supermarket.deficient <= this.stepFive.local_supply.supermarket.sufficient) {
                this.stepFive.local_supply.supermarket.deficient = this.stepFive.local_supply.supermarket.sufficient + 1;
            }
            if (this.stepFive.local_supply.supermarket.sufficient <= this.stepFive.local_supply.supermarket.good) {
                this.stepFive.local_supply.supermarket.good = this.stepFive.local_supply.supermarket.sufficient - 1;
            }
        },
        "stepFive.local_supply.supermarket.deficient": function () {
            if (this.stepFive.local_supply.supermarket.deficient <= this.stepFive.local_supply.supermarket.sufficient) {
                this.stepFive.local_supply.supermarket.sufficient = this.stepFive.local_supply.supermarket.deficient - 1;
            }
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
                            <TimeInput
                                id="input5_3_1_1"
                                v-model="stepFive.local_supply.supermarket.very_good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_3_1_2"
                                v-model="stepFive.local_supply.supermarket.good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_3_1_3"
                                v-model="stepFive.local_supply.supermarket.sufficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_3_1_4"
                                v-model="stepFive.local_supply.supermarket.deficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Mangelhafte"
                            />
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
                            <TimeInput
                                id="input5_3_2_1"
                                :value="stepFive.local_supply.discounter.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="local_supply"
                                infrastructure="discounter"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_3_2_2"
                                :value="stepFive.local_supply.discounter.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="local_supply"
                                infrastructure="discounter"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_3_2_3"
                                :value="stepFive.local_supply.discounter.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="local_supply"
                                infrastructure="discounter"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_3_2_4"
                                :value="stepFive.local_supply.discounter.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="local_supply"
                                infrastructure="discounter"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Mangelhafte"
                            />
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
                            <TimeInput
                                id="input5_3_3_1"
                                v-model="stepFive.local_supply.others.very_good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_3_3_2"
                                v-model="stepFive.local_supply.others.good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_3_3_3"
                                v-model="stepFive.local_supply.others.sufficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_3_3_4"
                                v-model="stepFive.local_supply.others.deficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Mangelhafte"
                            />
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
                            <TimeInput
                                id="input5_4_1_1"
                                v-model="stepFive.health.pharmacies.very_good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_4_1_2"
                                v-model="stepFive.health.pharmacies.good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_4_1_3"
                                v-model="stepFive.health.pharmacies.sufficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_4_1_4"
                                v-model="stepFive.health.pharmacies.deficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Mangelhafte"
                            />
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
                            <TimeInput
                                id="input5_4_2_1"
                                v-model="stepFive.health.clinics.very_good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_4_2_2"
                                v-model="stepFive.health.clinics.good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_4_2_3"
                                v-model="stepFive.health.clinics.sufficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_4_2_4"
                                v-model="stepFive.health.clinics.deficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Mangelhafte"
                            />
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
                            <TimeInput
                                id="input5_4_3_1"
                                v-model="stepFive.health.physicians.very_good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_4_3_2"
                                v-model="stepFive.health.physicians.good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_4_3_3"
                                v-model="stepFive.health.physicians.sufficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_4_3_4"
                                v-model="stepFive.health.physicians.deficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Mangelhafte"
                            />
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
                            <TimeInput
                                id="input5_5_1_1"
                                v-model="stepFive.education.nurseries.very_good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_5_1_2"
                                v-model="stepFive.education.nurseries.good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_5_1_3"
                                v-model="stepFive.education.nurseries.sufficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_5_1_4"
                                v-model="stepFive.education.nurseries.deficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Mangelhafte"
                            />
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
                            <TimeInput
                                id="input5_5_2_1"
                                v-model="stepFive.education.primary_schools.very_good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_5_2_2"
                                v-model="stepFive.education.primary_schools.good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_5_2_3"
                                v-model="stepFive.education.primary_schools.sufficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_5_2_4"
                                v-model="stepFive.education.primary_schools.deficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Mangelhafte"
                            />
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
                            <TimeInput
                                id="input5_5_3_1"
                                v-model="stepFive.education.secondary_1.very_good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_5_3_2"
                                v-model="stepFive.education.secondary_1.good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_5_3_3"
                                v-model="stepFive.education.secondary_1.sufficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_5_3_4"
                                v-model="stepFive.education.secondary_1.deficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Mangelhafte"
                            />
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
                            <TimeInput
                                id="input5_5_4_1"
                                v-model="stepFive.education.secondary_2.very_good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_5_4_2"
                                v-model="stepFive.education.secondary_2.good"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_5_4_3"
                                v-model="stepFive.education.secondary_2.sufficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_5_4_4"
                                v-model="stepFive.education.secondary_2.deficient"
                                :max-time="100"
                                :min-time="0"
                                supply-category="Mangelhafte"
                            />
                        </div>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
    </div>
</template>
