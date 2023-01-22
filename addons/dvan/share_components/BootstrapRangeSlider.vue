
<script>

export default {
    name: "BootstrapRangeSlider",
    components: {
    },
    props: {
        // variable binding for v-model
        "value": {
            type: Number,
            default: 0
        },
        // unique id
        "id": {
            type: String,
            default: ""
        },
        // true if slider disabled
        "disabled": {
            type: Boolean,
            default: false
        }
    },
    emits: [
        // variable binding for v-model
        "input"
    ],
    data () {
        return {
            showBubble: false
        };
    },
    methods: {
    }
};
</script>

<template lang="html">
    <div class="outer">
        <div
            class="speech-bubble"
            :style="{left: 'calc('+value/100+' * (100% - 1rem) - 0.2rem', opacity: showBubble ? 1 : 0}"
        >
            {{ value }}
        </div>
        <label
            :for="id"
            class="form-label"
        >
            <slot />
        </label>
        <input
            :id="id"
            :value="value"
            class="form-range"
            type="range"
            :disabled="disabled"
            @input="e => $emit('input', Number(e.target.value))"
            @mousedown="showBubble = true"
            @mouseup="showBubble = false"
        >
    </div>
</template>

<style lang="scss" scoped>
.outer {
    position: relative;
}

.speech-bubble {
    position: absolute;
    background: rgb(221, 224, 250);
    border-radius: .4em;
    width: 1.4rem;
    padding: 0px 0px 0px 0px;
    text-align: center;

    transition: opacity 0.5s;
}

.speech-bubble:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top-color: rgba(221, 224, 250);
    border-bottom: 0;
    margin-left: -4px;
    margin-bottom: -4px;
}
</style>
