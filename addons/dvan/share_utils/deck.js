import {getBaseMap} from "./map.js";
import {Deck, OrthographicView} from "@deck.gl/core";
import {Layer} from "ol/layer";
import {Source} from "ol/source";
import GeoJSON from "ol/format/GeoJSON.js";

/**
 * creates an ol-layer wrapping the deck-layer
 * @param {any} layer layer object
 * @param {any} style style object used to call "layer.getLayer(styleObj)"" function
 * @returns {any} ol-layer
 */
function initDeckLayer (layer, style) {
    // const mapregion = document.getElementById("map");
    const canvas = document.createElement("canvas");

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.zIndex = "0";

    const props = {
        visibile: true,
        style: style,
        opacity: 1
    };

    let deck_layer = layer.getLayer(props.style, props.opacity, true);

    const deck = new Deck({
        initialViewState: {target: [0, 0, 0], zoom: 1},
        controller: false,
        canvas: canvas,
        style: {pointerEvents: "none"},
        views: new OrthographicView({flipY: false}),
        layers: [deck_layer],
        layerFilter: () => {
            return props.visibile;
        }
    });
    /**
     * needed for eslint config
     * @param {boolean} update true if layer style changed from previous call
     * @returns {void}
     */
    const updateDeck = (update) => {
        deck_layer = layer.getLayer(props.style, props.opacity, update);
        deck.setProps({layers: [deck_layer]});
        deck.redraw();
    };

    // Sync deck view with OL view
    const ol_layer = new Layer({
        id: layer.getID(),
        name: layer.getName(),
        typ: "Deck",
        render: ({size, viewState}) => {
            const [width, height] = size;
            const target = [viewState.center[0], viewState.center[1], 0];
            const zoom = -Math.log2(viewState.resolution);
            const deckViewState = {target: target, zoom: zoom};

            deck.setProps({width, height, viewState: deckViewState});
            deck.redraw();
            ol_layer.rendered = true;

            return canvas;
        },
        source: new Source({})
    });

    // ol_layer.setZIndex = (value) => {
    //     canvas.style.zIndex = String(value);
    // };
    // ol_layer.setVisible = (value) => {
    //     props.visibile = value;
    //     updateDeck(false);
    // };
    ol_layer.setOpacity = (value) => {
        props.opacity = value;
        updateDeck(true);
    };
    ol_layer.getStyle = () => {
        return props.style;
    };
    ol_layer.setStyle = (style) => {
        props.style = style;
        updateDeck(true);
    };
    ol_layer.renderer_ = {};
    ol_layer.getRenderer().forEachFeatureAtCoordinate = (coordinate, frameState, hitTolerance, callback, matches) => {
        const pixel = getBaseMap().getPixelFromCoordinate(coordinate);
        const ids = deck.pickMultipleObjects({x: pixel[0], y: pixel[1], layerIds: [deck_layer.id]});

        if (ids.length <= 0) {
            return;
        }

        for (const {index} of ids) {
            const geojson = layer.getFeature(index);
            const feature = new GeoJSON().readFeature(geojson);

            callback(feature, ol_layer, feature.getGeometry());
        }
    };
    ol_layer.set("visibile", true);
    ol_layer.on("remove", (event) => {
        // canvas.remove();
    });
    ol_layer.on("add", (event) => {
        // mapregion.appendChild(canvas);
    });

    return ol_layer;
}

export {initDeckLayer};
