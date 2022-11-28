import {GeoJSON} from "ol/format";
// import {Style, Fill, RegularShape, Stroke} from "ol/style";
import schools from "./schools.json";
import {getStyleModelById} from "./map.js";
import {getLegendFromStyleModel} from "../utils/util.js";
import VectorImageLayer from "ol/layer/VectorImage.js";
import VectorSource from "ol/source/Vector.js";

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
* @returns {void} dummy layer
*/
function getDummyLayer () {
    const format = new GeoJSON({
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:25832"
        }),
        features = format.readFeatures(schools),
        style = getStyleModelById("schoolStyle"),

        layer = new VectorImageLayer({
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

export {getDummyLayer};
