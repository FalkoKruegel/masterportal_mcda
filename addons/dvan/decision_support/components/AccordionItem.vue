<script>

/**
 * sleep function
 * @param {Number} ms number of milliseconds to sleep
 * @returns {Promise} void promise
 */
function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
    name: "AccordionItem",
    components: {
    },
    props: {
        "title": {
            type: String,
            default: ""
        },
        "opened": Boolean,
        "status": {
            type: String,
            default: ""
        },
        //indicate if current item is the first or the last one in a accordion-menu
        "firstItem": Boolean,
        "lastItem": Boolean
    },
    emits: [
        "click",
        "backClick",
        "forwardClick"
    ],
    data () {
        return {
            buttonClasses: [],
            contentClasses: [],
            height: null,
            collapsing: false
        };
    },
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
            return {};
        },
        contentStyle () {
            if (this.height !== null) {
                return `height: ${this.height}px;`;
            }
            return "";
        }
    },
    watch: {
        async opened (newVal) {
            if (newVal === true) {
                this.buttonClasses = ["accordion-button"];
            }
            else {
                this.buttonClasses = ["accordion-button", "collapsed"];
            }
            this.contentClasses = ["accordion-collapse", "collapsing"];
            this.height = newVal === false ? this.$refs.content.scrollHeight : null;
            this.collapsing = true;
            await sleep(5);
            this.height = newVal === true ? this.$refs.content.scrollHeight : null;
            await sleep(200);
            this.collapsing = false;
            if (newVal === true) {
                this.contentClasses = ["accordion-collapse", "collapse", "show"];
            }
            else {
                this.contentClasses = ["accordion-collapse", "collapse"];
            }
        }
    },
    mounted () {
        if (this.opened) {
            this.buttonClasses = ["accordion-button"];
            this.contentClasses = ["accordion-collapse", "collapse", "show"];
        }
        else {
            this.buttonClasses = ["accordion-button", "collapsed"];
            this.contentClasses = ["accordion-collapse", "collapse"];
        }
    },
    methods: {
        buttonClick () {
            if (this.collapsing) {
                return;
            }
            this.$emit("click");
        },
        //if back-Button is clicked, backClick will be emitted which should be handled in parent-Component
        backButton () {
            this.$emit("backClick");
        },
        //if forward-Button is clicked, forwardClick will be emitted which should be handled in parent-Component
        forwardButton () {
            this.$emit("forwardClick");
        }
    }
};
</script>

<template lang="html">
    <div class="accordion-item">
        <h2
            class="accordion-header"
        >
            <button
                ref="button"
                :class="buttonClasses"
                type="button"
                :style="buttonStyle"
                :disabled="status==='deactivated'"
                @click="buttonClick()"
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
                <slot />
            </div>
            <!--footer contains two buttons which emit forward and back events to navigate between different items-->
            <!--buttons are connected to firstItem and lastItem attribute to disable the buttons if necessary-->
            <footer>
                <div 
                    class="container"
                >
                    <div
                        class="row mb-2"
                    >
                        <div
                            class="col text-start"
                        >
                            <button 
                                type="button" 
                                class="btn btn-outline-primary btn-sm"
                                @click="backButton()"
                                :disabled="firstItem"
                            >
                                Zurück
                            </button>
                        </div>
                        <div
                            class="col text-end"
                        >
                            <button 
                                type="button" 
                                class="btn btn-outline-primary btn-sm"
                                @click="forwardButton()"
                                :disabled="lastItem"
                            >
                                Weiter
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.collapsing {
    transition-property: height;
    transition-duration: 0.2s;
}
</style>
