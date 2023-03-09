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

/**
 * function converting layer-names to readable format
 * @param {string} name layer name
 * @returns {string} readable layer-name
 */
function convertLayerName (name) {
    switch (name) {
        case "multiCritera":
            return "Versorgungssituation";
        case "supermarket":
            return "Supermärkte";
        case "discounter":
            return "Discounter";
        case "others":
            return "sonstige Lebensmittelgeschäfte";
        case "pharmacies":
            return "Apotheken";
        case "clinics":
            return "Hochschulkliniken und Plankrankenhäuser";
        case "physicians":
            return "Ärzte";
        case "general_physicians":
            return "Hausärzte";
        case "paediatricians":
            return "Kinder- und Jugendärzte";
        case "ophthalmologists":
            return "Augenärzte";
        case "surgeons":
            return "Chirurgen und Orthopäden";
        case "gynaecologists":
            return "Frauenärzte";
        case "dermatologists":
            return "Hautärzte";
        case "otolaryngologist":
            return "HNO-Ärzte";
        case "neurologist":
            return "Nervenärzte";
        case "psychotherapists":
            return "Psychotherapeuten";
        case "urologists":
            return "Urologen";
        case "nurseries":
            return "Kindertagesstätten";
        case "primary_schools":
            return "Primärschulen";
        case "secondary_1":
            return "Sekundarstufe Bereich 1 & 2; ohne (Fach)Hochschulreife";
        case "secondary_2":
            return "Sekundarstufe Bereich 1 & 2; mit (Fach)Hochschulreife";
        default:
            return "";
    }
}

export {canvasToPNG, getLegendFromStyleModel, getLegendFromWMS, convertLayerName};
