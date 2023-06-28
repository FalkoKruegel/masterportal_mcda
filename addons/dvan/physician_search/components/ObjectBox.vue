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
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">
                {{ title }} {{ name }} {{ surname }}
            </h4>
            <p>
                {{ physicianType }}
            </p>
            <div class="row">
                <div class="col-md-6">
                    <p class="card-text">
                        {{ postalCode }} {{ city }}
                    </p>
                    <p class="card-text">
                        {{ street }} {{ streetNumber }}
                    </p>
                </div>
                <div class="col-md-6">
                    <p>Entfernung: {{ distance }} km</p>
                </div>
            </div>
        </div>
    </div>
</template>

  <style scoped>
  .card {
    margin-bottom: 15px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 4px;
  }

  .card-body {
    padding: 15px;
  }

  .card-title {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .card-text {
    margin-bottom: 0;
  }
  </style>

