<script>

export default {
    name: "BootstrapMultiSelect",
    components: {
    },
    props: {
        "value": {
            type: Array,
            default () {
                return [];
            }
        },
        // text shown if none selected
        "defaultText": {
            type: String,
            default: ""
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
        "input"
    ],
    data () {
        return {
            checkIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>`
        };
    },
    computed: {
        selectedCount () {
            return this.$props.value.filter(v => v.selected).length;
        },

        selectedValues () {
            return this.$props.value.filter(x => x.selected);
        }
    },
    methods: {
    }
};
</script>

<template lang="html">
    <div class="form-floating">
        <button
            class="btn btn-secondary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
            :disabled="disabled"
        >
            <span v-if="selectedCount === 0">{{ defaultText }}</span>
            <div
                v-for="item in selectedValues"
                :key="item.label"
                class="button-tag"
            >
                <span class="badge rounded-pill text-bg-primary">{{ item.label }}</span>
            </div>
            <span
                class="icon"
                v-html="checkIcon"
            />
        </button>
        <ul class="dropdown-menu">
            <li
                v-for="item in value"
                :key="item.label"
            >
                <div class="body-checkbox">
                    <div class="form-check">
                        <input
                            :id="item.label + '_id'"
                            :checked="item.selected"
                            class="form-check-input"
                            type="checkbox"
                            @input="e => { item.selected = e.target.checked; $emit('input', value); }"
                        >
                        <label
                            class="form-check-label"
                            :for="item.label + '_id'"
                        >
                            {{ item.label }}
                        </label>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.badge {
    --bs-badge-margin-x: 5px;
    font-size: .75rem;
    font-weight: 100;
}

.btn-secondary {
    --bs-btn-padding-y: .25rem;
    --bs-btn-padding-x: .25rem;
    --bs-btn-font-size: .75rem;
}

.button-tag {
    display: inline;
    margin: 0px 2px;
}

.body-checkbox {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
}

.form-check {
    width: 100%;
}
.form-check-label {
    width: 100%;
}
</style>
