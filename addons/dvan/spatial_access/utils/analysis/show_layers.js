import {getMapView} from "../../../share_utils/map.js";
import {getLegendFromWMS} from "../../../share_utils/util.js";
import ImageLayer from "ol/layer/Image.js";
import {ImageWMS} from "ol/source";

/**
* creates wms layer
 * @param {*} id layer id
 * @param {*} name layer name
 * @param {*} wms_url WMS-URL
 * @param {*} wms_layer WMS layer name
 * @param {*} wms_style WMS style name
 * @param {*} gfiAttributes mapping for gfi
* @returns {*} wms layer
*/
function getWMSLayer (id, name, wms_url, wms_layer, wms_style = "", gfiAttributes = {}) {
    const layer = new ImageLayer({
        id: id,
        name: name,
        typ: "WMS",
        infoFormat: "application/json",
        featureCount: 1,
        gfiAsNewWindow: false,
        source: new ImageWMS({
            url: wms_url,
            params: {
                "LAYERS": wms_layer,
                "STYLES": wms_style
            },
            serverType: "geoserver"
        })
    });

    layer.set("gfiAttributes", gfiAttributes);
    layer.set("legend", () => {
        const view = getMapView();

        return getLegendFromWMS(layer, view.getResolution());
    });

    return layer;
}

const LAYERS = {
    locations: null,
    scope: null,
    population: null,
    accessibility: null
};

export {getWMSLayer, LAYERS};
