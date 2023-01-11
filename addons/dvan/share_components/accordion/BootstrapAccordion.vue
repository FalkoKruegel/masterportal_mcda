
<script>

export default {
    name: "BootstrapAccordion",
    components: {
    },
    props: {
        // unique id
        "id": {
            type: String,
            default: ""
        },
        // size of accordion buttons
        "btnPaddingX": {
            type: String,
            default: "10px"
        },
        "btnPaddingY": {
            type: String,
            default: "2px"
        },
        // padding to accordion content
        "bodyPaddingX": {
            type: String,
            default: "10px"
        },
        "bodyPaddingY": {
            type: String,
            default: "10px"
        }
    },
    emits: [
    ],
    methods: {
    }
};
</script>

<template lang="html">
    <div
        :id="id"
        class="accordion accordion-flush"
        :style="{ '--bs-accordion-btn-padding-x': btnPaddingX, '--bs-accordion-btn-padding-y': btnPaddingY, '--bs-accordion-body-padding-x': bodyPaddingX, '--bs-accordion-body-padding-y': bodyPaddingY }"
    >
        <slot />
    </div>
</template>

<style lang="scss" scoped>
</style>
