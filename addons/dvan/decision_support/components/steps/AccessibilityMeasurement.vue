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
                const timeItemCount = {};

                for (const timeItem in this.stepFive.local_supply.supermarket) {
                    const timeItemValue = this.stepFive.local_supply.supermarket[timeItem];

                    // checking if values are equal or below 0
                    if (this.stepFive.local_supply.supermarket[timeItem] <= 0) {
                        return "invalid";
                    }
                    // checking if value appears in another TimeInput of the same infrastructure
                    if (timeItemValue in timeItemCount) {
                        return "invalid";
                    }
                    timeItemCount[timeItemValue] = 1;
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_3_2
        discounterStatus () {
            if (this.stepThree.local_supply.discounter === true) {
                const timeItemCount = {};

                for (const timeItem in this.stepFive.local_supply.discounter) {
                    const timeItemValue = this.stepFive.local_supply.discounter[timeItem];

                    if (this.stepFive.local_supply.discounter[timeItem] <= 0) {
                        return "invalid";
                    }
                    if (timeItemValue in timeItemCount) {
                        return "invalid";
                    }
                    timeItemCount[timeItemValue] = 1;
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_3_3
        othersStatus () {
            if (this.stepThree.local_supply.others === true) {
                const timeItemCount = {};

                for (const timeItem in this.stepFive.local_supply.others) {
                    const timeItemValue = this.stepFive.local_supply.others[timeItem];

                    if (this.stepFive.local_supply.others[timeItem] <= 0) {
                        return "invalid";
                    }
                    if (timeItemValue in timeItemCount) {
                        return "invalid";
                    }
                    timeItemCount[timeItemValue] = 1;
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
                const timeItemCount = {};

                for (const timeItem in this.stepFive.health.pharmacies) {
                    const timeItemValue = this.stepFive.health.pharmacies[timeItem];

                    if (this.stepFive.health.pharmacies[timeItem] <= 0) {
                        return "invalid";
                    }
                    if (timeItemValue in timeItemCount) {
                        return "invalid";
                    }
                    timeItemCount[timeItemValue] = 1;
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_4_2
        clinicsStatus () {
            if (this.stepThree.health.clinics === true) {
                const timeItemCount = {};

                for (const timeItem in this.stepFive.health.clinics) {
                    const timeItemValue = this.stepFive.health.clinics[timeItem];

                    if (this.stepFive.health.clinics[timeItem] <= 0) {
                        return "invalid";
                    }
                    if (timeItemValue in timeItemCount) {
                        return "invalid";
                    }
                    timeItemCount[timeItemValue] = 1;
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_4_3
        physiciansStatus () {
            for (const item in this.stepThree.health) {
                if ((item !== "pharmacies") && (item !== "clinics") && (this.stepThree.health[item] === true)) {
                    const timeItemCount = {};

                    for (const timeItem in this.stepFive.health.physicians) {
                        const timeItemValue = this.stepFive.health.physicians[timeItem];

                        if (this.stepFive.health.physicians[timeItem] <= 0) {
                            return "invalid";
                        }
                        if (timeItemValue in timeItemCount) {
                            return "invalid";
                        }
                        timeItemCount[timeItemValue] = 1;
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
                const timeItemCount = {};

                for (const timeItem in this.stepFive.education.nurseries) {
                    const timeItemValue = this.stepFive.education.nurseries[timeItem];

                    if (this.stepFive.education.nurseries[timeItem] <= 0) {
                        return "invalid";
                    }
                    if (timeItemValue in timeItemCount) {
                        return "invalid";
                    }
                    timeItemCount[timeItemValue] = 1;
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_2
        primarySchoolsStatus () {
            if (this.stepThree.education.primary_schools === true) {
                const timeItemCount = {};

                for (const timeItem in this.stepFive.education.primary_schools) {
                    const timeItemValue = this.stepFive.education.primary_schools[timeItem];

                    if (this.stepFive.education.primary_schools[timeItem] <= 0) {
                        return "invalid";
                    }
                    if (timeItemValue in timeItemCount) {
                        return "invalid";
                    }
                    timeItemCount[timeItemValue] = 1;
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_3
        secondary1Status () {
            if (this.stepThree.education.secondary_1 === true) {
                const timeItemCount = {};

                for (const timeItem in this.stepFive.education.secondary_1) {
                    const timeItemValue = this.stepFive.education.secondary_1[timeItem];

                    if (this.stepFive.education.secondary_1[timeItem] <= 0) {
                        return "invalid";
                    }
                    if (timeItemValue in timeItemCount) {
                        return "invalid";
                    }
                    timeItemCount[timeItemValue] = 1;
                }
                return "valid";
            }
            return "deactivated";
        },
        // compute status of Accordion5_5_4
        secondary2Status () {
            if (this.stepThree.education.secondary_2 === true) {
                const timeItemCount = {};

                for (const timeItem in this.stepFive.education.secondary_2) {
                    const timeItemValue = this.stepFive.education.secondary_2[timeItem];

                    if (this.stepFive.education.secondary_2[timeItem] <= 0) {
                        return "invalid";
                    }
                    if (timeItemValue in timeItemCount) {
                        return "invalid";
                    }
                    timeItemCount[timeItemValue] = 1;
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
                                :value="stepFive.local_supply.supermarket.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="local_supply"
                                infrastructure="supermarket"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_3_1_2"
                                :value="stepFive.local_supply.supermarket.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="local_supply"
                                infrastructure="supermarket"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_3_1_3"
                                :value="stepFive.local_supply.supermarket.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="local_supply"
                                infrastructure="supermarket"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_3_1_4"
                                :value="stepFive.local_supply.supermarket.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="local_supply"
                                infrastructure="supermarket"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
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
                                :value="stepFive.local_supply.others.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="local_supply"
                                infrastructure="others"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_3_3_2"
                                :value="stepFive.local_supply.others.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="local_supply"
                                infrastructure="others"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_3_3_3"
                                :value="stepFive.local_supply.others.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="local_supply"
                                infrastructure="others"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_3_3_4"
                                :value="stepFive.local_supply.others.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="local_supply"
                                infrastructure="others"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
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
                                :value="stepFive.health.pharmacies.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="health"
                                infrastructure="pharmacies"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_4_1_2"
                                :value="stepFive.health.pharmacies.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="health"
                                infrastructure="pharmacies"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_4_1_3"
                                :value="stepFive.health.pharmacies.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="health"
                                infrastructure="pharmacies"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_4_1_4"
                                :value="stepFive.health.pharmacies.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="health"
                                infrastructure="pharmacies"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
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
                                :value="stepFive.health.clinics.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="health"
                                infrastructure="clinics"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_4_2_2"
                                :value="stepFive.health.clinics.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="health"
                                infrastructure="clinics"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_4_2_3"
                                :value="stepFive.health.clinics.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="health"
                                infrastructure="clinics"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_4_2_4"
                                :value="stepFive.health.clinics.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="health"
                                infrastructure="clinics"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
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
                                :value="stepFive.health.physicians.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="health"
                                infrastructure="physicians"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_4_3_2"
                                :value="stepFive.health.physicians.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="health"
                                infrastructure="physicians"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_4_3_3"
                                :value="stepFive.health.physicians.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="health"
                                infrastructure="physicians"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_4_3_4"
                                :value="stepFive.health.physicians.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="health"
                                infrastructure="physicians"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
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
                                :value="stepFive.education.nurseries.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="education"
                                infrastructure="nurseries"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_5_1_2"
                                :value="stepFive.education.nurseries.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="education"
                                infrastructure="nurseries"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_5_1_3"
                                :value="stepFive.education.nurseries.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="education"
                                infrastructure="nurseries"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_5_1_4"
                                :value="stepFive.education.nurseries.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="education"
                                infrastructure="nurseries"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
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
                                :value="stepFive.education.primary_schools.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="education"
                                infrastructure="primary_schools"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_5_2_2"
                                :value="stepFive.education.primary_schools.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="education"
                                infrastructure="primary_schools"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_5_2_3"
                                :value="stepFive.education.primary_schools.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="education"
                                infrastructure="primary_schools"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_5_2_4"
                                :value="stepFive.education.primary_schools.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="education"
                                infrastructure="primary_schools"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
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
                                :value="stepFive.education.secondary_1.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="education"
                                infrastructure="secondary_1"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_5_3_2"
                                :value="stepFive.education.secondary_1.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="education"
                                infrastructure="secondary_1"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_5_3_3"
                                :value="stepFive.education.secondary_1.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="education"
                                infrastructure="secondary_1"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_5_3_4"
                                :value="stepFive.education.secondary_1.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="education"
                                infrastructure="secondary_1"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
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
                                :value="stepFive.education.secondary_2.very_good"
                                mutation="Tools/DecisionSupport/SET_VERY_GOOD"
                                category="education"
                                infrastructure="secondary_2"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Sehr gute"
                            />
                            <TimeInput
                                id="input5_5_4_2"
                                :value="stepFive.education.secondary_2.good"
                                mutation="Tools/DecisionSupport/SET_GOOD"
                                category="education"
                                infrastructure="secondary_2"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Gute"
                            />
                            <TimeInput
                                id="input5_5_4_3"
                                :value="stepFive.education.secondary_2.sufficient"
                                mutation="Tools/DecisionSupport/SET_SUFFICIENT"
                                category="education"
                                infrastructure="secondary_2"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Ausreichende"
                            />
                            <TimeInput
                                id="input5_5_4_4"
                                :value="stepFive.education.secondary_2.deficient"
                                mutation="Tools/DecisionSupport/SET_DEFICIENT"
                                category="education"
                                infrastructure="secondary_2"
                                :max-time="stepFive.maxValue"
                                :min-time="stepFive.minValue"
                                supply-category="Mangelhafte"
                            />
                        </div>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
    </div>
</template>
