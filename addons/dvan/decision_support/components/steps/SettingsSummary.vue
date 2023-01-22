<script>
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
export default {
    name: "SettingsSummary",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem
    },
    data () {
        return {
            checkIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                        </svg>`,
            xIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                    </svg>`
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
            return "Ärzte";
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
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
        <BootstrapAccordion
            id="Accordion_7"
            body-padding-y="5px"
        >
            <!-- Nahversorgungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion7_1"
                text="Zusammenfassung Nahversorgung"
                :status="localSupplyStatus"
            >
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <span class="text">Supermärkte</span>
                            <span
                                class="icon"
                                v-html="stepThree.local_supply.supermarket ? checkIcon : xIcon"
                            />
                            <span class="value">baz</span>
                        </li>
                        <li class="list-group-item">
                            <span class="text">Discounter</span>
                            <span
                                class="icon"
                                v-html="stepThree.local_supply.discounter ? checkIcon : xIcon"
                            />
                            <span class="value">baz</span>
                        </li>
                        <li class="list-group-item">
                            <span class="text">sonstige Lebensmittelgeschäfte</span>
                            <span
                                class="icon"
                                v-html="stepThree.local_supply.others ? checkIcon : xIcon"
                            />
                            <span class="value">baz</span>
                        </li>
                    </ul>
                </div>
            </BootstrapAccordionItem>

            <!-- Gesundheits Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion7_2"
                text="Zusammenfassung Gesundheit"
                :status="healthStatus"
            >
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <span class="text">Apotheken</span>
                            <span
                                class="icon"
                                v-html="stepThree.health.pharmacies ? checkIcon : xIcon"
                            />
                            <span class="value">baz</span>
                        </li>
                        <li class="list-group-item">
                            <span class="text">Hochschulkliniken und Plankrankenhäuser</span>
                            <span
                                class="icon"
                                v-html="stepThree.health.clinics ? checkIcon : xIcon"
                            />
                            <span class="value">baz</span>
                        </li>
                        <li class="list-group-item">
                            <span class="text">{{ checkedPhysician }}</span>
                            <span
                                class="icon"
                                v-html="checkedPhysician !== 'Ärzte' ? checkIcon : xIcon"
                            />
                            <span class="value">baz</span>
                        </li>
                    </ul>
                </div>
            </BootstrapAccordionItem>

            <!-- Bildungs Infrastrukturen -->
            <BootstrapAccordionItem
                id="Accordion7_3"
                text="Zusammenfassung Bildung"
                :status="educationStatus"
            >
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <span class="text">Kindertagesstätten</span>
                            <span
                                class="icon"
                                v-html="stepThree.education.nurseries ? checkIcon : xIcon"
                            />
                            <span class="value">baz</span>
                        </li>
                        <li class="list-group-item">
                            <span class="text">Primärschulen</span>
                            <span
                                class="icon"
                                v-html="stepThree.education.primary_schools ? checkIcon : xIcon"
                            />
                            <span class="value">baz</span>
                        </li>
                        <li class="list-group-item">
                            <span class="text">Sekundarstufe Bereich 1 & 2; ohne (Fach)Hochschulreife</span>
                            <span
                                class="icon"
                                v-html="stepThree.education.secondary_1 ? checkIcon : xIcon"
                            />
                            <span class="value">baz</span>
                        </li>
                        <li class="list-group-item">
                            <span class="text">Sekundarstufe Bereich 1 & 2; mit (Fach)Hochschulreife</span>
                            <span
                                class="icon"
                                v-html="stepThree.education.secondary_2 ? checkIcon : xIcon"
                            />
                            <span class="value">100%</span>
                        </li>
                    </ul>
                </div>
            </BootstrapAccordionItem>
        </BootstrapAccordion>
        <br>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
    </div>
</template>

<style lang="scss" scoped>
.card {
    width: 100%;
}
.list-group .list-group-item {
    --bs-list-group-item-padding-x: 10px;
}
.text {
    display: inline-block;
    width: calc(100% - 90px);
}
.icon {
    position: relative;
    top: -2px;
    display: inline-block;
    width: 40px;
}
.value {
    display: inline-block;

    width: 40px;
}
</style>
