
/**
 * grid-laser style
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
     *  returns the color for given cell value
     * @param {any} value value of grid-cell
     * @returns {any} color as [r, g, b, a]
     */
    getRGBA (value) {
        const val = value[this.attribute];

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

export {ContinousGridStyle};
