<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";

export default {
    name: "SelectFacility",
    components: {
        BootstrapCheckbox,
        BootstrapAccordion,
        BootstrapAccordionItem
    },
    emits: [
    ],
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/SpatialAnalysis", Object.keys(getters))
    },
    methods: {
        ...mapActions("Tools/SpatialAnalysis", [
            "initialize"
        ]),
        ...mapMutations("Tools/SpatialAnalysis", [
            "setActive"
        ])

    }
};
</script>

<template lang="html">
    <div>
        <p>Bitte wählen Sie Infrastrukturen, die Sie in die Analyse einbeziehen wollen:</p>
        <BootstrapAccordion
            id="Accordion_3"
            body-padding-y="5px"
        >
            <!-- Nahversorgungs Infrastrukturen -->
            <BootstrapAccordionItem
                v-for="(items, group_name, group_index) in stepTwo.facilities"
                :id="`Accordion_3_${group_index}`"
                :key="group_index"
                parent-id="Accordion_3"
                :text="group_name"
            >
                <BootstrapCheckbox
                    v-for="(item, index) in items"
                    :id="`Checkbox_3_${group_index}_${index}`"
                    :key="index"
                    :value="stepTwo.selected_facility === item['name']"
                    :text="item['text']"
                    @input="e => e === true ? stepTwo.selected_facility = item['name'] : stepTwo.selected_facility = null"
                />
            </BootstrapAccordionItem>
        </BootstrapAccordion>
        <br>
        <p>Ausgewählte Infrastrukturen: <b>{{ stepTwo.selected_facility }}</b></p>
    </div>
</template>

<style lang="scss" scoped>
.callout-warning {
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: rgba(var(--bs-danger-rgb), .075);
    border-left: 0.25rem solid var(--bd-callout-border, rgba(var(--bs-danger-rgb), .5));
}
</style>
