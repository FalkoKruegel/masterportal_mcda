<script>
import axios from "axios";

export default {
    name: "ApiAccess",
    data () {
        return {
            responseData: null,
            addressInput: "",
            errorMessage: null,
            showSuggestions: false,
            selectedItemIndex: null,
            showResult: false
        };
    },
    methods: {

        // method uses axios library to fetch data from nominatim api
        fetchData () {
            this.showResult = false;
            axios.get(this.createURL(this.addressInput))
                .then(response => {
                    this.responseData = response.data;
                })
                .catch(error => {
                    this.errorMessage = error;
                });
            this.showSuggestions = true;
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
            this.showResult = true;
        }
    }
};
</script>

<template lang="html">
    <div>
        <p />
        <form
            @submit.prevent="fetchData"
        >
            <div>
                <label
                    for="addressInput"
                    class="form-label"
                >
                    Suche nach Adresse oder Ort
                </label>
                <div class="input-group mb-3">
                    <input
                        id="addressInput"
                        v-model="addressInput"
                        type="text"
                        class="form-control"
                    >
                    <button
                        type="submit"
                        class="btn btn-outline-primary btn-sm"
                    >
                        Suchen
                    </button>
                </div>
            </div>
            <div>
                <ul
                    v-if="showSuggestions"
                    class="list-group"
                >
                    <li
                        v-for="(item, index) in responseData"
                        :key="index"
                        class="list-group-item"
                        @click="selectResult(index)"
                        @keydown="selectResult(index)"
                    >
                        {{ item.display_name }}
                    </li>
                </ul>
            </div>
            <p />
        </form>
        <div>
            <p
                v-if="showResult"
            >
                Name: {{ responseData[selectedItemIndex].display_name }}
            </p>
            <p
                v-if="showResult"
            >
                Längengrad: {{ responseData[selectedItemIndex].lon }}
            </p>
            <p
                v-if="showResult"
            >
                Breitengrad: {{ responseData[selectedItemIndex].lat }}
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.list-group-item:hover {
  color: #fff;
  background-color: #007bff;
}
.list-group-item {
  cursor: pointer;
}

</style>
