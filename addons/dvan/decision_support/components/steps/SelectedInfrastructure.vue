<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectedInfrastructure",
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
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters)),

        checkedPhysician () {
            for (const item in this.stepThree.health) {
                if (item === "pharmacies" || item === "clinics") {
                    continue;
                }
                if (this.stepThree.health[item] === true) {
                    return item;
                }
            }
            return null;
        },

        localSupplyStatus () {
            for (const item in this.stepThree.local_supply) {
                if (this.stepThree.local_supply[item] === true) {
                    return "valid";
                }
            }
            return "default";
        },
        healthStatus () {
            for (const item in this.stepThree.health) {
                if (this.stepThree.health[item] === true) {
                    return "valid";
                }
            }
            return "default";
        },
        educationStatus () {
            for (const item in this.stepThree.education) {
                if (this.stepThree.education[item] === true) {
                    return "valid";
                }
            }
            return "default";
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
        Bitte w??hlen Sie Infrastrukturen, die Sie in die Analyse einbeziehen<br> wollen:
        <BootstrapAccordion
            id="Accordion_3"
            body-padding-y="5px"
        >
            <!-- Nahversorgungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion_3_1"
                text="Nahversorgung"
                :status="localSupplyStatus"
            >
                <BootstrapCheckbox
                    id="Checkbox_3_1_1"
                    v-model="stepThree.local_supply.supermarket"
                    text="Superm??rkte"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_1_2"
                    v-model="stepThree.local_supply.discounter"
                    text="Discounter"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_1_3"
                    v-model="stepThree.local_supply.others"
                    text="sonstige Lebensmittelgesch??fte"
                    tooltip-text="Hierzu z??hlen Standorte des Lebensmittelhandwerkes<br> (B??cker/Fleischer), Hof- und Biol??den und sonstige<br> Lebensmittelgesch??fte."
                />
            </BootstrapAccordionItem>

            <!-- Gesundheits Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion_3_2"
                text="Gesundheit"
                :status="healthStatus"
            >
                <BootstrapCheckbox
                    id="Checkbox_3_2_1"
                    v-model="stepThree.health.pharmacies"
                    text="Apotheken"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_2"
                    v-model="stepThree.health.clinics"
                    text="Hochschulkliniken und Plankrankenh??user"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_3"
                    v-model="stepThree.health.general_physicians"
                    text="Haus??rzte"
                    :disabled="checkedPhysician === null || checkedPhysician === 'general_physicians' ? false : true"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_4"
                    v-model="stepThree.health.paediatricians"
                    text="Kinder- und Jugend??rzte"
                    :disabled="checkedPhysician === null || checkedPhysician === 'paediatricians' ? false : true"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_5"
                    v-model="stepThree.health.ophthalmologists"
                    text="Augen??rzte"
                    :disabled="checkedPhysician === null || checkedPhysician === 'ophthalmologists' ? false : true"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_6"
                    v-model="stepThree.health.surgeons"
                    text="Chirurgen und Orthop??den"
                    :disabled="checkedPhysician === null || checkedPhysician === 'surgeons' ? false : true"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_7"
                    v-model="stepThree.health.gynaecologists"
                    text="Frauen??rzte"
                    :disabled="checkedPhysician === null || checkedPhysician === 'gynaecologists' ? false : true"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_8"
                    v-model="stepThree.health.dermatologists"
                    text="Haut??rzte"
                    :disabled="checkedPhysician === null || checkedPhysician === 'dermatologists' ? false : true"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_9"
                    v-model="stepThree.health.otolaryngologist"
                    text="HNO-??rzte"
                    :disabled="checkedPhysician === null || checkedPhysician === 'otolaryngologist' ? false : true"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_10"
                    v-model="stepThree.health.neurologist"
                    text="Nerven??rzte"
                    :disabled="checkedPhysician === null || checkedPhysician === 'neurologist' ? false : true"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_11"
                    v-model="stepThree.health.psychotherapists"
                    text="Psychotherapeuten"
                    :disabled="checkedPhysician === null || checkedPhysician === 'psychotherapists' ? false : true"
                />
                <BootstrapCheckbox
                    id="Checkbox_3_2_12"
                    v-model="stepThree.health.urologists"
                    text="Urologen"
                    :disabled="checkedPhysician === null || checkedPhysician === 'urologists' ? false : true"
                />
                <div
                    v-if="checkedPhysician !== null"
                    id="Infotext_3_1"
                    class="callout"
                >
                    Es kann nur eine Arztgruppe ausgew??hlt werden
                </div>
            </BootstrapAccordionItem>

            <!-- Bildungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion_3_3"
                text="Bildung"
                :status="educationStatus"
            >
                <BootstrapCheckbox
                    id="Checkbox_3_3_1"
                    v-model="stepThree.education.nurseries"
                    text="Kindertagesst??tten"
                    tooltip-text="Einrichtungen zur Betreuung von Kindern  bis zum sechsten Lebensjahr. Ohne Horteinrichtungen."
                />
                <BootstrapCheckbox
                    id="Checkbox_3_3_2"
                    v-model="stepThree.education.primary_schools"
                    text="Prim??rschulen"
                    tooltip-text="Prim??rbereich umfasst die 1. bis 4. Schuljahrg??nge."
                />
                <BootstrapCheckbox
                    id="Checkbox_3_3_3"
                    v-model="stepThree.education.secondary_1"
                    text="Sekundarstufe Bereich 1, ohne (Fach)Hochschulreife"
                    tooltip-text="Haupt-, Real-, Ober- und Gesamtschulen ohne M??glichkeit zum Erwerb der (Fach)Hochschulreife."
                />
                <BootstrapCheckbox
                    id="Checkbox_3_3_4"
                    v-model="stepThree.education.secondary_2"
                    text="Sekundarstufe Bereich 1 und 2, mit M??glichkeit zu Erwerb der (Fach)Hochschulreife"
                    tooltip-text="Gesamtschulen und Gymnasien mit M??glichkeiten zum Erwerb der (Fach)Hochschulreife."
                />
                <div
                    id="Infotext_3_2"
                    class="callout"
                >
                    Die nieders??chsischen Schulstrukturen und die Schulform lassen sich unter folgendem <a
                        href="https://www.mk.niedersachsen.de/startseite/schule/unsere_schulen/unsere-schulen-6470.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Link</a> abrufen.
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
</style>
