import store from "/src/app-store";
import * as bridge from "/src/core/layers/RadioBridge.js";
import {getLayerById} from "./map.js";
import {Radio} from "backbone";

let count = 100;

const onTransparencyChanged = {};
const onZIndexChanged = {};
const onVisibileChanged = {};
const onCloseChanged = {};

Radio.channel("ModelList").on({
    "transparencyChanged": () => {
        for (const id in onTransparencyChanged) {
            const model = bridge.getLayerModelsByAttributes({id: id})[0];

            onTransparencyChanged[id](model.get("transparency"));
        }
    },
    "moveModelInTree": (model, movement) => {
        if (model.get("id") in onZIndexChanged) {
            onZIndexChanged[model.get("id")](model.get("selectionIDX") + movement);
        }
    },
    "selectedChanged": (model, value) => {
        if (model.get("id") in onVisibileChanged && model.get("isSelected") === true) {
            onVisibileChanged[model.get("id")](value);
        }
    },
    "updateSelection": (model) => {
        if (model === undefined) {
            return;
        }
        if (model.get("id") in onCloseChanged && model.get("isSelected") === false) {
            close(model.get("id"));
        }
    }
});

/**
 * closes entry
 * @param {*} id model id
 * @returns {void}
 */
function close (id) {
    const onClose = onCloseChanged[id];

    closeTreeEntry(id.replace("_m", ""));
    if (onClose !== undefined) {
        onClose(false);
    }
}

/**
 * adds event listener to listen on tree-item events
 * @param {*} event event name
 * @param {*} id model id
 * @param {*} listener listener function
 * @returns {void}
 */
function addEventListener (event, id, listener) {
    if (event === "transparency") {
        onTransparencyChanged[id] = listener;
    }
    if (event === "zindex") {
        onZIndexChanged[id] = listener;
    }
    if (event === "visibile") {
        onVisibileChanged[id] = listener;
    }
    if (event === "close") {
        onCloseChanged[id] = listener;
    }
}

/**
 * removes event listener
 * @param {*} event event name
 * @param {*} id model id
 * @returns {void}
 */
function removeEventListener (event, id) {
    if (event === "transparency") {
        delete onTransparencyChanged[id];
    }
    if (event === "zindex") {
        delete onZIndexChanged[id];
    }
    if (event === "visibile") {
        delete onVisibileChanged[id];
    }
    if (event === "close") {
        delete onCloseChanged[id];
    }
}

/**
 * close a tree entry (does not trigger onClose)
 * @param {*} id id of tree entry/layer
 * @returns {void}
 */
function closeTreeEntry (id) {
    const model_id = id + "_m";
    const model = Radio.request("ModelList", "getModelByAttributes", {id: model_id});

    if (model !== undefined) {
        removeEventListener("transparency", model_id);
        removeEventListener("zindex", model_id);
        removeEventListener("visibile", model_id);
        removeEventListener("close", model_id);

        const coll = Radio.request("ModelList", "getCollection");
        const filtered = coll.filter(item => item.id !== model_id);
        const layer = getLayerById(model_id);

        coll.set(filtered);
        Radio.trigger("ModelList", "updateSelection");

        store.commit("Maps/removeLayerFromMap", layer);
    }
}

/**
 * adds a entry to layer tree
 * @param {*} id layer id
 * @param {*} name layer name
 * @param {*} handlers handler functions for tree-item events
 * @returns {void}
 */
function addTreeEntry (id, name, {onClose, onTransparency, onZIndex, onVisibile}) {
    const model_id = id + "_m";
    const attr = {
        id: model_id,
        name: name,
        typ: "VectorBase",
        type: "layer",
        gfiAttributes: "ignore",
        isSelected: true,
        features: [],
        hitTolerance: 0,
        parentId: "SelectedLayer",
        isNeverVisibleInTree: false,
        isRemovable: true,
        isSettingVisible: true,
        isVisibleInMap: true,
        layerInfoClicked: false,
        singleBaselayer: false,
        maxScale: "1000000000",
        minScale: "0",
        selectionIDX: 0,
        showSettings: true
    };

    close(model_id);

    Radio.trigger("ModelList", "addModel", attr);
    Radio.trigger("ModelList", "updateLayerView");
    Radio.trigger("ModelList", "updateSelection");
    const model = Radio.request("ModelList", "getModelByAttributes", {id: model_id});

    model.cid = "c" + String(count);
    count++;

    addEventListener("transparency", model_id, onTransparency);
    addEventListener("zindex", model_id, onZIndex);
    addEventListener("visibile", model_id, onVisibile);
    addEventListener("close", model_id, onClose);
}

export {addTreeEntry, closeTreeEntry};
