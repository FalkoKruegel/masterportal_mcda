
/**
 * function converting layer-names to readable format
 * @param {string} name layer name
 * @returns {string} readable layer-name
 */
function convertLayerName (name) {
    switch (name) {
        case "multiCriteria":
            return "Versorgungssituation";
        case "supermarket":
            return "Supermärkte";
        case "discounter":
            return "Discounter";
        case "other_local_supply":
            return "sonstige Lebensmittelgeschäfte";
        case "pharmacy":
            return "Apotheken";
        case "clinic":
            return "Hochschulkliniken und Plankrankenhäuser";
        case "physicians":
            return "Ärzte";
        case "general_physician":
            return "Hausärzte";
        case "paediatrician":
            return "Kinder- und Jugendärzte";
        case "ophthalmologist":
            return "Augenärzte";
        case "surgeon":
            return "Chirurgen und Orthopäden";
        case "gynaecologist":
            return "Frauenärzte";
        case "dermatologist":
            return "Hautärzte";
        case "otolaryngologist":
            return "HNO-Ärzte";
        case "neurologist":
            return "Nervenärzte";
        case "psychotherapist":
            return "Psychotherapeuten";
        case "urologist":
            return "Urologen";
        case "nursery":
            return "Kindertagesstätten";
        case "primary_school":
            return "Primärschulen";
        case "secondary_school_1":
            return "Sekundarstufe Bereich 1 & 2; ohne (Fach)Hochschulreife";
        case "secondary_school_2":
            return "Sekundarstufe Bereich 1 & 2; mit (Fach)Hochschulreife";
        default:
            return "";
    }
}

export {convertLayerName};
