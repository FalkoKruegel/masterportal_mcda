import {COORDINATE_SYSTEM} from "@deck.gl/core";
import {HeatmapLayer} from "@deck.gl/aggregation-layers";

/**
 * deck.gl HeatmapLayer
 */
class HeatMapLayer {
    id;
    name;
    features;
    changed;

    /**
     * creates a GridLayer
     * @param {string} id id of layer
     * @param {string} name name of layer
     * @param {any[]} features feature list
     */
    constructor (id, name, features) {
        this.id = id;
        this.name = name;
        this.features = features;
        this.changed = {counter: 0};
    }

    /**
     * returns id of layer
     * @returns {string} id
     */
    getID () {
        return this.id;
    }
    /**
     * returns name of layer
     * @returns {string} name
     */
    getName () {
        return this.name;
    }
    /**
     * returns feature from feature-list
     * @param {number} index index in feature list
     * @returns {any} feature as geojson
     */
    getFeature (index) {
        const feat = this.features[index];

        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": feat.coordinates
            },
            "properties": feat.properties
        };
    }

    /**
     * creates a deck-gl layer instance
     * @param {any} style style object
     * @param {number} opacity opacity of layer (between 0 and 1)
     * @param {boolean} update true if layer style changed from previous call
     * @returns {any} deck-gl layer instance
     */
    getLayer (style, opacity, update) {
        if (update) {
            this.changed = {counter: this.changed.counter + 1};
        }
        return new HeatmapLayer({
            id: this.name,
            data: this.features,
            pickable: false,
            opacity: opacity,
            getPosition: d => d.coordinates,
            getWeight: d => d.properties[style.getAttribute()],
            aggregation: "SUM",
            colorRange: [style.getMinColor(), style.getMaxColor()],
            threshold: 0.0005,
            radiusPixels: 40,
            weightsTextureSize: 512,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,

            updateTriggers: {
                getWeight: this.changed,
                colorRange: this.changed,
                opacity: this.changed
            }
        });
    }
}

/**
 * continous grid style
 */
class HeatMapStyle {
    attribute;
    min_color;
    max_color;

    /**
     * constructor
     * @param {string} attribute value attribute name
     * @param {any} min_color start color of color range
     * @param {any} max_color end color of color range
     */
    constructor (attribute, min_color = [100, 100, 100, 100], max_color = [25, 25, 25, 100]) {
        this.attribute = attribute;
        this.min_color = min_color;
        this.max_color = max_color;
    }

    /**
     * returns current attribute
     * @returns {string} attribute name
     */
    getAttribute () {
        return this.attribute;
    }
    /**
     * returns min color
     * @returns {number[]} min color
     */
    getMinColor () {
        return this.min_color;
    }
    /**
     * returns max color
     * @returns {number[]} max color
     */
    getMaxColor () {
        return this.max_color;
    }
}

export {HeatMapLayer, HeatMapStyle};
