
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
        },
        // status string: [valid, invalid, deactivated]
        "status": {
            type: String,
            default: "default"
        }
    },
    emits: [
    ],
    computed: {
        buttonStyle () {
            if (this.status === "deactivated") {
                return {"background-color": "rgba(220,220,220,0.3)"};
            }
            if (this.status === "valid") {
                return {"background-color": "rgba(144,228,144,0.3)"};
            }
            if (this.status === "invalid") {
                return {"background-color": "rgba(255,0,0,0.3)"};
            }
            return {"background-color": "rgba(206,211,247,0.3)"};
        }
    },
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
                class="accordion-button collapsed"
                :class="{'collapsed': status==='deactivated'}"
                type="button"
                :style="buttonStyle"
                :disabled="status==='deactivated'"
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
            :style="{'display': status==='deactivated' ? 'none' : null}"
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
