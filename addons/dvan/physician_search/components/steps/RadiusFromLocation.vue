<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import getters from "../../store/getters";
import BootstrapCheckbox from "../../../share_components/BootstrapCheckbox.vue";

export default {
    name: "RadiusFromLocation",
    components: {
        BootstrapCheckbox
    },
    data () {
        return {
        };
    },
    computed: {
        ...mapGetters("Tools/PhysicianSearch", Object.keys(getters))
    },
    watch: {
        "stepThree.distance.distanceActivated": function () {
            if (this.stepThree.distance.distanceActivated === false) {
                this.stepThree.distance.distanceSmallerThan = 0;
            }
        },
        "stepThree.time.timeActivated": function () {
            if (this.stepThree.time.timeActivated === false) {
                this.stepThree.time.timeSmallerThan = 0;
            }
        }
    },
    methods: {
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
        <p>Welche Entfernung oder welche Reisezeit vom Suchort sollte nicht überschritten werden?</p>
        <div
            class="row align-items-center"
        >
            <div
                class="col-7 text-start"
            >
                <BootstrapCheckbox
                    id="Checkbox3_1"
                    v-model="stepThree.distance.distanceActivated"
                    text="Entfernung kleiner als"
                    :disabled="stepThree.time.timeActivated"
                />
            </div>
            <div
                class="col-3 text-end"
            >
                <label
                    for="input3_1"
                    class="col-form-label"
                >
                    <input
                        id="input3_1"
                        v-model="stepThree.distance.distanceSmallerThan"
                        type="number"
                        step="1"
                        min="0"
                        max="100"
                        class="form-control"
                        :disabled="!stepThree.distance.distanceActivated"
                    >
                </label>
            </div>
            <div
                class="col text-start"
            >
                km
            </div>
        </div>
        <div
            class="row align-items-center"
        >
            <div
                class="col-7 text-start"
            >
                <BootstrapCheckbox
                    id="Checkbox3_2"
                    v-model="stepThree.time.timeActivated"
                    text="Reisezeit kleiner als"
                    :disabled="stepThree.distance.distanceActivated"
                />
            </div>
            <div
                class="col-3 text-end"
            >
                <label
                    for="input3_2"
                    class="col-form-label"
                >
                    <input
                        id="input3_2"
                        v-model="stepThree.time.timeSmallerThan"
                        type="number"
                        step="1"
                        min="0"
                        max="100"
                        class="form-control"
                        :disabled="!stepThree.time.timeActivated"
                    >
                </label>
            </div>
            <div
                class="col text-start"
            >
                min
            </div>
        </div>
        <div>
            <p>über folgendes Medium:</p>
            <div class="container text-center">
                <div
                    class="btn-group"
                    role="group"
                    aria-label="Transportmittel"
                >
                    <input
                        id="PKW"
                        v-model="stepThree.transport"
                        type="radio"
                        class="btn-check"
                        name="options"
                        value="pkw"
                    >
                    <label
                        class="btn btn-outline-primary"
                        for="PKW"
                    >
                        PKW
                    </label>
                    <input
                        id="ÖPNV"
                        v-model="stepThree.transport"
                        type="radio"
                        class="btn-check"
                        name="options"
                        value="public_transport"
                    >
                    <label
                        class="btn btn-outline-primary"
                        for="ÖPNV"
                    >
                        ÖPNV
                    </label>
                    <input
                        id="Fuß"
                        v-model="stepThree.transport"
                        type="radio"
                        class="btn-check"
                        name="options"
                        value="foot"
                    >
                    <label
                        class="btn btn-outline-primary"
                        for="Fuß"
                    >
                        Fuß
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>
