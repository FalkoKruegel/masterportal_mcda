
<script>
import ToolTemplate from "/src/modules/tools/ToolTemplate.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../store/getters";
import ApiAccess from "./ApiAccess.vue";

export default {
    name: "AccessibilitiesLgln",
    components: {
        ToolTemplate,
        ApiAccess
    },
    computed: {
        ...mapGetters("Tools/AccessibilitiesLgln", Object.keys(getters))
    },
    created () {
        this.$on("close", this.close);
    },
    /**
     * Put initialize here if mounting occurs after config parsing
     * @returns {void}
     */
    mounted () {
        this.initialize();
        if (this.isActive) {
            this.setActive(true);
        }
    },
    methods: {
        ...mapActions("Tools/AccessibilitiesLgln", [
            "initialize"
        ]),
        ...mapMutations("Tools/AccessibilitiesLgln", [
            "setActive"
        ]),

        /**
         * Closes this tool window by setting active to false
         * @returns {void}
         */
        close () {
            this.setActive(false);

            // TODO replace trigger when Menu is migrated
            // set the backbone model to active false for changing CSS class in menu (menu/desktop/tool/view.toggleIsActiveClass)
            // else the menu-entry for this tool is always highlighted
            const model = Radio.request("ModelList", "getModelByAttributes", {id: this.$store.state.Tools.AccessibilitiesLgln.id});

            if (model) {
                model.set("isActive", false);
            }
        }
    }
};
</script>

<template lang="html">
    <ToolTemplate
        :title="'Tool für Erreichbarkeiten'"
        :icon="icon"
        :active="active"
        :render-to-window="renderToWindow"
        :resizable-window="resizableWindow"
        :deactivate-gfi="deactivateGFI"
    >
        <template #toolBody>
            <div
                v-if="active"
                id="vue-addon"
            >
                {{ "Hier kann das Erreichbarkeiten-Tool des LGLN untergebracht werden." }}
            </div>
            <div>
                <ApiAccess />
            </div>
        </template>
    </ToolTemplate>
</template>

<style lang="scss" scoped>

</style>
