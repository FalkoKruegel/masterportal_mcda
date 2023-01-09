
<script>

export default {
    name: "BootstrapAccordionItem",
    components: {
    },
    props: {
        // unique id
        "id": {
            type: String,
            default: ""
        },
        // accordion id
        "parentId": {
            type: String,
            default: "None"
        },
        // accordion header text
        "text": {
            type: String,
            default: ""
        }
    },
    emits: [
    ],
    methods: {
    }
};
</script>

<template lang="html">
    <div class="accordion-item">
        <h2
            :id="id + 'header'"
            class="accordion-header"
        >
            <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#' + id + 'content'"
                aria-expanded="false"
                :aria-controls="id + 'content'"
            >
                {{ text }}
            </button>
        </h2>
        <div
            :id="id + 'content'"
            class="accordion-collapse collapse"
            :aria-labelledby="id + 'header'"
            :data-bs-parent="'#' + parentId"
        >
            <div
                class="accordion-body"
            >
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
