<script>

export default {
    name: "BootstrapSelect",
    components: {
    },
    props: {
        "values": {
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
        "convert": {
            type: Function,
            default: (e) => e
        }
    },
    emits: [
        "input"
    ],
    data () {
        return {
            selected: null
        };
    },
    computed: {
        selectedName () {
            return this.selected === null ? this.defaultText : this.selected;
        }
    },
    methods: {
        select (val) {
            this.selected = val;
            this.$emit("input", val);
        }
    }
};
</script>

<template lang="html">
    <div class="btn-group">
        <button
            class="btn btn-outline-primary btn-sm"
            type="button"
        >
            {{ convert(selectedName) }}
        </button>
        <button
            type="button"
            class="btn btn-outline-primary btn-sm dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                class="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
            >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
        </button>
        <ul class="dropdown-menu">
            <li
                v-for="val in values"
                :key="val"
            >
                <a
                    class="dropdown-item"
                    href="#"
                    @click="select(val)"
                >{{ convert(val) }}</a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
</style>
