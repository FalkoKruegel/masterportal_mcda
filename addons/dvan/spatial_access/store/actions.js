import config from "../../config.json";

const actions = {
    initialize () {
        return 1;
    },

    async initState ({state}) {
        // load planning-areas and physicans
        {
            const response1 = await fetch(config.backend_url + "/v1/state/supply_levels");
            const supply_levels = await response1.json();

            state.stepTwo.supplyLevels = supply_levels;

            const response2 = await fetch(config.backend_url + "/v1/state/planning_areas");
            const planning_areas = await response2.json();

            state.stepTwo.planningAreas = planning_areas;

            const response3 = await fetch(config.backend_url + "/v1/state/physicians");
            const physicians = await response3.json();

            state.stepTwo.physicianGroups = physicians;

            state.stepTwo.supplyLevel = "";
            state.stepTwo.physicianGroup = "unselected";
            state.stepTwo.planningArea = "unselected";
        }
        // load population
        {
            const response = await fetch(config.backend_url + "/v1/state/population");
            const population = await response.json();

            state.stepFour.population = population;
        }
        // load travel parameters
        {
            const response = await fetch(config.backend_url + "/v1/state/travel_modes");
            const modes = await response.json();

            state.stepFive.travelModes = modes;

            const response2 = await fetch(config.backend_url + "/v1/state/distance_decays");
            const decays = await response2.json();

            state.stepFive.distanceDecays = decays;

            // set default to first
            state.stepFive.transport = "";
            state.stepFive.distanceDecay = "";
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
