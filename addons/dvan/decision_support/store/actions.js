import config from "../../config.json";

const actions = {
    initialize () {
        return 1;
    },

    async initState ({state}) {
        // load facilities
        {
            const response = await fetch(config.backend_url + "/v1/state/facilities");
            const facilities = await response.json();

            state.stepThree.facilities = facilities;
        }
        // load population
        {
            const response = await fetch(config.backend_url + "/v1/state/population");
            const population = await response.json();

            state.stepFour.population = population;
        }
        // load travel-modes
        {
            const response = await fetch(config.backend_url + "/v1/state/travel_modes");
            const modes = await response.json();

            state.stepFive.travelModes = modes;

            // set default to first
            state.stepFive.transport = Object.keys(modes)[0];
        }

        // init selection parameters
        {
            const time_zones = {};

            const facilities_obj = state.stepThree.facilities;

            for (const group in facilities_obj) {
                const facilities = [];
                const items = facilities_obj[group].items;

                for (const f in items) {
                    facilities.push(f);
                }
                const request = {
                    facilities: facilities
                };
                const response = await fetch(config.backend_url + "/v1/state/time_zones", {method: "POST", body: JSON.stringify(request)});
                const group_obj = await response.json();

                time_zones[group] = group_obj;
            }
            state.stepFive.timeZones = time_zones;
        }
        {
            const weights = {};

            for (const group in state.stepThree.facilities) {
                const group_obj = {};
                const items = state.stepThree.facilities[group].items;

                for (const f in items) {
                    group_obj[f] = 0;
                }
                weights[group] = group_obj;
            }
            state.stepSix.facilityWeights = weights;
        }
    }
};

export default actions;
