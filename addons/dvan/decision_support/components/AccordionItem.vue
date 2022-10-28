<script>

export default {
    name: "AccordionItem",
    components: {
    },
    props: [
        "title",
        "opened",
        "status",
    ],
    emits: [
        "click"
    ],
    data() {
        return {
            buttonClasses: [],
            contentClasses: [],
            height: null,
            collapsing: false,
        }
    },
    computed: {
        buttonStyle() {
            if (this.status === "deactivated") {
                return { 'background-color': "rgba(220,220,220,0.3)" };
            }
            if (this.status === "valid") {
                return { 'background-color': 'rgba(144,228,144,0.3)' };
            }
            if (this.status === "invalid") {
                return { 'background-color': "rgba(255,0,0,0.3)" };
            }
            return {};
        },
        contentStyle() {
            if (this.height !== null) {
                return `height: ${this.height}px;`
            }
            return ''
        }
    },
    watch: {
        async opened(newVal, oldVal) {
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            if (newVal === true) {
                this.buttonClasses = ['accordion-button']
            }
            else {
                this.buttonClasses = ['accordion-button', 'collapsed']
            }
            this.contentClasses = ['accordion-collapse', 'collapsing']
            if (newVal == false) 
            this.height = newVal == false ? this.$refs.content.scrollHeight : null
            this.collapsing = true
            await sleep(5)
            this.height = newVal == true ? this.$refs.content.scrollHeight : null
            await sleep(200)
            this.collapsing = false
            if (newVal === true) {
                this.contentClasses = ['accordion-collapse', 'collapse', 'show']
            }
            else {
                this.contentClasses = ['accordion-collapse', 'collapse']
            }
        }
    },
    mounted() {
        if (this.opened) {
            this.buttonClasses = ['accordion-button']
            this.contentClasses = ['accordion-collapse', 'collapse', 'show']
        }
        else {
            this.buttonClasses = ['accordion-button', 'collapsed']
            this.contentClasses = ['accordion-collapse', 'collapse']
        }
    },
    methods: {
        buttonClick() {
            if (this.collapsing) return
            this.$emit('click');
        }
    }
};
</script>

<template lang="html">
    <div class="accordion-item">
        <h2
            class="accordion-header"
            @click="buttonClick()"
        >
            <button
                ref="button"
                :class="buttonClasses"
                type="button"
                :style="buttonStyle"
                :disabled="status==='deactivated'"
            >
                {{ title }}
            </button>
        </h2>
        <div
            ref="content"
            :class="contentClasses"
            :style="contentStyle"
        >
            <div class="accordion-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.collapsing {
    transition-property: height;
    transition-duration: 0.2s;
}
</style>
