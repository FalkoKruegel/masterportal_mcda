<script>
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import {convertLayerName} from "../../utils/util";

export default {
    name: "AnalysisResults",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem,
        BootstrapCheckbox
    },
    data () {
        return {
            selected_layer: "multiCritera",
        };
    },
    computed: {
        ...mapGetters("Tools/DecisionSupport", Object.keys(getters)),

        checkedLayers () {
            const layers = ["multiCritera"];

            for (const item in this.stepThree.local_supply) {
                if (this.stepThree.local_supply[item] !== true) {
                    continue;
                }
                layers.push(item);
            }
            for (const item in this.stepThree.health) {
                if (this.stepThree.health[item] !== true) {
                    continue;
                }
                layers.push(item);
            }
            for (const item in this.stepThree.education) {
                if (this.stepThree.education[item] !== true) {
                    continue;
                }
                layers.push(item);
            }
            return layers;
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
        ]),

        convert (name) {
            return convertLayerName(name);
        }
    }
};
</script>

<template lang="html">
    <div>
        <p>Sie erhalten eine Kartendarstellung die ein räumliches Versorgungsniveau der von Ihnen gewählten Einstelungen wiedergibt.</p>
        <p>Entsprechend der ausgewählten relevanten Infrastrukturen, erhalten Sie für jede dieser Infrastrukturen einen aktivierbaren Kartenlayer der die Erreichbarkeiten entsprechend der hinterlegten Entfernungszonen darstellt. Sie können diese für eine detaillierte Analyse über die Drop-Down-Liste einzeln auswählen.</p>

        <div v-if="stepEight.status === 'unfinished'">
            <div
                id="Infotext8_1"
                class="callout"
            >
                Bitte starten Sie die Berechnung um die Ergebnisse zu erhalten.
            </div>
        </div>

        <div v-if="stepEight.status === 'running'">
            <div class="d-flex justify-content-center">
                <div
                    class="spinner-border"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div
                id="Infotext8_2"
                class="callout"
            >
                Das Ergebnis steht in Kürze bereit...
            </div>
        </div>

        <div v-if="stepEight.status === 'finished'">
            <div class="btn-group">
                <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                >
                    {{ convert(selected_layer) }}
                </button>
                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        class="bi bi-caret-down-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </button>
                <ul class="dropdown-menu">
                    <li
                        v-for="layer in checkedLayers"
                        :key="layer"
                    >
                        <a
                            class="dropdown-item"
                            href="#"
                            @click="selected_layer = layer"
                        >{{ convert(layer) }}</a>
                    </li>
                </ul>
            </div>
            <br>
            <br>
            <p>Die jeweilige Darstellungen lässt sich weiterhin über die ausgewählten Bevölkerungsgruppen gewichten und/ oder als Heatmapkarte darstellen.</p>
            <p>Kartenfenster ergänzen um:</p>

            <BootstrapCheckbox
                id="Checkbox8_1"
                text="Bevölkerungsgewichtete Darstellung"
            />
            <BootstrapCheckbox
                id="Checkbox8_2"
                text="Heatmap Darstellung"
            />
        </div>
        <br>

        <BootstrapAccordion
            id="Accordion_8"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                id="Accordion8_1"
                text="Methodische Erläuterungen"
            >
                <BootstrapAccordion
                    id="Accordion_8_1"
                    body-padding-y="5px"
                >
                    <BootstrapAccordionItem
                        id="Accordion8_1_1"
                        text="allgemeine Methodische Erläuterungen"
                    >
                        <p>Platzhalter für allgemeine methodische Erläuterungen und Abbildungen zur Multikriteriellen Analyse in Bezug auf die Schritte 1-7</p>
                    </BootstrapAccordionItem>

                    <BootstrapAccordionItem
                        id="Accordion8_1_2"
                        text="Erläuterungen zur Bevölkerungsgewichtung"
                    >
                        <p>Platzhalter für methodische Erläuterungen zur Berücksichtigung der Bevölkerung.</p>
                    </BootstrapAccordionItem>

                    <BootstrapAccordionItem
                        id="Accordion8_1_3"
                        text="Erläuterungen zur Darstellungsweise Heatmap"
                    >
                        <p>Platzhalter zur Darstellung und Interpretation der Heatmap.</p>
                    </BootstrapAccordionItem>

                    <BootstrapAccordionItem
                        id="Accordion8_1_4"
                        text="Formelsammlung"
                    >
                        <p>Formeln, die zur Berechnung angewendet werden und auf die in den obigen Akkordeons verwiesen wird.Die Formeln werden an einer Stelle gesammelt, damit die obigen Akkordeons für den Großteil der Adressaten flüssiger lesbar ist,  wenn die Herleitung und textliche Beschreibung nicht allzu mathematisch erfolgt. Auf die Formeln wird im Text verwiesen.</p>
                    </BootstrapAccordionItem>
                </BootstrapAccordion>
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
