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
        fetchData () {
            axios.get(this.createURL(this.addressInput))
                .then(response => {
                    this.responseData = response.data;
                })
                .catch(error => {
                    this.errorMessage = error;
                });
        },
        createURL (searchRequest) {
            const indiceArray = [];

            for (let i = 0; i < searchRequest.length; i++) {
                if (searchRequest[i] === "," || searchRequest[i] === " ") {
                    indiceArray.push(i);
                }
            }

            let urlSearch = searchRequest;

            for (let i = 0; i < indiceArray.length; i++) {
                urlSearch = searchRequest.substring(0, indiceArray[i]) + "+" + searchRequest.substring(indiceArray[i], indiceArray[i + 1]);
            }

            const url = "https://nominatim.openstreetmap.org/search?q=" + urlSearch + "&format=json&addressdetails=1";

            return url;
        }
    }
};
</script>

<template lang="html">
    <div>
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
                    Suche nach Adresse
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
        </form>
        {{ responseData }}
    </div>
</template>
