import store from "/src/app-store";
import * as bridge from "/src/core/layers/RadioBridge.js";
import {addLegendEntry, closeLegendEntry} from "./legend_entry.js";

/**
 * adds Layer to Map
 * @param {any} layer layer to be added
 * @returns {void}
 */
function addLayer (layer) {
    if (getLayerById(layer.get("id")) !== undefined) {
        removeLayer(layer.get("id"));
    }

    store.dispatch("Maps/addLayer", layer);

    addLegendEntry(layer.get("id"), layer.get("name"), layer.get("legend"));
}

/**
 * removes layer (and legend/tree entry) from map
 * @param {*} id layer id
 * @returns {void}
 */
function removeLayer (id) {
    closeLegendEntry(id);

    const layer = getLayerById(id);

    store.commit("Maps/removeLayerFromMap", layer);
}

/**
 * returns layer from map
 * @param {string} id layer id
 * @param {boolean} searchInGroupLayers true if layer within group layers should be searched
 * @returns {any} layer or undefined
 */
function getLayerById (id, searchInGroupLayers = true) {
    const f = store.getters["Maps/getLayerById"];

    return f({
        layerId: id,
        searchInGroupLayers: searchInGroupLayers
    });
}

/**
 * returns all map layers
 * @returns {any[]} array of layers
 */
function getMapLayers () {
    return store.getters["Maps/getLayers"];
}

/**
 * returns all visibile map layers
 * @returns {any[]} array of layers
 */
function getVisibleLayers () {
    return store.getters["Maps/getVisibileLayerList"];
}

/**
 * returns the current map view
 * @returns {any} map view
 */
function getMapView () {
    return store.getters["Maps/getView"];
}

/**
 * registers a event listener on map
 * @param {string} type event to listen on (e.g. click)
 * @param {any} listener listener function
 * @returns {void}
 */
function addEventListener (type, listener) {
    store.dispatch("Maps/registerListener", {
        type: type,
        listener: listener
    });
}

/**
 * unregisters a event listener on map
 * @param {string} type event to listen on (e.g. click)
 * @param {any} listener listener function
 * @returns {void}
 */
function removeEventListener (type, listener) {
    store.dispatch("Maps/unregisterListener", {
        type: type,
        listener: listener
    });
}

/**
 * returns a style from style.json
 * @param {string} id style id
 * @returns {any} style model
 */
function getStyleModelById (id) {
    return bridge.getStyleModelById(id);
}

export {addLayer, getLayerById, removeLayer, getMapLayers, getVisibleLayers, getMapView, getStyleModelById, addEventListener, removeEventListener};
