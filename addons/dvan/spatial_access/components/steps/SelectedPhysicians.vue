<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectedPhysicians",
    components: {
        BootstrapCheckbox
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/SpatialAccess", Object.keys(getters))
    },
    watch: {
        "stepTwo.supplyLevel": function () {
            if (this.stepTwo.supplyLevel === "") {
                this.stepTwo.physicianGroup = "Bitte wählen...";
                if (!["Bitte wählen...", "Niedersachsen", "KV-Bezirk"].includes(this.stepTwo.planningArea)) {
                    this.stepTwo.planningArea = "Bitte wählen...";
                }
            }
        }
    },
    methods: {
        ...mapActions("Tools/SpatialAccess", [
            "initialize"
        ]),
        ...mapMutations("Tools/SpatialAccess", [
            "setActive"
        ])
    }
};
</script>

<template lang="html">
    <div>
        <div>
            <p>Bitte wählen Sie eine Versorgungsebene aus:</p>
            <BootstrapCheckbox
                v-for="(item, name, index) in stepTwo.supplyLevels"
                :id="`Checkbox_2_${index}`"
                :key="index"
                :text="item['text']"
                :value="stepTwo.supplyLevel === name"
                :disabled="stepTwo.supplyLevel !== name && stepTwo.supplyLevel !== ''"
                @input="e => e ? stepTwo.supplyLevel = name : stepTwo.supplyLevel = ''"
            />
            <p />
        </div>
        <div>
            <p>Bitte wählen Sie eine Facharztgruppe aus:</p>
            <div>
                <select
                    id="Dropdown2_1"
                    v-model="stepTwo.physicianGroup"
                    class="form-select"
                    aria-label="DropdownPhysicians"
                    :disabled="stepTwo.supplyLevel === ''"
                >
                    <option
                        selected
                        value="Bitte wählen..."
                    >
                        Bitte wählen...
                    </option>
                    <option
                        v-for="(item, name, index) in stepTwo.physicianGroups[stepTwo.supplyLevel]"
                        :key="index"
                        :value="name"
                    >
                        {{ item["text"] }}
                    </option>
                </select>
                <p />
            </div>
            <div>
                <p>Bitte wählen Sie einen Planungsbereich aus:</p>
                <select
                    id="Dropdown2_2"
                    v-model="stepTwo.planningArea"
                    class="form-select"
                    aria-label="DropdownArea"
                >
                    <option selected>
                        Bitte wählen...
                    </option>
                    <option
                        v-for="(item, name, index) in stepTwo.planningAreas[stepTwo.supplyLevel]"
                        :key="index"
                        :value="name"
                    >
                        {{ item["text"] }}
                    </option>
                    <option
                        value="Niedersachsen"
                    >
                        Niedersachsen
                    </option>
                    <option
                        value="KV-Bezirk"
                    >
                        KV-Bezirk
                    </option>
                </select>
                <p />
                <div
                    v-if="!(stepTwo.planningArea==='Bitte wählen...') & !(stepTwo.planningArea==='KV-Bezirk') & !(stepTwo.planningArea==='Niedersachsen')"
                    id="Callout2_1"
                    class="callout"
                >
                    Neben dem von Ihnen ausgewählten Planugsbereich werden für eine verbesserte Interpretation von Mitversorgungseffekten die benachbarten Planungsbereiche in die Analyse und Darstellung einbezogen.
                </div>
                <div
                    v-if="stepTwo.planningArea==='Niedersachsen' || stepTwo.planningArea==='KV-Bezirk'"
                    id="Callout2_2"
                    class="callout callout-warn"
                >
                    Sie haben sich für eine landesweite Analyse entschieden. Durch die hohen Anforderungen an die Berechnung werden alle weiteren Parameter voreingestellt und sind nicht änderbar. Sie können die Einstellungen in den folgenden Schritten einsehen und anschließend in Schritt 5 auf  "Analyse starten" klicken.
                </div>
            </div>
        </div>
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
.callout-warn {
    --bd-callout-bg: rgba(255,0,0,0.3);
    --bd-callout-border: rgb(100,0,0,0.3);
}
</style>
