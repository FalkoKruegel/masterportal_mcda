import store from "/src/app-store";
import * as bridge from "/src/core/layers/RadioBridge.js";
import {Radio} from "backbone";
import {getLayerById} from "./map.js";

const onTransparencyChanged = {},
    onZIndexChanged = {},
    onVisibileChanged = {},
    onCloseChanged = {};

Radio.channel("ModelList").on({
    "transparencyChanged": () => {
        for (const id in onTransparencyChanged) {
            const model = bridge.getLayerModelsByAttributes({id: id})[0];

            onTransparencyChanged[id](model.get("transparency"));
        }
    },
    "moveModelInTree": (model, movement) => {
        for (const id in onZIndexChanged) {
            if (model.get("id") === id) {
                onZIndexChanged[id](model.get("selectionIDX") + movement);
            }
        }
    },
    "selectedChanged": (model, value) => {
        for (const id in onVisibileChanged) {
            if (model.get("id") === id) {
                if (model.get("isSelected") === true) {
                    onVisibileChanged[id](value);
                }
            }
        }
    },
    "updateSelection": (model) => {
        for (const id in onCloseChanged) {
            if (model.get("id") === id) {
                if (model.get("isSelected") === false) {
                    Radio.trigger("ModelList", "removeModelsById", id);
                    const layer = getLayerById(id);

                    store.commit("Maps/removeLayerFromMap", layer);
                    onCloseChanged[id](false);
                    removeEventListener("transparency", id);
                    removeEventListener("zindex", id);
                    removeEventListener("visibile", id);
                    removeEventListener("close", id);
                }
            }
        }
    }
});

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
 * closes a tree entry
 * @param {*} id layer id
 * @returns {void}
 */
function closeTreeEntry (id) {
    const model_id = id + "_m",
        model = Radio.request("ModelList", "getModelByAttributes", {id: model_id});

    if (model !== undefined) {
        model.set("isSelected", false);
        Radio.trigger("ModelList", "selectedChanged", model, false);
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
    const model_id = id + "_m",

        attr = {
            id: model_id,
            name: name,
            typ: "VectorBase",
            type: "layer",
            gfiAttributes: "ignore",
            isSelected: true,
            features: [],
            hitTolerance: 0,
            parentId: "",
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

    closeTreeEntry(model_id);

    Radio.trigger("ModelList", "addModel", attr);
    Radio.trigger("ModelList", "updateLayerView");
    Radio.trigger("ModelList", "updateSelection");

    addEventListener("transparency", model_id, onTransparency);
    addEventListener("zindex", model_id, onZIndex);
    addEventListener("visibile", model_id, onVisibile);
    addEventListener("close", model_id, onClose);
}

export {addTreeEntry, closeTreeEntry};
