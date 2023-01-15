
<script>

export default {
    name: "BootstrapCheckbox",
    components: {
    },
    props: {
        // variable binding for v-model
        "value": {
            type: Boolean,
            default: false
        },
        // checkbox text
        "text": {
            type: String,
            default: ""
        },
        // unique id
        "id": {
            type: String,
            default: ""
        },
        // if set tooltip will be shown with String as HTML
        "tooltipText": {
            type: String,
            default: null
        },
        // true if checkbox disabled
        "disabled": {
            type: Boolean,
            default: false
        }
    },
    emits: [
        // variable binding for v-model
        "input"
    ],
    methods: {
    }
};
</script>

<template lang="html">
    <div
        class="form-check"
        :data-bs-toggle="tooltipText!==null ? 'tooltip' : null"
        :data-bs-placement="tooltipText!==null ? 'top' : null"
        :data-bs-html="tooltipText!==null ? 'true' : null"
        :title="tooltipText"
    >
        <input
            :id="id"
            :checked="value"
            class="form-check-input"
            type="checkbox"
            :disabled="disabled"
            @input="e => $emit('input', e.target.checked)"
        >
        <label
            class="form-check-label"
            :for="id"
        >
            {{ text }}
        </label>
    </div>
</template>

<style lang="scss" scoped>

</style>
