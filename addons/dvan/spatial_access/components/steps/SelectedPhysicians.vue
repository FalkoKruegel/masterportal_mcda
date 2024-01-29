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
                this.stepTwo.physicianGroup = "unselected";
                if (!["unselected", "niedersachsen", "kv_bezirk"].includes(this.stepTwo.planningArea)) {
                    this.stepTwo.planningArea = "unselected";
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
        ]),

        /**
         * Function from populationRequest addon (original Masterportal)
         * translates the given key, checks if the key exists and throws a console warning if not
         * @param {String} key the key to translate
         * @param {Object} [options=null] for interpolation, formating and plurals
         * @returns {String} the translation or the key itself on error
         */
        translate (key, options = null) {
            // creating completed key. This improves readability in template
            const completeKey = "additional:modules.tools.spatialAccess." + key;

            if (completeKey === "additional:" + this.$t(completeKey)) {
                console.warn("the key " + JSON.stringify(completeKey) + " is unknown to the additional translation");
            }
            return this.$t(completeKey, options);
        }
    }
};
</script>

<template lang="html">
    <div>
        <div>
            <p>{{ translate('stepTwo.text.text1') }}</p>
            <BootstrapCheckbox
                v-for="(item, name, index) in stepTwo.supplyLevels"
                :id="`Checkbox_2_${index}`"
                :key="index"
                :text="translate(item['text'])"
                :value="stepTwo.supplyLevel === name"
                :disabled="stepTwo.supplyLevel !== name && stepTwo.supplyLevel !== ''"
                @input="e => e ? stepTwo.supplyLevel = name : stepTwo.supplyLevel = ''"
            />
            <p />
        </div>
        <div>
            <p>{{ translate('stepTwo.text.text2') }}</p>
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
                        value="unselected"
                    >
                        {{ translate('stepTwo.unselected') }}
                    </option>
                    <option
                        v-for="(item, name, index) in stepTwo.physicianGroups[stepTwo.supplyLevel]"
                        :key="index"
                        :value="name"
                    >
                        {{ translate(item["text"]) }}
                    </option>
                </select>
                <p />
            </div>
            <div>
                <p>{{ translate('stepTwo.text.text3') }}</p>
                <select
                    id="Dropdown2_2"
                    v-model="stepTwo.planningArea"
                    class="form-select"
                    aria-label="DropdownArea"
                >
                    <option
                        selected
                        value="unselected"
                    >
                        {{ translate('stepTwo.unselected') }}
                    </option>
                    <option
                        v-for="(item, name, index) in stepTwo.planningAreas[stepTwo.supplyLevel]"
                        :key="index"
                        :value="name"
                    >
                        {{ translate(item["text"]) }}
                    </option>
                </select>
                <p />
                <div
                    v-if="!(stepTwo.planningArea==='unselected') & !(stepTwo.planningArea==='kv_bezirk') & !(stepTwo.planningArea==='niedersachsen')"
                    id="Callout2_1"
                    class="callout"
                >
                    {{ translate('stepTwo.callout.callout1') }}
                </div>
                <div
                    v-if="stepTwo.planningArea==='niedersachsen' || stepTwo.planningArea==='kv_bezirk'"
                    id="Callout2_2"
                    class="callout callout-warn"
                >
                    {{ translate('stepTwo.callout.callout2') }}
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
