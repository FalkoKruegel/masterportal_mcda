import store from "/src/app-store";
import {getLayerById} from "./map.js";
import {watch, computed} from "vue";

/**
 * function to add entry to legend
 * @param {*} id layer id
 * @param {*} name layer name
 * @param {*} legend legend object or function returning legend object
 * @returns {void}
 */
function addLegendEntry (id, name, legend) {
    let func = null;

    if (typeof legend === "function") {
        func = async () => {
            const legend_obj = await legend();

            store.dispatch("Legend/addLegend", {
                id: id,
                name: name,
                legend: legend_obj
            });
        };
    }
    else {
        func = async () => {
            const legend_obj = legend;

            store.dispatch("Legend/addLegend", {
                id: id,
                name: name,
                legend: legend_obj
            });
        };
    }

    const showLegend = computed(() => {
        return store.getters["Legend/showLegend"];
    });

    const unwatch = watch(showLegend, (newVal) => {
        if (getLayerById(id) === null) {
            unwatch();
            return;
        }
        if (newVal === true) {
            func();
        }
        if (newVal === false) {
            store.dispatch("Legend/removeLegend", id);
        }
    });
}

/**
 * function to remove legend entry
 * @param {*} id layer id
 * @returns {void}
 */
function closeLegendEntry (id) {
    store.dispatch("Legend/removeLegend", id);
}

export {addLegendEntry, closeLegendEntry};
