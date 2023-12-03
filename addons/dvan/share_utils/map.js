import store from "/src/app-store";
import * as bridge from "/src/core/layers/RadioBridge.js";
import mapCollection from "/src/core/maps/mapCollection.js";
import {addTreeEntry, closeTreeEntry} from "./tree_entry.js";
import {addLegendEntry, closeLegendEntry} from "./legend_entry.js";

/**
 * adds Layer to Map
 * @param {any} layer layer to be added
 * @param {any} close_handler callback called on layer close
 * @returns {void}
 */
function addLayer (layer, close_handler) {
    if (getLayerById(layer.get("id")) !== undefined) {
        removeLayer(layer.get("id"));
    }

    store.dispatch("Maps/addLayer", layer);

    if (layer !== null && layer !== undefined) {
        layer.dispatchEvent("add");
    }

    addLegendEntry(layer.get("id"), layer.get("name"), layer.get("legend"));

    addTreeEntry(layer.get("id"), layer.get("name"), {
        onTransparency: (value) => {
            const opacity = (100 - value) / 100;

            layer.setOpacity(opacity);
        },
        onZIndex: (value) => layer.setZIndex(value),
        onVisibile: (value) => layer.setVisible(value),
        onClose: () => {
            if (close_handler) {
                close_handler();
            }
            removeLayer(layer.get("id"));
        }
    });
}

/**
 * removes layer (and legend/tree entry) from map
 * @param {*} id layer id
 * @returns {void}
 */
function removeLayer (id) {
    closeTreeEntry(id);
    closeLegendEntry(id);

    const layer = getLayerById(id);

    if (layer !== null && layer !== undefined) {
        layer.dispatchEvent("remove");
    }

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
 * returns the current ol-map instance
 * @returns {any} ol-map
 */
function getBaseMap () {
    return mapCollection.getMap("2D");
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

let count = 1000;

/**
 * adds a layer to map
 * @param {any} attrs layer attributes
 * @returns {void}
 */
function addLayerModel (attrs) {
    if (attrs.id in layers) {
        return;
    }

    Radio.trigger("ModelList", "addModel", attrs);
    Radio.trigger("ModelList", "updateLayerView");
    Radio.trigger("ModelList", "updateSelection");

    layers[attrs.id] = true;

    const model = Radio.request("ModelList", "getModelByAttributes", {id: attrs.id});

    model.cid = "c" + String(count);
    count++;
}

/**
 * removes layer from map
 * @param {string} id layer id
 * @return {void}
 */
function removeLayerModel (id) {
    const coll = Radio.request("ModelList", "getCollection");
    const filtered = coll.filter(item => item.id !== id);

    coll.set(filtered);
    Radio.trigger("ModelList", "updateSelection");
    Radio.trigger("ModelList", "updateLayerView");

    const layer = getLayerById(id);

    if (layer !== undefined) {
        store.commit("Maps/removeLayerFromMap", layer);
    }

    store.dispatch("Legend/removeLegend", id);

    delete layers[id];
}

const layers = {};

Radio.channel("ModelList").on({
    "updateSelection": (model) => {
        if (model === undefined) {
            return;
        }
        if (model.get("id") in layers && model.get("isSelected") === false) {
            removeLayerModel(model.get("id"));
        }
    }
});

export {addLayerModel, removeLayerModel, addLayer, getLayerById, removeLayer, getMapLayers, getVisibleLayers, getMapView, getStyleModelById, addEventListener, removeEventListener, getBaseMap};
