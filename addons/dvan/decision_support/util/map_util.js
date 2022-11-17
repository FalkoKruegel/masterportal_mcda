import store from "/src/app-store";
import * as bridge from "/src/core/layers/RadioBridge.js";

/**
 * adds Layer to Map
 * @param {any} layer layer to be added
 * @returns {void}
 */
function addLayer (layer) {
    store.dispatch("Maps/addLayer", layer);
    const style = getStyleModelById("schoolStyle"),
        legendinfo = style.getLegendInfos(),
        legend = ["Point"];

    layer.setStyle((feature) => {
        return style.createStyle(feature, false);
    });
    style.createLegendInfo([]);

    legendinfo.forEach(async element => {
        const l = {},
            img = element.styleObject.getStyle().getImage().getImage(1);

        let png = null;

        if (typeof img.toBlob !== "function") {
            png = img.src;
        }
        else {
            png = URL.createObjectURL(await canvasToPNG(img));
        }
        l.name = element.label;
        l.graphic = png;
        legend.push(l);
    });
    store.dispatch("Legend/addLegend", {
        id: layer.get("id"),
        name: "test",
        legend: legend
    });
}

/**
 * converts a canvas to image/png blob
 * @param {any} canvas canvas to be converted
 * @returns {any} image blob
 */
async function canvasToPNG (canvas) {
    return new Promise(resolve => canvas.toBlob((blob) => resolve(blob), "image/png"));
}

/**
 * removes layer from map
 * @param {string} id layer id
 * @returns {void}
 */
function removeLayer (id) {
    const layer = getLayerById(id);

    if (layer !== undefined) {
        store.commit("Maps/removeLayerFromMap", layer);
        store.dispatch("Legend/removeLegend", id);
    }
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

export {addLayer, removeLayer, getLayerById, getMapLayers, getVisibleLayers, getMapView, getStyleModelById, addEventListener, removeEventListener};
