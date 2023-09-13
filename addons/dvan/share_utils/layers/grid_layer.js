import {Image} from "ol/layer";
import {ImageCanvas} from "ol/source";
import {RasterStyle} from "./raster_style";
import {QuadTree} from "./quad_tree";
import {fromLonLat, toLonLat, get as getProjection} from "ol/proj.js";
import GeoJSON from "ol/format/GeoJSON.js";
import Layer from "../../../../src/core/layers/layer";


/**
 * grid-layer class
 */
class GridLayer extends Layer {
    features;
    extend;
    canvas;
    ctx;

    style;
    proj;

    /**
     * constructor
     */
    constructor ({features, extend, size, projection, style = null, ...attr}) {
        const source = new ImageCanvas({
            canvasFunction: (extent, resolution, pixel_ratio, size, projection) => {
                const canvas = document.createElement("canvas");

                canvas.width = size[0];
                canvas.height = size[1];

                const dx = extent[2] - extent[0];
                const dy = extent[3] - extent[1];
                const sx = size[0] / dx;
                const sy = size[1] / dy;

                const ll = [(this.extend[0] - extent[0]) * sx, (extent[3] - this.extend[1]) * sy];
                const ur = [(this.extend[2] - extent[0]) * sx, (extent[3] - this.extend[3]) * sy];

                const ctx = canvas.getContext("2d");

                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, ll[0], ur[1], ur[0] - ll[0], ll[1] - ur[1]);

                return canvas;
            },
            projection: projection
        });
        const layer = new Image({
            source: source,
            id: attr.id,
            gfiAttributes: attr.gfiAttributes
        });

        super(attr, layer, false);

        this.layer.getRenderer().forEachFeatureAtCoordinate = (coordinate, frameState, hitTolerance, callback, matches) => {
            const ids = this.getFeaturesAtCoordinate(coordinate);

            if (ids.length <= 0) {
                return;
            }
            const geojson = this.getFeature(ids[0]);
            const feature = new GeoJSON().readFeature(geojson);

            callback(feature, this.layer, feature.getGeometry());
        };

        if (style === null) {
            this.style = new RasterStyle("first", [0, 255, 0, 0.5], [255, 0, 0, 0.5], [100, 300, 600, 1000, 1600, 2400, 3600]);
        }
        else {
            this.style = style;
        }

        this.canvas = document.createElement("canvas");
        this.canvas.height = size[1];
        this.canvas.width = size[0];
        this.ctx = this.canvas.getContext("2d");
        this.extend = extend;
        this.features = new QuadTree();
        this.addFeatures(features);

        this.id = attr.id;
        this.name = attr.name;
        this.proj = getProjection(projection);

