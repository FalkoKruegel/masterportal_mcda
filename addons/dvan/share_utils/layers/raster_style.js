
/**
 * grid-laser style
 */
class RasterStyle {
    attribute;
    start_color;
    end_color;
    no_data;
    no_data_color;
    ranges;
    colors;

    /**
     * constructor
     * @param {string} attribute value attribute name
     * @param {any} start_color start color of color range
     * @param {any} end_color end color of color range
     * @param {number[]} ranges color ranges
     * @param {number} no_data no data value
     * @param {any} no_data_color no data color
     */
    constructor (attribute, start_color, end_color, ranges, no_data = -9999, no_data_color = [25, 25, 25, 0.5]) {
        this.attribute = attribute;
        this.start_color = start_color;
        this.end_color = end_color;
        this.ranges = ranges.sort((a, b) => a < b ? -1 : 1);
        this.colors = [];
        this.no_data = no_data;
        this.no_data_color = no_data_color;
        for (let i = 0; i <= this.ranges.length; i++) {
            const r = Math.floor(this.start_color[0] + (this.end_color[0] - this.start_color[0]) * i / this.ranges.length);
            const g = Math.floor(this.start_color[1] + (this.end_color[1] - this.start_color[1]) * i / this.ranges.length);
            const b = Math.floor(this.start_color[2] + (this.end_color[2] - this.start_color[2]) * i / this.ranges.length);
            const a = Math.floor(this.start_color[3] + (this.end_color[3] - this.start_color[3]) * i / this.ranges.length);

            this.colors.push([r, g, b, a]);
        }
    }

    /**
     *  returns the color for given cell value
     * @param {any} value value of grid-cell
     * @returns {any} color as [r, g, b, a]
     */
    getRGBA (value) {
        if (value[this.attribute] === this.no_data) {
            return this.no_data_color;
        }
        for (let i = 0; i < this.ranges.length; i++) {
            if (value[this.attribute] < this.ranges[i]) {
                return this.colors[i];
            }
        }
        return this.colors[this.colors.length - 1];
    }
}

export {RasterStyle};
