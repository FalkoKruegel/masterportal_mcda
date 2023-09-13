import {Image as ImageLayer} from "ol/layer";
import {ImageCanvas} from "ol/source";
import {RasterStyle} from "./raster_style";
import {toLonLat, get as getProjection} from "ol/proj.js";
import Layer from "../../../../src/core/layers/layer";


/**
 * remote grid-layer class
 */
class RemoteGridLayer extends Layer {
    extend;
    canvas;

    url;
    layer_id;

    name;
    type;
    style;
    cell_size;
    proj;

    /**
     * constructor
     */
    constructor ({url, layer_id, extend, projection, style = null, ...attr}) {
        const source = new ImageCanvas({
            canvasFunction: (extent, resolution, pixel_ratio, size, projection) => {
                if (resolution > 150 && this.cell_size !== 1000) {
                    this.cell_size = 1000;
                    this.rerender();
                }
                else if (resolution <= 150 && resolution > 100 && this.cell_size !== 600) {
                    this.cell_size = 600;
                    this.rerender();
                }
                else if (resolution <= 100 && resolution > 40 && this.cell_size !== 300) {
                    this.cell_size = 300;
                    this.rerender();
                }
                else if (resolution <= 40 && resolution > 20 && this.cell_size !== 200) {
                    this.cell_size = 200;
                    this.rerender();
                }
                else if (resolution <= 20 && this.cell_size !== 100) {
                    this.cell_size = 100;
                    this.rerender();
                }
                if (this.canvas === null) {
                    return null;
                }

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
        const layer = new ImageLayer({
            source: source,
            id: attr.id,
            gfiAttributes: attr.gfiAttributes
        });

        super(attr, layer, false);

        // this.layer.getRenderer().forEachFeatureAtCoordinate = async (coordinate, frameState, hitTolerance, callback, matches) => {
        //     const ids = await this.getFeaturesAtCoordinate(coordinate);
        //     if (ids.length <= 0) {
        //         return;
        //     }
        //     const geojson = ids[0];
        //     const feature = new GeoJSON().readFeature(geojson);

        //     callback(feature, this.layer, feature.getGeometry());
        // };

        if (style === null) {
            this.style = new RasterStyle("first", [255, 125, 0, 255], [0, 125, 255, 255], [100, 300, 600, 1000, 1600, 2400, 3600]);
        }
        else {
            this.style = style;
        }
        this.cell_size = 0;
        this.url = url;
        this.layer_id = layer_id;

        this.canvas = null;
        this.extend = extend;

        this.id = attr.id;
        this.name = attr.name;
        this.proj = getProjection(projection);
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
     * @returns {ImageLayer<ImageCanvas>} openlayers layer instance
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
        throw Error("not implemented");
    }

    /**
     * adds multiple features to grid
     * @param {any} features features: [{x: .., y: .., value: {}}, ...]
     * @returns {void}
     */
    addFeatures (features) {
        throw Error("not implemented");
    }

    /**
     * retrives a feature from grid
     * @param {number} id id of the feature
     * @returns {any} feature as geojson point
     */
    getFeature (id) {
        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [0, 0]
            },
            properties: {
                value: 0
            }
        };
    }

    /**
     * removes a feature from grid
     * @param {number} id feature id
     * @returns {void}
     */
    removeFeature (id) {
        throw Error("not implemented");
    }

    /**
     * returns ids of all features
     * @returns {number[]} ids as number array
     */
    getAllFeatures () {
        throw Error("not implemented");
    }

    /**
     * sets a property on a grid-feature
     * @param {number} id feature id
     * @param {string} prop property name
     * @param {any} value property value
     * @returns {void}
     */
    setProperty (id, prop, value) {
        throw Error("not implemented");
    }

    /**
     * returns property value of feature
     * @param {number} id feature id
     * @param {string} prop property name
     * @returns {any} value of property
     */
    getProperty (id, prop) {
        throw Error("not implemented");
    }

    /**
     * returns the geometry of a feature
     * @param {number} id id of the feature
     * @returns {void} geometry as geojson geometry
     */
    getGeometry (id) {
        return {
            type: "Point",
            coordinates: [0, 0]
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
    async getFeaturesAtCoordinate (coord, geographic = false) {
        if (!this.checkInExtend(coord[0], coord[1])) {
            return [];
        }
        const url = this.url + "/v0/get_closest_feat";
        const request = {
            id: this.layer_id,
            coord: coord,
            max_dist: this.cell_size
        };
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(request)
        });
        const data = await response.json();

        if (data.x === -1 && data.y === -1) {
            return [];
        }

        return [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: toLonLat([data.x, data.y], this.proj)
                },
                properties: data.values
            }
        ];
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
        this.canvas = null;
        const promise = this.getPNG(this.style, this.cell_size);

        promise.then(value => {
            const [img, extent] = value;

            this.extend = extent;
            this.canvas = img;
            if (this.layer !== undefined) {
                this.layer.getSource().changed();
            }
        });
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
     * retrives png from server and draws image to canvas
     * @param {any} style style object
     * @param {number} cell_size size of grid cells
     * @returns {any} tuple of canvas and extent
     */
    async getPNG (style, cell_size) {
        const url = this.url + "/v0/grid_png";
        const request = {
            id: this.layer_id,
            value: style.attribute,
            cell_size: cell_size,
            style: {
                ranges: [style.ranges[0], style.ranges[style.ranges.length - 1]],
                colors: [style.colors[0], style.colors[style.colors.length - 1]],
                no_data: style.no_data,
                no_data_color: style.no_data_color
            }
        };

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(request)
        });
        const data = await response.json();

        const canvas = document.createElement("canvas");

        canvas.width = data.size[0];
        canvas.height = data.size[1];
        const ctx = canvas.getContext("2d");
        const image = new Image();

        image.src = data.img;
        await image.decode();
        ctx.drawImage(image, 0, 0);
        return [canvas, data.extent];
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
}


export {RemoteGridLayer};
