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
        ...mapActions("Tools/DecisionSupport", [
            "initialize"
        ]),
        ...mapMutations("Tools/DecisionSupport", [
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
         * translates the given key, checkes if the key exists and throws a console warning if not
         * @param {String} key the key to translate
         * @param {Object} [options=null] for interpolation, formating and plurals
         * @returns {String} the translation or the key itself on error
         */
        translate (key, options = null) {
            if (key === "additional:" + this.$t(key)) {
                console.warn("the key " + JSON.stringify(key) + " is unknown to the additional translation");
            }

            return this.$t(key, options);
        }
    }
};
</script>

<template lang="html">
    <div>
        <p>{{ translate('additional:modules.tools.decisionSupport.stepOne.text.textOne') }}</p>
        <p>{{ translate('additional:modules.tools.decisionSupport.stepOne.text.textTwo') }}</p>
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
                        {{ translate('additional:modules.tools.decisionSupport.stepOne.loadAnalysisSettings') }}
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
                        {{ translate('additional:modules.tools.decisionSupport.stepOne.startNewAnalysis') }}
                    </button>
                </div>
            </div>
        </div>
        <!--following div is an placeholder to remind that dialog for loading an older analysis has to be implemented in the future-->
        <div
            v-if="loadFailed"
            class="callout-warning"
        >
            {{ translate('additional:modules.tools.decisionSupport.stepOne.incorrectParameterFile') }}
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
