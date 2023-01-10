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
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters))
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
        Bitte wählen Sie Infrastrukturen, die Sie in die Analyse einbeziehen<br> wollen:
        <BootstrapAccordion
            id="selected_infrastructures"
            body-padding-y="5px"
        >
            <!-- Nahversorgungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="collapseOne"
                text="Nahversorgung"
            >
                <BootstrapCheckbox
                    id="checkbox_3_1_1"
                    v-model="stepThree.local_supply.supermarket"
                    text="Supermärkte"
                />
                <BootstrapCheckbox
                    id="checkbox_3_1_2"
                    v-model="stepThree.local_supply.discounter"
                    text="Discounter"
                />
                <BootstrapCheckbox
                    id="checkbox_3_1_3"
                    v-model="stepThree.local_supply.others"
                    text="sonstige Lebensmittelgeschäfte"
                    tooltip-text="Hierzu zählen Standorte des Lebensmittelhandwerkes<br> (Bäcker/Fleischer), Hof- und Bioläden und sonstige<br> Lebensmittelgeschäfte."
                />
            </BootstrapAccordionItem>

            <!-- Gesundheits Infrastrukturen -->
            <BootstrapAccordionItem
                id="collapseTwo"
                text="Gesundheit"
            >
                <BootstrapCheckbox
                    id="checkbox_3_2_1"
                    v-model="stepThree.health.pharmacies"
                    text="Apotheken"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_2"
                    v-model="stepThree.health.clinics"
                    text="Hochschulkliniken und Plankrankenhäuser"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_3"
                    v-model="stepThree.health.general_physicians"
                    text="Hausärzte"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_4"
                    v-model="stepThree.health.paediatricians"
                    text="Kinder- und Jugendärzte"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_5"
                    v-model="stepThree.health.ophthalmologists"
                    text="Augenärzte"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_6"
                    v-model="stepThree.health.surgeons"
                    text="Chirurgen und Orthopäden"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_7"
                    v-model="stepThree.health.gynaecologists"
                    text="Frauenärzte"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_8"
                    v-model="stepThree.health.dermatologists"
                    text="Hautärzte"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_9"
                    v-model="stepThree.health.otolaryngologist"
                    text="HNO-Ärzte"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_10"
                    v-model="stepThree.health.neurologist"
                    text="Nervenärzte"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_11"
                    v-model="stepThree.health.psychotherapists"
                    text="Psychotherapeuten"
                />
                <BootstrapCheckbox
                    id="checkbox_3_2_12"
                    v-model="stepThree.health.urologists"
                    text="Urologen"
                />
            </BootstrapAccordionItem>

            <!-- Bildungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="collapseThree"
                text="Bildung"
            >
                <BootstrapCheckbox
                    id="checkbox_3_3_1"
                    v-model="stepThree.education.nurseries"
                    text="Kindertagesstätten"
                    tooltip-text="Einrichtungen zur Betreuung von Kindern  bis zum sechsten Lebensjahr. Ohne Horteinrichtungen."
                />
                <BootstrapCheckbox
                    id="checkbox_3_3_2"
                    v-model="stepThree.education.primary_schools"
                    text="Primärschulen"
                    tooltip-text="Primärbereich umfasst die 1. bis 4. Schuljahrgänge."
                />
                <BootstrapCheckbox
                    id="checkbox_3_3_3"
                    v-model="stepThree.education.secondary_1"
                    text="Sekundarstufe Bereich 1, ohne (Fach)Hochschulreife"
                    tooltip-text="Haupt-, Real-, Ober- und Gesamtschulen ohne Möglichkeit zum Erwerb der (Fach)Hochschulreife."
                />
                <BootstrapCheckbox
                    id="checkbox_3_3_4"
                    v-model="stepThree.education.secondary_2"
                    text="Sekundarstufe Bereich 1 und 2, mit Möglichkeit zu Erwerb der (Fach)Hochschulreife"
                    tooltip-text="Gesamtschulen und Gymnasien mit Möglichkeiten zum Erwerb der (Fach)Hochschulreife."
                />
                <div class="callout">
                    Die niedersächsischen Schulstrukturen und die Schulform lassen sich unter folgendem Link abrufen: [Link]
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
