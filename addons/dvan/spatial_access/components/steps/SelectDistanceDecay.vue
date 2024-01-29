<script>
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";
import BootstrapAccordion from "../../../share_components/accordion/BootstrapAccordion.vue";
import BootstrapAccordionItem from "../../../share_components/accordion/BootstrapAccordionItem.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SelectDistanceDecay",
    components: {
        BootstrapCheckbox,
        BootstrapAccordion,
        BootstrapAccordionItem
    },
    data () {
        return {};
    },
    computed: {
        ...mapGetters("Tools/SpatialAccess", Object.keys(getters))
    },
    methods: {
        ...mapActions("Tools/SpatialAccess", ["initialize"]),
        ...mapMutations("Tools/SpatialAccess", ["setActive"]),

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
        <BootstrapAccordion
            id="Accordion5"
            body-padding-y="5px"
        >
            <BootstrapAccordionItem
                id="Accordion5_1"
                parent-id="Accordion5"
                :text="translate('stepFive.headers.transport')"
                :status="stepFive.transport === '' ? 'default' : stepFive.travelModes[stepFive.transport]['valid'] ? 'valid' : 'invalid'"
            >
                <p>{{ translate('stepFive.text.text1') }}</p>
                <div class="container text-center">
                    <div
                        id="Buttonbar5_1"
                        class="btn-group"
                        role="group"
                        aria-label="Transportmittel"
                    >
                        <div
                            v-for="(item, name, index) in stepFive.travelModes"
                            :key="index"
                        >
                            <input
                                :id="`Button_5_1_${index}`"
                                v-model="stepFive.transport"
                                type="radio"
                                class="btn-check"
                                name="options"
                                :value="name"
                            >
                            <label
                                class="btn btn-outline-primary"
                                :for="`Button_5_1_${index}`"
                            >
                                {{ translate(item['text']) }}
                            </label>
                        </div>
                    </div>
                </div>
                <div
                    v-if="stepFive.transport === 'public-transit'"
                    id="Callout5_1"
                    class="callout-warning"
                >
                    <b>{{ translate('stepFive.text.text2') }}</b>
                    {{ translate('stepFive.text.text3') }}
                </div>
            </BootstrapAccordionItem>
            <BootstrapAccordionItem
                id="Accordion5_2"
                parent-id="Accordion5"
                :text="translate('stepFive.headers.decay')"
                :status="stepFive.distanceDecay !== '' ? 'valid' : 'default'"
            >
                <BootstrapCheckbox
                    v-for="(item, name, index) in stepFive.distanceDecays"
                    :id="`Checkbox5_2_${index}`"
                    :key="index"
                    :value="stepFive.distanceDecay === name"
                    :text="translate(item['text'])"
                    @input="e => e ? stepFive.distanceDecay = name : stepFive.distanceDecay = ''"
                />
                <div
                    v-if="stepFive.distanceDecay === 'linear'"
                    id="Callout5_2_1"
                    class="callout"
                >
                    <b>{{ translate('stepFive.callout.callout1') }}</b>
                    <br>
                    <div class="img-container">
                        <img
                            src="./images/Abgewichtung_linear.png"
                            alt=""
                        >
                    </div>
                </div>
                <div
                    v-if="stepFive.distanceDecay === 'patient_behavior'"
                    id="Callout5_2_2"
                    class="callout"
                >
                    <b>{{ translate('stepFive.callout.callout2_1') }}</b>
                    <br>
                    {{ translate('stepFive.callout.callout2_2') }}
                </div>
                <div
                    v-if="stepFive.distanceDecay === 'minimum_standards'"
                    id="Callout5_2_3"
                    class="callout"
                >
                    <b>{{ translate('stepFive.callout.callout3_1') }}</b>
                    <br>
                    {{ translate('stepFive.callout.callout3_2') }}
                </div>
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

.callout-warning {
  padding: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  background-color: rgba(var(--bs-danger-rgb), 0.075);
  border-left: 0.25rem solid
    var(--bd-callout-border, rgba(var(--bs-danger-rgb), 0.5));
}

.img-container {
  max-width: 400px;
  max-height: 100%;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>
