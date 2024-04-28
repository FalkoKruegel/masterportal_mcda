
/**
 * Class wrappingother style but adding mask to rgba values
 */
class CustomStyle {
    is_filter;
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
    constructor (raster_style) {
        this.is_filter = false;
        this.raster_style = raster_style;
        this.x_min = 0;
        this.x_max = 0;
        this.y_min = 0;
        this.y_max = 0;
    }

    /**
     * sets the attribute of the raster style
     * @param {string} attr attribute to set
     * @returns {void}
     */
    setAttribute (attr) {
        this.raster_style.setAttribute(attr);
    }

    /**
     * sets the start value of the raster style
     * @param {number} start start value
     * @returns {void}
     */
    setStart (start) {
        this.raster_style.setStart(start);
    }

    /**
     * sets the end value of the raster style
     * @param {number} end end value
     * @returns {void}
     */
    setEnd (end) {
        this.raster_style.setEnd(end);
    }

    /**
     * activates the filter
     * @param {boolean} on_off on/off
     * @returns {void}
     */
    setFilter (on_off) {
        this.is_filter = on_off;
    }

    /**
     * sets the range of the filter
     * @param {any} range range
     * @returns {void}
     */
    setRange (range) {
        this.x_min = range.x[0];
        this.x_max = range.x[1];
        this.y_min = range.y[0];
        this.y_max = range.y[1];
    }

    /**
     *  returns the color for given cell value
     * @param {any} props value of grid-cell
     * @returns {any} color as [r, g, b, a]
     */
    getColor (props) {
        const rgba = this.raster_style.getColor(props);
        const x = props.population;
        const y = props.multiCriteria;

        if (this.is_filter) {
            if (x < this.x_min || x > this.x_max || y < this.y_min || y > this.y_max) {
                return [rgba[0], rgba[1], rgba[2], 0.3 * 255];
            }
        }
        return rgba;
    }
}

export {CustomStyle};
