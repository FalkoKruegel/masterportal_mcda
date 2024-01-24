<script>
import {mapActions, mapMutations} from "vuex";
import {loadToolParams} from "../../utils/tool_params/load_params";

export default {
    name: "StartAnalysis",
    emits: [
        // emitted events for buttons
        // there should be another one for loading older analysis
        "startAnalysis"
    ],
    data () {
        return {
            loadFailed: false
        };
    },
    methods: {
        ...mapActions("Tools/SpatialAccess", [
            "initialize"
        ]),
        ...mapMutations("Tools/SpatialAccess", [
            "setActive"
        ]),

        openAnalysis () {
            this.$refs.layerDialog.click();
        },
        openFile () {
            const files = this.$refs.layerDialog.files;
            const reader = new FileReader();

            reader.onloadend = () => {
                const obj = JSON.parse(reader.result);
                const suc = loadToolParams(obj);

                if (suc) {
                    this.$emit("startAnalysis");
                }
                else {
                    this.loadFailed = true;
                }
            };
            reader.readAsText(files[0]);
        },

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
        <p>{{ translate('stepOne.text.text1') }}</p>
        <p>{{ translate('stepOne.text.text2') }}</p>
        <!--container to adjust position of following buttons-->
        <div
            class="container"
        >
            <div
                class="row mb-2"
            >
                <div
                    class="col text-start"
                >
                    <!--in the future this button should emit an event which triggers a dialog to load older analysis-->
                    <button
                        id="button1_2"
                        type="button"
                        class="btn btn-outline-primary btn-lg"
                        @click="openAnalysis"
                    >
                        {{ translate('stepOne.loadAnalysisSettings') }}
                    </button>
                    <input
                        ref="layerDialog"
                        type="file"
                        style="display:none"
                        accept=".json"
                        @change="openFile"
                    >
                </div>
                <div
                    class="col text-end"
                >
                    <button
                        id="button1_1"
                        type="button"
                        class="btn btn-outline-primary btn-lg"
                        @click="$emit('startAnalysis')"
                    >
                        {{ translate('stepOne.startNewAnalysis') }}
                    </button>
                </div>
            </div>
        </div>
        <!--following div is an placeholder to remind that dialog for loading an older analysis has to be implemented in the future-->
        <div
            v-if="loadFailed"
            class="callout-warning"
        >
            {{ translate('stepOne.incorrectParameterFile') }}
        </div>
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
