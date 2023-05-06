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
            />
            <BootstrapCheckbox
                id="checkbox2_2"
                v-model="stepTwo.medicalService.specialist"
                text="Facharzt"
            />
            <BootstrapCheckbox
                id="checkbox2_3"
                v-model="stepTwo.medicalService.psychotherapist"
                text="Psychotherapeut"
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
                />
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
                    />
                    <BootstrapCheckbox
                        id="checkbox2_2_2_2"
                        v-model="stepTwo.empoweredPhys.yes"
                        text="ja"
                    />
                    <BootstrapCheckbox
                        id="checkbox2_2_2_1"
                        v-model="stepTwo.empoweredPhys.onlyPhys"
                        text="ausschließlich ermächtigte Ärzte"
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
