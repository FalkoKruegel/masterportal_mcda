<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectedInfrastructure",
    components: {
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
                    <div class="form-check">
                        <input
                            id="checkbox_3_1_1"
                            v-model="stepThree.local_supply.supermarket"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_1_1"
                        >
                            Supermärkte
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_1_2"
                            v-model="stepThree.local_supply.discounter"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_1_2"
                        >
                            Discounter
                        </label>
                    </div>
                    <div
                        class="form-check"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-html="true"
                        title="Hierzu zählen Standorte des Lebensmittelhandwerkes<br> (Bäcker/Fleischer), Hof- und Bioläden und sonstige<br> Lebensmittelgeschäfte."
                    >
                        <input
                            id="checkbox_3_1_3"
                            v-model="stepThree.local_supply.others"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_1_3"
                        >
                            sonstige Lebensmittelgeschäfte
                        </label>
                    </div>
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
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_1"
                            v-model="stepThree.health.pharmacies"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_1"
                        >
                            Apotheken
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_2"
                            v-model="stepThree.health.clinics"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_2"
                        >
                            Hochschulkliniken und Plankrankenhäuser
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_3"
                            v-model="stepThree.health.general_physicians"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_3"
                        >
                            Hausärzte
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_4"
                            v-model="stepThree.health.paediatricians"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_4"
                        >
                            Kinder- und Jugendärzte
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_5"
                            v-model="stepThree.health.ophthalmologists"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_5"
                        >
                            Augenärzte
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_6"
                            v-model="stepThree.health.surgeons"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_6"
                        >
                            Chirurgen und Orthopäden
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_7"
                            v-model="stepThree.health.gynaecologists"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_7"
                        >
                            Frauenärzte
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_8"
                            v-model="stepThree.health.dermatologists"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_8"
                        >
                            Hautärzte
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_9"
                            v-model="stepThree.health.otolaryngologist"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_9"
                        >
                            HNO-Arzte
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_10"
                            v-model="stepThree.health.neurologist"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_10"
                        >
                            Nervenärzte
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_11"
                            v-model="stepThree.health.psychotherapists"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_11"
                        >
                            Psychotherapeuten
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            id="checkbox_3_2_12"
                            v-model="stepThree.health.urologists"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_2_12"
                        >
                            Urologen
                        </label>
                    </div>
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
                    <div
                        class="form-check"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-html="true"
                        title="Einrichtungen zur Betreuung von Kindern  bis zum sechsten Lebensjahr. Ohne Horteinrichtungen."
                    >
                        <input
                            id="checkbox_3_3_1"
                            v-model="stepThree.education.nurseries"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_3_1"
                        >
                            Kindertagesstätten
                        </label>
                    </div>
                    <div
                        class="form-check"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-html="true"
                        title="Primärbereich umfasst die 1. bis 4. Schuljahrgänge."
                    >
                        <input
                            id="checkbox_3_3_2"
                            v-model="stepThree.education.primary_schools"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_3_2"
                        >
                            Primärschulen
                        </label>
                    </div>
                    <div
                        class="form-check"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-html="true"
                        title="Haupt-, Real-, Ober- und Gesamtschulen ohne Möglichkeit zum Erwerb der (Fach)Hochschulreife."
                    >
                        <input
                            id="checkbox_3_3_3"
                            v-model="stepThree.education.secondary_1"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_3_3"
                        >
                            Sekundarstufe Bereich 1, ohne (Fach)Hochschulreife
                        </label>
                    </div>
                    <div
                        class="form-check"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-html="true"
                        title="Gesamtschulen und Gymnasien mit Möglichkeiten zum Erwerb der (Fach)Hochschulreife"
                    >
                        <input
                            id="checkbox_3_3_4"
                            v-model="stepThree.education.secondary_2"
                            class="form-check-input"
                            type="checkbox"
                        >
                        <label
                            class="form-check-label"
                            for="checkbox_3_3_4"
                        >
                            Sekundarstufe Bereich 1 und 2, mit Möglichkeit zu Erwerb der (Fach)Hochschulreife
                        </label>
                    </div>
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
