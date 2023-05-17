<script>
export default {
    name: "ObjectBox",
    components: {
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        surname: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        postalCode: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        streetNumber: {
            type: String,
            default: ""
        },
        street: {
            type: String,
            default: ""
        },
        physicianType: {
            type: String,
            default: ""
        },
        distance: {
            type: Number,
            default: 0
        }
    }
};
</script>

<template>
    <div class="box">
        <p>{{ title }} {{ name }} {{ surname }}</p>
        <p>{{ street }} {{ streetNumber }}</p>
        <p>{{ city }} {{ postalCode }}</p>
        <p>{{ physicianType }}</p>
        <p>Entfernung: {{ distance }} km</p>
    </div>
</template>

<style scoped>

</style>
