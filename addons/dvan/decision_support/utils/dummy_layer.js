import {GeoJSON} from "ol/format";
// import {Style, Fill, RegularShape, Stroke} from "ol/style";
import schools from "./schools.json";
import {getStyleModelById, getMapView} from "../../share_utils/map.js";
import {getLegendFromStyleModel, getLegendFromWMS} from "../../share_utils/util.js";
import VectorImageLayer from "ol/layer/VectorImage.js";
import VectorSource from "ol/source/Vector.js";
import ImageLayer from "ol/layer/Image.js";
import {ImageWMS} from "ol/source";

// const style = new Style({
//     image: new RegularShape({
//         fill: new Fill({color: "red"}),
//         stroke: new Stroke({color: "black"}),
//         points: 3,
//         radius: 10,
//         angle: 0
//     })
// });

/**
* creates dummy layer
* @returns {*} dummy layer
*/
function getWMSLayer () {
    const layer = new ImageLayer({
        id: "wms",
        name: "WMS Layer",
        typ: "WMS",
        infoFormat: "application/json",
        featureCount: 1,
        gfiAsNewWindow: false,
        source: new ImageWMS({
            url: "http://172.26.63.162:8085/geoserver/DVAN_Workspace_Test_No1/wms",
            params: {"LAYERS": "DVAN_Workspace_Test_No1:Test_Pointraster_Niedersachsen"},
            serverType: "geoserver"
        })
    });

    layer.set("gfiAttributes", {"BEVOELKERUG": "Bevölkerung"});
    layer.set("legend", () => {
        const view = getMapView();

        return getLegendFromWMS(layer, view.getResolution());
    });

    return layer;
}

/**
* creates dummy layer
* @returns {*} dummy layer
*/
function getDummyLayer () {
    const format = new GeoJSON({
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:25832"
    });
    const features = format.readFeatures(schools);
    const style = getStyleModelById("schoolStyle");

    const layer = new VectorImageLayer({
        id: "dummy",
        name: "Dummy Layer",
        source: new VectorSource({
            features: features
        })
    });

    layer.setStyle((feature) => {
        return style.createStyle(feature, false);
    });

    layer.set("gfiAttributes", {"OBJECTID": "ID  "});
    layer.set("legend", () => {
        const s = getStyleModelById("schoolStyle");

        return getLegendFromStyleModel(s);
    });

    return layer;
}

/**
* creates dummy layer
* @returns {*} dummy layer
*/
function getDummyLayer2 () {
    const format = new GeoJSON({
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:25832"
    });
    const features = format.readFeatures(schools);
    const style = getStyleModelById("arzt_krankenhaus");

    const layer = new VectorImageLayer({
        id: "dummy2",
        name: "Dummy Layer2",
        source: new VectorSource({
            features: features
        })
    });

    layer.setStyle((feature) => {
        return style.createStyle(feature, false);
    });

    layer.set("gfiAttributes", {"OBJECTID": "ID  "});
    layer.set("legend", () => {
        const s = getStyleModelById("arzt_krankenhaus");

        return getLegendFromStyleModel(s);
    });

    return layer;
}

export {getDummyLayer, getWMSLayer, getDummyLayer2};
