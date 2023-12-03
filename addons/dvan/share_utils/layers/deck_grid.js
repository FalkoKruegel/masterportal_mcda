import {COORDINATE_SYSTEM} from "@deck.gl/core";
import {GridCellLayer} from "@deck.gl/layers";

/**
 * deck.gl GridCellLayer
 */
class GridLayer {
    id;
    name;
    features;
    cell_size;
    changed;

    /**
     * creates a GridLayer
     * @param {string} id id of layer
     * @param {string} name name of layer
     * @param {any[]} features feature list
     * @param {number} cell_size size of grid-cells (usually in m)
     */
    constructor (id, name, features, cell_size) {
        this.id = id;
        this.name = name;
        this.features = features;
        this.cell_size = cell_size;
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
        return new GridCellLayer({
            id: this.id,
            data: this.features,
            pickable: true,
            extruded: false,
            opacity: opacity,
            cellSize: this.cell_size,
            getPosition: d => d.coordinates,
            getFillColor: d => style.getColor(d.properties),
            elevationScale: 0,
            getElevation: 0,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,

            updateTriggers: {
                getFillColor: this.changed,
                opacity: this.changed
            }
        });
    }
}

/**
 * continous grid style
 */
class ContinousGridStyle {
    attribute;
    start_color;
    end_color;
    no_data;
    no_data_color;
    start;
    end;

    /**
     * constructor
     * @param {string} attribute value attribute name
     * @param {any} start_color start color of color range
     * @param {any} end_color end color of color range
     * @param {number} start color ranges
     * @param {number} end color ranges
     * @param {number} no_data no data value
     * @param {any} no_data_color no data color
     */
    constructor (attribute, start_color, end_color, start, end, no_data = -9999, no_data_color = [25, 25, 25, 0.5]) {
        this.attribute = attribute;
        this.start_color = start_color;
        this.end_color = end_color;
        this.start = start;
        this.end = end;
        this.no_data = no_data;
        this.no_data_color = no_data_color;
    }

    /**
     * computes color from properties
     * @param {any} props properties of current feature
     * @returns {number[]} color
     */
    getColor (props) {
        const val = props[this.attribute];

        if (val === this.no_data) {
            return this.no_data_color;
        }

        const factor = (val - this.start) / (this.end - this.start);
        const r = Math.floor(this.start_color[0] + (this.end_color[0] - this.start_color[0]) * factor);
        const g = Math.floor(this.start_color[1] + (this.end_color[1] - this.start_color[1]) * factor);
        const b = Math.floor(this.start_color[2] + (this.end_color[2] - this.start_color[2]) * factor);
        const a = Math.floor(this.start_color[3] + (this.end_color[3] - this.start_color[3]) * factor);

        return [r, g, b, a];
    }
}

export {GridLayer, ContinousGridStyle};
