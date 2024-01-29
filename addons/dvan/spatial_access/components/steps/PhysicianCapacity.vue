<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "PhysicianCapacity",
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
            <p>
                {{ translate('stepThree.text.text1') }}
            </p>
            <BootstrapCheckbox
                v-for="(item, name, index) in stepThree.availabilityOptions"
                :id="`Checkbox_3_${index}`"
                :key="index"
                :text="translate(item['text'])"
                :value="stepThree.physicianAvailability === name"
                :disabled="stepThree.physicianAvailability !== name && stepThree.physicianAvailability !== ''"
                @input="e => e ? stepThree.physicianAvailability = name : stepThree.physicianAvailability = ''"
            />
            <p />
        </div>
        <div>
            <div
                v-if="stepThree.physicianAvailability === 'facility'"
                id="Callout3_1"
                class="callout"
            >
                <p>
                    <b>
                        {{ translate('stepThree.callout.callout1_1') }}
                    </b>
                </p>
                <p>
                    {{ translate('stepThree.callout.callout1_2') }}
                </p>
            </div>
            <div
                v-if="stepThree.physicianAvailability === 'physicianNumber'"
                id="Callout3_2"
                class="callout"
            >
                <p>
                    <b>
                        {{ translate('stepThree.callout.callout2_1') }}
                    </b>
                </p>
                <p>
                    {{ translate('stepThree.callout.callout2_2') }}
                </p>
            </div>
            <div
                v-if="stepThree.physicianAvailability === 'employmentVolume'"
                id="Callout3_3"
                class="callout"
            >
                <p>
                    <b>
                        {{ translate('stepThree.callout.callout3_1') }}
                    </b>
                </p>
                <p>
                    {{ translate('stepThree.callout.callout3_2') }}
                </p>
            </div>
            <div
                v-if="stepThree.physicianAvailability === 'demandLimit'"
                id="Callout3_4"
                class="callout callout-warn"
            >
                <p>
                    <b>
                        {{ translate('stepThree.callout.callout4_1') }}
                    </b>
                </p>
                <p>
                    {{ translate('stepThree.callout.callout4_2') }}
                </p>
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
