<script>
import axios from "axios";

export default {
    name: "ApiAccess",
    data () {
        return {
            responseData: null,
            addressInput: "",
            errorMessage: null
        };
    },
    methods: {

        // method uses axios library to fetch data from nominatim api
        fetchData () {
            axios.get(this.createURL(this.addressInput))
                .then(response => {
                    this.responseData = response.data;
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
            const url = "https://nominatim.openstreetmap.org/search?q=" + urlSearch + "&format=json&addressdetails=1&limit=1";

            return url;
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
            <div
                class="mb-3"
            >
                <label
                    for="addressInput"
                    class="form-label"
                >
                    Suche nach Adresse oder Ort
                </label>
                <input
                    id="addressInput"
                    v-model="addressInput"
                    type="text"
                    class="form-control"
                >
            </div>
            <div>
                <button
                    type="submit"
                    class="btn btn-outline-primary btn-sm"
                >
                    Suchen
                </button>
            </div>
            <p />
        </form>
        <div>
            <p
                v-if="responseData !== null"
            >
                Name: {{ responseData[0].display_name }}
            </p>
            <p
                v-if="responseData !== null"
            >
                Längengrad: {{ responseData[0].lon }}
            </p>
            <p
                v-if="responseData !== null"
            >
                Breitengrad: {{ responseData[0].lat }}
            </p>
        </div>
        <p />
    </div>
</template>
