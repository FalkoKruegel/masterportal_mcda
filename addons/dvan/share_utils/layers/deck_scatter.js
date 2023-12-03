import {COORDINATE_SYSTEM} from "@deck.gl/core";
import {ScatterplotLayer} from "@deck.gl/layers";

/**
 * deck.gl ScatterplotLayer
 */
class ScatterLayer {
    id;
    name;
    features;

    /**
     * creates a ScatterLayer
     * @param {string} id id of layer
     * @param {string} name name of layer
     * @param {any[]} features feature list
     */
    constructor (id, name, features) {
        this.id = id;
        this.name = name;
        this.features = features;
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

        return feat;
    }

    /**
     * creates a deck-gl layer instance
     * @param {any} style style object
     * @param {number} opacity opacity of layer (between 0 and 1)
     * @param {boolean} update true if layer style changed from previous call
     * @returns {any} deck-gl layer instance
     */
    getLayer (style, opacity, update) {
        return new ScatterplotLayer({
            id: this.id,
            data: this.features,
            pickable: true,
            opacity: 1,
            stroked: true,
            filled: true,
            radiusScale: 1,
            radiusMinPixels: 1,
            radiusMaxPixels: 100,
            lineWidthMinPixels: 1,
            getPosition: d => {
                const coord = d.geometry.coordinates;

                return [coord[0] + 10, coord[1] + 10];
            },
            getRadius: 100,
            getFillColor: [50, 100, 100, 200],
            getLineColor: [50, 100, 100, 200],
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN
        });
    }
}

export {ScatterLayer};