        this.rerender();
    }

    /**
     * method needed to implement layer subclass
     * @returns {void}
     */
    createLayer () {

    }

    /**
     * method needed to implement layer subclass
     * @returns {void}
     */
    createLegend () {

    }

    /**
     * returns layer name
     * @returns {string} name of layer
     */
    getName () {
        return this.name;
    }

    /**
     * set layer name
     * @param {string} name new layer name
     * @returns {void}
     */
    setName (name) {
        this.name = name;
    }

    /**
     * returns underlying openlayers layer
     * @returns {Image<ImageCanvas>} openlayers layer instance
     */
    getOlLayer () {
        return this.layer;
    }

    /**
     * add a feature to the grid
     * @param {any} feature feature: {x: .., y: .., value: {}}
     * @returns {void}
     */
    addFeature (feature) {
        const [px, py] = this.getPixelFromCoordinates(feature.x, feature.y);

        this.features.insert(px, py, feature.value);
        const [r, g, b, a] = this.style.getRGBA(feature.value);

        this.drawPixel(px, py, r, g, b, a);
    }

    /**
     * adds multiple features to grid
     * @param {any} features features: [{x: .., y: .., value: {}}, ...]
     * @returns {void}
     */
    addFeatures (features) {
        for (const feature of features) {
            const [px, py] = this.getPixelFromCoordinates(feature.x, feature.y);

            this.features.insert(px, py, feature.value);
        }
        this.rerender();
    }

    /**
     * retrives a feature from grid
     * @param {number} id id of the feature
     * @returns {any} feature as geojson point
     */
    getFeature (id) {
        const [px, py] = this.getPixelFromId(id);
        const value = this.features.get(px, py);
        const [x, y] = this.getCoordinatesFromPixel(px, py);
        const [dx, dy] = this.getGridSize();

        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: toLonLat([x + dx / 2, y + dy / 2], this.proj)
            },
            properties: value
        };
    }

    /**
     * removes a feature from grid
     * @param {number} id feature id
     * @returns {void}
     */
    removeFeature (id) {
        const [px, py] = this.getPixelFromId(id);

        this.features.remove(px, py);
        this.drawPixel(px, py, 0, 0, 0, 0);
    }

    /**
     * returns ids of all features
     * @returns {number[]} ids as number array
     */
    getAllFeatures () {
        const features = [];

        for (const feature of this.features.getAllNodes()) {
            const id = this.getIdFromPixel(feature.x, feature.y);

            features.push(id);
        }
        return features;
    }

    /**
     * sets a property on a grid-feature
     * @param {number} id feature id
     * @param {string} prop property name
     * @param {any} value property value
     * @returns {void}
     */
    setProperty (id, prop, value) {
        const [px, py] = this.getPixelFromId(id);
        const f = this.features.get(px, py);

        f.value[prop] = value;
        const [r, g, b, a] = this.style.getRGBA(value);

        this.drawPixel(px, py, r, g, b, a);
    }

    /**
     * returns property value of feature
     * @param {number} id feature id
     * @param {string} prop property name
     * @returns {any} value of property
     */
    getProperty (id, prop) {
        const [px, py] = this.getPixelFromId(id);
        const f = this.features.get(px, py);

        return f.value[prop];
    }

    /**
     * returns the geometry of a feature
     * @param {number} id id of the feature
     * @returns {void} geometry as geojson geometry
     */
    getGeometry (id) {
        const [px, py] = this.getPixelFromId(id);
        const [x, y] = this.getCoordinatesFromPixel(px, py);
        const [dx, dy] = this.getGridSize();

        return {
            type: "Point",
            coordinates: toLonLat([x + dx / 2, y + dy / 2], this.proj)
        };
    }

    /**
     * returns all features intersecting extend
     * @param {any} extend search extend
     * @returns {number[]} ids of features intersecting
     */
    getFeaturesIntersectingExtend (extend) {
        return [];
    }

    /**
     * returns all features within extend
     * @param {any} extend search extend
     * @returns {number[]} ids of features within
     */
    getFeaturesInExtend (extend) {
        return [];
    }

    /**
     * returns the feature at the given coordinate
     * @param {number[]} coord search coordinate
     * @param {boolean} geographic true if geographic coordinates should be returned
     * @returns {number[]} ids of grid features at the given coordinate
     */
    getFeaturesAtCoordinate (coord, geographic = false) {
        let [x, y] = [0, 0];

        if (geographic) {
            [x, y] = fromLonLat(coord, this.proj);
        }
        else {
            [x, y] = coord;
        }
        const [px, py] = this.getPixelFromCoordinates(x, y);
        const value = this.features.get(px, py);

        if (value === null) {
            return [];
        }
        return [this.getIdFromPixel(px, py)];
    }

    /**
     * returns cuurent layer style
     * @returns {RasterStyle} layer style
     */
    getStyle () {
        return this.style;
    }

    /**
     * sets the layer style and rerenders with new style
     * @param {RasterStyle} style new style
     * @returns {void}
     */
    setStyle (style) {
        this.style = style;
        this.rerender();
    }

    /**
     * rerenders layer
     * @returns {void}
     */
    rerender () {
        const img_data = this.ctx.createImageData(this.canvas.width, this.canvas.height);

        for (const feature of this.features.getAllNodes()) {
            const rgba = this.style.getRGBA(feature.value);

            this.drawRGBA(img_data, feature.x, feature.y, rgba);
        }
        this.ctx.putImageData(img_data, 0, 0);
        if (this.layer !== undefined) {
            this.layer.getSource().changed();
        }
    }

    /**
     * adds event listeners on underlying layer
     * @param {any} type listener type
     * @param {amy} listener listener callback
     * @returns {void}
     */
    on (type, listener) {
        this.layer.on(type, listener);
    }

    /**
     * removes event listeners from underlying layer
     * @param {any} type listener type
     * @param {any} listener listener callback
     * @returns {void}
     */
    un (type, listener) {
        this.layer.un(type, listener);
    }

    /**
     * calculates pixel from griven coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {[number, number]} pixel coordinate
     */
    getPixelFromCoordinates (x, y) {
        const rows = this.canvas.height;
        const cols = this.canvas.width;
        const height = this.extend[3] - this.extend[1];
        const width = this.extend[2] - this.extend[0];
        const col = Math.floor((x - this.extend[0]) / width * cols);
        const row = Math.floor((this.extend[3] - y) / height * rows);

        return [col, row];
    }

    /**
     * calculates coordinate from given pixel
     * @param {number} px pixel x
     * @param {number} py pixel y
     * @returns {[number, number]} coordinate
     */
    getCoordinatesFromPixel (px, py) {
        const rows = this.canvas.height;
        const cols = this.canvas.width;
        const height = this.extend[3] - this.extend[1];
        const width = this.extend[2] - this.extend[0];
        const x = px * width / cols + this.extend[0];
        const y = this.extend[3] - (py + 1) * height / rows;

        return [x, y];
    }

    /**
     * calculates pixel from id
     * @param {number} id feature id
     * @returns {[number, number]} pixel coordinate
     */
    getPixelFromId (id) {
        const cols = this.canvas.width;
        const py = Math.floor(id / cols);
        const px = id % cols;

        return [px, py];
    }

    /**
     * calculates id from pixel coordinate
     * @param {number} px pixel x
     * @param {number} py pixel y
     * @returns {number} feature id
     */
    getIdFromPixel (px, py) {
        const cols = this.canvas.width;

        return py * cols + px;
    }

    /**
     * returns layer grid size
     * @returns {[number, number]} grid size ([width, height])
     */
    getGridSize () {
        const rows = this.canvas.height;
        const cols = this.canvas.width;
        const height = this.extend[3] - this.extend[1];
        const width = this.extend[2] - this.extend[0];

        return [width / cols, height / rows];
    }

    /**
     * checks if coordinate is in layer extend
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {boolean} is within
     */
    checkInExtend (x, y) {
        if (x > this.extend[2] || x < this.extend[0] || y > this.extend[3] || y < this.extend[1]) {
            return false;
        }
        return true;
    }

    /**
     * draws a pixel to underlying canvas
     * @param {ImageData} img_data imagedata to write to
     * @param {number} x x pixel-location
     * @param {number} y y pixel-location
     * @param {number[]} rgba rgba values
     * @returns {void}
     */
    drawRGBA (img_data, x, y, rgba) {
        img_data.data[y * (img_data.width * 4) + x * 4 + 0] = rgba[0];
        img_data.data[y * (img_data.width * 4) + x * 4 + 1] = rgba[1];
        img_data.data[y * (img_data.width * 4) + x * 4 + 2] = rgba[2];
        img_data.data[y * (img_data.width * 4) + x * 4 + 3] = rgba[3];
    }
}

export {GridLayer};
