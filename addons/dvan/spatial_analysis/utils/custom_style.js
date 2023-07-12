
/**
 * Class wrappingother style but adding mask to rgba values
 */
class CustomStyle {
    x_min;
    y_min;
    x_max;
    y_max;
    raster_style;


    /**
     *
     * @param {*} raster_style raster style to wrap
     * @param {*} x_min min x value of mask
     * @param {*} y_min min y value of mask
     * @param {*} x_max max x value of mask
     * @param {*} y_max max y value of mask
     */
    constructor (raster_style, x_min, y_min, x_max, y_max) {
        this.raster_style = raster_style;
        this.x_min = x_min;
        this.x_max = x_max;
        this.y_min = y_min;
        this.y_max = y_max;
    }

    /**
     *  returns the color for given cell value
     * @param {any} value value of grid-cell
     * @returns {any} color as [r, g, b, a]
     */
    getRGBA (value) {
        const rgba = this.raster_style.getRGBA(value);
        const x = value.population;
        const y = value.result;

        if (x < this.x_min || x > this.x_max || y < this.y_min || y > this.y_max) {
            return [rgba[0], rgba[1], rgba[2], 0.3];
        }
        return rgba;
    }
}

export {CustomStyle};
