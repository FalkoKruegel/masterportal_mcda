
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
        :style="{ '--bs-accordion-btn-padding-x': btnPaddingX, '--bs-accordion-btn-padding-y': btnPaddingY }"
    >
        <slot />
    </div>
</template>

<style lang="scss" scoped>
</style>
