
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

export {convertLayerName};
