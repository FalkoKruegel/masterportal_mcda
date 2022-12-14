<script>
import {translateKeyWithPlausibilityCheck} from "../../../../utils/translateKeyWithPlausibilityCheck.js";

export default {
    name: "LayerItem",
    props: {
        layer: {
            type: Object,
            required: true,
            default: () => {
                return {};
            }
        },
        multiLayerSelector: {
            type: Boolean,
            required: false,
            default: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        changedSelectedLayers: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data () {
        return {
            selected: false
        };
    },
    mounted () {
        if (this.changedSelectedLayers.length) {
            this.changedSelectedLayers.forEach(layer => {
                if (layer.filterId === this.layer.filterId) {
                    this.updateSelectedLayers(this.layer.filterId);
                    this.selected = true;
                }
            });
        }

        if (this.layer.active && !this.changedSelectedLayers.length) {
            this.updateSelectedLayers(this.layer.filterId);
        }
    },
    methods: {
        /**
         * Updates selectedLayers array.
         * @param {String} filterId id which should be removed or added to selectedLayers array
         * @returns {void}
         */
        updateSelectedLayers (filterId) {
            this.$emit("updatetoselectedlayers", filterId);
            this.selected = !this.selected;
        },
        translateKeyWithPlausibilityCheck
    }
};
</script>

<template>
    <div
        :class="['panel-heading', disabled ? 'disabled' : '']"
        role="tab"
    >
        <h2
            :class="['panel-title', disabled ? 'disabled' : '']"
            @click="updateSelectedLayers(layer.filterId)"
            @keydown.enter="updateSelectedLayers(layer.filterId)"
        >
            <a
                :disabled="disabled"
                role="button"
                data-toggle="collapse"
                data-parent="#accordion"
                tabindex="0"
            >
                {{ layer.title ? layer.title : layer.layerId }}
                <span
                    v-if="!selected"
                    class="bi bi-chevron-down float-end"
                />
                <span
                    v-else
                    class="bi bi-chevron-up float-end"
                />
            </a>
        </h2>
        <div
            v-if="layer.shortDescription && !selected"
            class="layerInfoText"
        >
            {{ translateKeyWithPlausibilityCheck(layer.shortDescription, key => $t(key)) }}
        </div>
        <slot
            :layer="layer"
        />
    </div>
</template>

<style lang="scss" scoped>
    @import "~variables";
    .panel-default > .panel-heading {
        cursor:default;
        background-color: $white;
    }
    .panel-default > .panel-heading.disabled {
        background-color: $light_grey;
    }
    .panel-title {
        cursor: pointer;
    }
</style>
