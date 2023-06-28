<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import ObjectBox from "../ObjectBox.vue";
import physicianListData from "../../physicianListData.json";

export default {
    name: "ResultList",
    components: {
        ObjectBox
    },
    data () {
        return {
            selectedItemIndex: null,
            physicianList: physicianListData
        };
    },
    computed: {
        ...mapGetters("Tools/PhysicianSearch", Object.keys(getters))
    },
    methods: {
        ...mapActions("Tools/PhysicianSearch", [
            "initialize"
        ]),
        ...mapMutations("Tools/PhysicianSearch", [
            "setActive"
        ]),
        selectResult (index) {
            this.selectedItemIndex = index;
        }
    }
};
</script>

<template>
    <div>
        <p>Neben der Karte mit den Standorten können Sie untenstehend eine Ergebnisliste aller Ärzte, die den Suchkriterien und dem Suchgebiet entsprechen, einsehen.</p>
        <div class="list-container">
            <div class="scroll-container">
                <ul
                    class="list-group"
                >
                    <li
                        v-for="(item, index) in physicianList"
                        :key="index"
                        :class="{ 'list-group-item': true, 'list-group-item-action': true, 'active': selectedItemIndex === index }"
                        @click="selectResult(index)"
                        @keydown="selectResult(index)"
                    >
                        <ObjectBox
                            :title="item.title"
                            :surname="item.surname"
                            :name="item.name"
                            :postal-code="item.postalCode"
                            :city="item.city"
                            :street-number="item.streetNumber"
                            :street="item.street"
                            :physician-type="item.physicianType"
                            :distance="item.distance"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .list-group-item:hover{
        cursor: pointer;
        background-color: rgb(218, 206, 206);
    }

    .list-group-item.active {
        background-color: #007bff;
        border-color: #007bff;
        color: #fff;
    }
    .list-group-item.active .card {
        background-color: #ffffff;
        color: #000000;
}
    .list-container {
        height: 500px;
    }

    .scroll-container {
        height: 100%;
        overflow-y: scroll;
    }
</style>
