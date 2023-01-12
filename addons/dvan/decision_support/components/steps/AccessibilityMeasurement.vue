<script>
import {mapActions, mapMutations} from "vuex";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";

export default {
    name: "AccessibilityMeasurement",
    components: {
        BootstrapAccordion,
        BootstrapAccordionItem
    },
    data () {
        return {
        };
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
        <p>Werden entsprechende Grenzwerte erreicht, kann von einer Unterversorgung ausgegangen werden. Ebenso steigt die Versorgungsqualität je geringer die Reisewege vom Wohnstandort zur Infrastruktur ist. Zu den ausgewählten Infrastrukturen sind bereits empfohlene Werte hinterlegt. Sie gelten für die Erreichbarkeit über PKW. Für bedarfsgrechte Simulationen können die voreingestellten Reisezeiten angepasst werden. </p>
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
            <p>Wenn die Reisezeit vom Nachfrageort zur Infrastruktur den Schwellwert der mangelhaften Versorgungslage übersteigt, erfolgt keine Versorgung des Nachfrageortes durch die Infrastruktur. </p>
        </BootstrapAccordionItem>
        <BootstrapAccordionItem
            id="Accordion5_2"
            text="Transportmittel"
            :status="true"
        >
            <div class="container text-center">
                <div class="btn-group" role="group" aria-label="Transportmittel">
                    <input type="radio" class="btn-check" name="options" id="PKW" autocomplete="off">
                    <label class="btn btn-outline-primary" for="PKW">PKW</label>
                    <input type="radio" class="btn-check" name="options" id="ÖPNV" autocomplete="off">
                    <label class="btn btn-outline-primary" for="ÖPNV">ÖPNV</label>
                    <input type="radio" class="btn-check" name="options" id="Fuß" autocomplete="off">
                    <label class="btn btn-outline-primary" for="Fuß">Fuß</label>
                </div>
            </div>
        </BootstrapAccordionItem>
        <BootstrapAccordionItem
            id="Accordion5_3"
            text="Schwellwerte Nahversorgung"
            :status="true"
        >
            <BootstrapAccordion
                id="Accordion5_3"
                body-padding-y="5px"
            >
                <BootstrapAccordionItem
                    id="Accordion5_3_1"
                    text="Schwellwerte Supermärkte"
                    :status="true"
                >
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion5_3_2"
                    text="Schwellwerte Discounter"
                    :status="true"
                >
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion5_3_3"
                    text="Schwellwerte sonstige Lebensmittelgeschäfte"
                    :status="true"
                >
                </BootstrapAccordionItem>
            </BootstrapAccordion>
        </BootstrapAccordionItem>
        <BootstrapAccordionItem
            id="Accordion5_4"
            text="Schwellwerte Gesundheit"
            :status="true"
        >
            <BootstrapAccordion
                id="Accordion5_4"
                body-padding-y="5px"
            >
                <BootstrapAccordionItem
                    id="Accordion5_4_1"
                    text="Schwellwerte Apotheken"
                    :status="true"
                >
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion5_4_2"
                    text="Schwellwerte Hochschulkliniken und Plankrankenhäuser"
                    :status="true"
                >
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion5_4_3"
                    text="Schwellwerte [VALUE]"
                    :status="true"
                >
                </BootstrapAccordionItem>
            </BootstrapAccordion>
        </BootstrapAccordionItem>
        <BootstrapAccordionItem
            id="Accordion5_5"
            text="Schwellwerte Bildung"
            :status="true"
        >
            <BootstrapAccordion
                id="Accordion5_5"
                body-padding-y="5px"
            >
                <BootstrapAccordionItem
                    id="Accordion5_5_1"
                    text="Schwellwerte Kindertagesstätten"
                    :status="true"
                >
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion5_5_2"
                    text="Schwellwerte Primarschulen"
                    :status="true"
                >
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion5_5_3"
                    text="Schwellwerte Sekundarschulen Bereich I und II, ohne (Fach)Hochschulreife"
                    :status="true"
                >
                </BootstrapAccordionItem>
                <BootstrapAccordionItem
                    id="Accordion5_5_4"
                    text="Schwellwerte Sekundarschulen Bereich I und II, mit (Fach)Hochschulreife"
                    :status="true"
                >
                </BootstrapAccordionItem>
            </BootstrapAccordion>
        </BootstrapAccordionItem>
    </BootstrapAccordion>
    </div>
</template>