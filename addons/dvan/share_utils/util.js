/**
 * converts a canvas to image/png blob
 * @param {any} canvas canvas to be converted
 * @returns {any} image blob
 */
async function canvasToPNG (canvas) {
    return new Promise(resolve => canvas.toBlob((blob) => resolve(blob), "image/png"));
}

/**
 * creates a legend function from style model
 * @param {*} style style model
 * @returns {*} legend function
 */
async function getLegendFromStyleModel (style) {
    const legendinfo = style.getLegendInfos();
    const legend = [];

    for (const element of legendinfo) {
        const l = {};
        const img = element.styleObject.getStyle().getImage().getImage(1);

        let png = null;

        if (typeof img.toBlob !== "function") {
            png = img.src;
        }
        else {
            png = URL.createObjectURL(await canvasToPNG(img));
        }
        l.name = element.label;
        l.graphic = png;
        legend.push(l);
    }

    return legend;
}

/**
 * creates a legend obj from wms
 * @param {*} layer wms layer
 * @param {*} resolution resolution
 * @returns {*} legend object
 */
async function getLegendFromWMS (layer, resolution) {
    const legend = [];

    try {
        const graphicUrl = layer.getSource().getLegendUrl(resolution);

        legend.push(graphicUrl);
        return legend;
    }
    catch {
        return legend;
    }
}

export {canvasToPNG, getLegendFromStyleModel, getLegendFromWMS};
