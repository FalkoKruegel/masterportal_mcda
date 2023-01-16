<script>
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "InfrastructureWeighting",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters)),

        checkedPhysician () {
            for (const item in this.stepThree.health) {
                if (item === "pharmacies" || item === "clinics") {
                    continue;
                }
                if (this.stepThree.health[item] === true) {
                    switch (item) {
                        case "general_physicians":
                            return "Hausärzte";
                        case "paediatricians":
                            return "Kinder- und Jugendärzte";
                        case "ophthalmologists":
                            return "Augenärzte";
                        case "surgeons":
                            return "Chirurgen und Orthopäden";
                        case "gynaecologists":
                            return "Frauenärzte";
                        case "dermatologists":
                            return "Hautärzte";
                        case "otolaryngologist":
                            return "HNO-Ärzte";
                        case "neurologist":
                            return "Nervenärzte";
                        case "psychotherapists":
                            return "Psychotherapeuten";
                        case "urologists":
                            return "Urologen";
                        default:
                            continue;
                    }
                }
            }
            return null;
        },

        localSupplyStatus () {
            for (const item in this.stepThree.local_supply) {
                if (this.stepThree.local_supply[item] === true) {
                    return "default";
                }
            }
            return "deactivated";
        },
        healthStatus () {
            for (const item in this.stepThree.health) {
                if (this.stepThree.health[item] === true) {
                    return "default";
                }
            }
            return "deactivated";
        },
        educationStatus () {
            for (const item in this.stepThree.education) {
                if (this.stepThree.education[item] === true) {
                    return "default";
                }
            }
            return "deactivated";
        }
    },
    watch: {
        stepThree: {
            handler () {
                for (const item in this.stepThree.local_supply) {
                    if (this.stepThree.local_supply[item] === false) {
                        this.stepSix.local_supply[item] = 0;
                    }
                }
                for (const item in this.stepThree.health) {
                    if (this.stepThree.health[item] === false) {
                        if (item === "pharmacies" || item === "clinics") {
                            this.stepSix.health[item] = 0;
                        }
                    }
                }
                if (this.checkedPhysician === null) {
                    this.stepSix.health.physicians = 0;
                }
                for (const item in this.stepThree.education) {
                    if (this.stepThree.education[item] === false) {
                        this.stepSix.education[item] = 0;
                    }
                }
                return "invalid";
            },
            deep: true
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
        <p>Sie haben die Möglichkeit, individuelle Gewichtungen zuzuweisen, um zu bestimmen, wie wichtig jede Infrastruktur in Ihrer Analyse sein soll.</p>
        <p>Sie können Werte zwischen 0 und 100  über den Schieberegler vergeben. Bitte beachten Sie, dass ein Wert von 0 bedeutet, dass die Infrastruktur in der Analyse nicht berücksichtigt wird.</p>
        <BootstrapAccordion
            id="Accordion_3"
            body-padding-y="5px"
        >
            <!-- Nahversorgungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion6_1"
                text="Gewichtung Nahversorgung"
                :status="localSupplyStatus"
            >
                <label
                    for="Range6_1_1"
                    class="form-label"
                >
                    Supermärkte
                </label>
                <input
                    id="Range6_1_1"
                    v-model="stepSix.local_supply.supermarket"
                    type="range"
                    class="form-range"
                    :disabled="stepThree.local_supply.supermarket === false"
                >
                <label
                    for="Range6_1_2"
                    class="form-label"
                >
                    Discounter
                </label>
                <input
                    id="Range6_1_2"
                    v-model="stepSix.local_supply.discounter"
                    type="range"
                    class="form-range"
                    :disabled="stepThree.local_supply.discounter === false"
                >
                <label
                    for="Range6_1_3"
                    class="form-label"
                >
                    sonstige Lebensmittelgeschäfte
                </label>
                <input
                    id="Range6_1_3"
                    v-model="stepSix.local_supply.others"
                    type="range"
                    class="form-range"
                    :disabled="stepThree.local_supply.others === false"
                >
            </BootstrapAccordionItem>

            <!-- Gesundheits Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion6_2"
                text="Gewichtung Gesundheit"
                :status="healthStatus"
            >
                <label
                    for="Range6_2_1"
                    class="form-label"
                >
                    Apotheken
                </label>
                <input
                    id="Range6_2_1"
                    v-model="stepSix.health.pharmacies"
                    type="range"
                    class="form-range"
                    :disabled="stepThree.health.pharmacies === false"
                >
                <label
                    for="Range6_2_2"
                    class="form-label"
                >
                    Hochschulkliniken und Plankrankenhäuser
                </label>
                <input
                    id="Range6_2_2"
                    v-model="stepSix.health.clinics"
                    type="range"
                    class="form-range"
                    :disabled="stepThree.health.clinics === false"
                >
                <label
                    for="Range6_2_3"
                    class="form-label"
                >
                    {{ checkedPhysician }}
                </label>
                <input
                    id="Range6_2_3"
                    v-model="stepSix.health.physicians"
                    type="range"
                    class="form-range"
                    :disabled="checkedPhysician === null"
                >
            </BootstrapAccordionItem>

            <!-- Bildungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion6_3"
                text="Gewichtung Bildung"
                :status="educationStatus"
            >
                <label
                    for="Range6_3_1"
                    class="form-label"
                >
                    Kindertagesstätten
                </label>
                <input
                    id="Range6_3_1"
                    v-model="stepSix.education.nurseries"
                    type="range"
                    class="form-range"
                    :disabled="stepThree.education.nurseries === false"
                >
                <label
                    for="Range6_3_2"
                    class="form-label"
                >
                    Primärschulen
                </label>
                <input
                    id="Range6_3_2"
                    v-model="stepSix.education.primary_schools"
                    type="range"
                    class="form-range"
                    :disabled="stepThree.education.primary_schools === false"
                >
                <label
                    for="Range6_3_3"
                    class="form-label"
                >
                    Sekundarstufe Bereich 1, ohne (Fach)Hochschulreife
                </label>
                <input
                    id="Range6_3_3"
                    v-model="stepSix.education.secondary_1"
                    type="range"
                    class="form-range"
                    :disabled="stepThree.education.secondary_1 === false"
                >
                <label
                    for="Range6_3_4"
                    class="form-label"
                >
                    Sekundarstufe Bereich 1 und 2, mit Möglichkeit zu Erwerb der (Fach)Hochschulreife
                </label>
                <input
                    id="Range6_3_4"
                    v-model="stepSix.education.secondary_2"
                    type="range"
                    class="form-range"
                    :disabled="stepThree.education.secondary_2 === false"
                >
            </BootstrapAccordionItem>
        </BootstrapAccordion>
    </div>
</template>

<style lang="scss" scoped>
</style>
