<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import ObjectBox from "../ObjectBox.vue";

export default {
    name: "ResultList",
    components: {
        ObjectBox
    },
    data () {
        return {
            selectedItemIndex: null,
            physicianList: [
                {
                    title: "Dr. med.",
                    surname: "Müller",
                    name: "Julia",
                    postalCode: "10115",
                    city: "Berlin",
                    streetNumber: "42",
                    street: "Friedrichstraße",
                    physicianType: "Allgemeinmedizin",
                    distance: 2
                },
                {
                    title: "Dr. med.",
                    surname: "Schmidt",
                    name: "Max",
                    postalCode: "50667",
                    city: "Köln",
                    streetNumber: "12",
                    street: "Hohe Straße",
                    physicianType: "Innere Medizin",
                    distance: 3
                },
                {
                    title: "Dr. med.",
                    surname: "Weber",
                    name: "Anna",
                    postalCode: "80331",
                    city: "München",
                    streetNumber: "8",
                    street: "Marienplatz",
                    physicianType: "Pädiatrie",
                    distance: 4
                },
                {
                    title: "Dr. med.",
                    surname: "Klein",
                    name: "Hans",
                    postalCode: "10179",
                    city: "Berlin",
                    streetNumber: "7",
                    street: "Alexanderplatz",
                    physicianType: "Augenheilkunde",
                    distance: 5
                },
                {
                    title: "Dr. med.",
                    surname: "Schneider",
                    name: "Sabine",
                    postalCode: "70173",
                    city: "Stuttgart",
                    streetNumber: "18",
                    street: "Königstraße",
                    physicianType: "Hals-Nasen-Ohren-Heilkunde",
                    distance: 6
                },
                {
                    title: "Dr. med.",
                    surname: "Fischer",
                    name: "Markus",
                    postalCode: "20095",
                    city: "Hamburg",
                    streetNumber: "1",
                    street: "Jungfernstieg",
                    physicianType: "Dermatologie",
                    distance: 8
                },
                {
                    title: "Dr. med.",
                    surname: "Köhler",
                    name: "Anke",
                    postalCode: "10117",
                    city: "Berlin",
                    streetNumber: "14",
                    street: "Friedrichstraße",
                    physicianType: "Psychiatrie",
                    distance: 10
                }
            ]
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
        <p>Neben der Karte mit den Standorten können Sie untenstehend eine Ergebnisliste aller Ärzte sehen, die den Suchkriterien und dem Suchgebiet entsprechen einsehen.</p>
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
    .list-container {
        height: 500px;
    }

    .scroll-container {
        height: 100%;
        overflow-y: scroll;
    }
</style>
