<script>
import axios from "axios";
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";

export default {
    name: "SetLocation",
    components: {
    },
    data () {
        return {
            responseData: null,
            addressInput: "",
            errorMessage: null,
            showSuggestions: false,
            selectedItemIndex: null
        };
    },
    computed: {
        ...mapGetters("Tools/PhysicianSearch", Object.keys(getters))
    },
    methods: {
        // method uses axios library to fetch data from nominatim api
        fetchData () {
            this.showResult = false;
            axios.get(this.createURL(this.addressInput))
                .then(response => {
                    this.responseData = response.data;
                    this.showSuggestions = true;
                })
                .catch(error => {
                    this.errorMessage = error;
                });
        },

        // method creates string with a url which can be used in the fetchData method
        createURL (searchRequest) {

            // array should contain indices of commas ans spaces in the user input string
            const indiceArray = [];

            // search for commas and spaces in user input string
            for (let i = 0; i < searchRequest.length; i++) {
                if (searchRequest[i] === "," || searchRequest[i] === " ") {
                    indiceArray.push(i);
                }
            }

            let urlSearch = searchRequest;

            // replace commas and spaces in input string
            for (let i = 0; i < indiceArray.length; i++) {
                urlSearch = searchRequest.substring(0, indiceArray[i]) + "+" + searchRequest.substring(indiceArray[i], indiceArray[i + 1]);
            }

            // construct url to use in fetchData method
            const url = "https://nominatim.openstreetmap.org/search?q=" + urlSearch + "&format=json&addressdetails=1&limit=5&countrycodes=de&viewbox=6.270117,51.250458,11.672207,54.182840&bounded=1";

            return url;
        },

        selectResult (index) {
            this.selectedItemIndex = index;
            this.stepOne.location.longitude = this.responseData[index].lon;
            this.stepOne.location.latitude = this.responseData[index].lat;
        },

        ...mapActions("Tools/PhysicianSearch", [
            "initialize"
        ]),
        ...mapMutations("Tools/PhysicianSearch", [
            "setActive"
        ])
    }
};
</script>

<template lang="html">
    <div>
        <form
            @submit.prevent="fetchData"
        >
            <div>
                <label
                    for="addressInput"
                    class="form-label"
                >
                    Suche nach Adresse, Ort oder Postleitzahl
                </label>
                <div class="input-group mb-3">
                    <input
                        id="addressInput"
                        v-model="addressInput"
                        type="text"
                        class="form-control"
                    >
                    <button
                        id="button1_1"
                        type="submit"
                        class="btn btn-outline-primary btn-sm"
                    >
                        Suchen
                    </button>
                </div>
            </div>
            <div
                v-if="showSuggestions"
            >
                <p>Wählen Sie Ihren Standort aus der Liste</p>
                <ul
                    class="list-group"
                >
                    <li
                        v-for="(item, index) in responseData"
                        :key="index"
                        :class="{ 'list-group-item': true, 'list-group-item-action': true, 'active': selectedItemIndex === index }"
                        @click="selectResult(index)"
                        @keydown="selectResult(index)"
                    >
                        {{ item.display_name }}
                    </li>
                </ul>
            </div>
            <p />
        </form>
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
</style>
