import VectorImageLayer from "ol/layer/VectorImage.js";
import VectorSource from "ol/source/Vector.js";
import {GeoJSON} from "ol/format";
import {Style, Fill, RegularShape, Stroke} from "ol/style";
import schools from "./schools.json";

const style = new Style({
    image: new RegularShape({
        fill: new Fill({color: "red"}),
        stroke: new Stroke({color: "black"}),
        points: 3,
        radius: 10,
        angle: 0
    })
});
// const geojson = {
//     "type": "FeatureCollection",
//     "features": [
//         {
//             "type": "Feature",
//             "id": 1,
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [10.544, 52.263]
//             },
//             "properties": {
//                 "OBJECTID": 1,
//                 "ID": 8,
//                 "GKZ": "101000",
//                 "NAME_1": "Venenzentrum Braunschweig"
//             }
//         },
//         {
//             "type": "Feature",
//             "id": 2,
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [10.744, 52.063]
//             },
//             "properties": {
//                 "OBJECTID": 1,
//                 "ID": 8,
//                 "GKZ": "101000",
//                 "NAME_1": "Venenzentrum Braunschweig2"
//             }
//         },
//         {
//             "type": "Feature",
//             "id": 3,
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [10.634, 52.263]
//             },
//             "properties": {
//                 "OBJECTID": 1,
//                 "ID": 8,
//                 "GKZ": "101000",
//                 "NAME_1": "Venenzentrum Braunschweig3"
//             }
//         },
//         {
//             "type": "Feature",
//             "id": 4,
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [10.544, 52.463]
//             },
//             "properties": {
//                 "OBJECTID": 1,
//                 "ID": 8,
//                 "GKZ": "101000",
//                 "NAME_1": "Venenzentrum Braunschweig4"
//             }
//         }
//     ]
// };

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
        layer = new VectorImageLayer({
            id: "dummy",
            name: "markerPoint",
            visibile: true,
            source: new VectorSource({
                features: features
            }),
            alwaysOnTop: true,
            altitudeMode: "clampToGround"
        });

    layer.set("id", "dummy");
    layer.setStyle(style);
    return layer;
}

export {getDummyLayer};
