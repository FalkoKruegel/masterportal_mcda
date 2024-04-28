
<script>

export default {
    name: "BootstrapToggleButton",
    components: {
    },
    props: {
        // variable binding for v-model
        "value": {
            type: Boolean,
            default: false
        },
        // unique id
        "id": {
            type: String,
            default: ""
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
    <div>
        <button
            :id="id"
            type="button"
            :class="{'btn': true, 'btn-sm': true, 'btn-primary': value, 'btn-secondary': !value}"
            :disabled="disabled"
            @click="e => $emit('input', !value)"
        >
            <slot />
        </button>
    </div>
</template>

<style lang="scss" scoped>

</style>
