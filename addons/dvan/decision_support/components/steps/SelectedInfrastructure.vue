<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectedInfrastructure",
    components: {
        BootstrapCheckbox
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
    <div
        id="selected_infrastructure"
        class="accordion accordion-flush"
    >
        <p>Bitte wählen Sie Infrastrukturen, die Sie in die Analyse einbeziehen<br> wollen:</p>
        <!-- Nahversorgungs Infrastrukturen -->
        <div class="accordion-item">
            <h2
                id="headingOne"
                class="accordion-header"
            >
                <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                >
                    Nahversorgung
                </button>
            </h2>
            <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div
                    class="accordion-body"
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
                        tooltipText="Hierzu zählen Standorte des Lebensmittelhandwerkes<br> (Bäcker/Fleischer), Hof- und Bioläden und sonstige<br> Lebensmittelgeschäfte."
                    />
                </div>
            </div>
        </div>

        <!-- Gesundheits Infrastrukturen -->
        <div class="accordion-item">
            <h2
                id="headingTwo"
                class="accordion-header"
            >
                <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                >
                    Gesundheit
                </button>
            </h2>
            <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
            >
                <div
                    class="accordion-body"
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
                </div>
            </div>
        </div>

        <!-- Bildungs Infrastrukturen -->
        <div class="accordion-item">
            <h2
                id="headingThree"
                class="accordion-header"
            >
                <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                >
                    Bildung
                </button>
            </h2>
            <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
            >
                <div
                    class="accordion-body"
                >
                    <BootstrapCheckbox
                        id="checkbox_3_3_1"
                        v-model="stepThree.education.nurseries"
                        text="Kindertagesstätten"
                        tooltipText="Einrichtungen zur Betreuung von Kindern  bis zum sechsten Lebensjahr. Ohne Horteinrichtungen."
                    />
                    <BootstrapCheckbox
                        id="checkbox_3_3_2"
                        v-model="stepThree.education.primary_schools"
                        text="Primärschulen"
                        tooltipText="Primärbereich umfasst die 1. bis 4. Schuljahrgänge."
                    />
                    <BootstrapCheckbox
                        id="checkbox_3_3_3"
                        v-model="stepThree.education.secondary_1"
                        text="Sekundarstufe Bereich 1, ohne (Fach)Hochschulreife"
                        tooltipText="Haupt-, Real-, Ober- und Gesamtschulen ohne Möglichkeit zum Erwerb der (Fach)Hochschulreife."
                    />
                    <BootstrapCheckbox
                        id="checkbox_3_3_4"
                        v-model="stepThree.education.secondary_2"
                        text="Sekundarstufe Bereich 1 und 2, mit Möglichkeit zu Erwerb der (Fach)Hochschulreife"
                        tooltipText="Gesamtschulen und Gymnasien mit Möglichkeiten zum Erwerb der (Fach)Hochschulreife."
                    />
                    <br>
                    <p>Die niedersächsischen Schulstrukturen und die Schulform lassen sich unter folgendem Link abrufen: [Link]</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#selected_infrastructure.accordion {
    --bs-accordion-btn-padding-x: 10px;
    --bs-accordion-btn-padding-y: 2px;
}
</style>
