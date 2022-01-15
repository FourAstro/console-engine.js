const child_process = require("child_process")
const prompt = require("prompt")
const matrix_js = require("matrix-js")

var sessionConfig = {
    in: null,
    out: null,

    columns: null,
    rows: null,
    matrix: null,
}

/**
 *     COLUMN - COLUMN - COLUMN - COLUMN - COLUMN - COLUMN
 * ROW
 * ROW
 * ROW
 * ROW
 * ROW
 */

module.exports = {
    /**
     * Intiate console-engine.js
     * @param {*} stdin 
     * @param {*} stdout 
     * @param {Boolean} calibrate If you would like a animation.
     * @returns {Object} `{ columns: int, rows: int }` Columns are lines vertically from left to right, Rows are horizontal loines from top to bottom.
     */
    config: function (stdin, stdout) {
        console.clear()

        if (!stdin || !stdout) {
            return console.error(new TypeError("Missing parameters, either 'stdin' or 'stdout'"))
        }

        //* Not used anymore
        // if (typeof calibrate != Boolean) {
        //     return console.error(new TypeError("Missing parameters, 'calibrate' is not a boolean"))
        // }

        sessionConfig.in = stdin
        sessionConfig.out = stdout

        if (!sessionConfig.out.columns || !sessionConfig.out.rows) {
            return console.error(new TypeError("'stdout' does not have either 'columns' or 'rows' parameter"))
        }

        sessionConfig.columns = sessionConfig.out.columns
        sessionConfig.rows = sessionConfig.out.rows

        sessionConfig.matrix = matrix_js([sessionConfig.columns, sessionConfig.rows])

        return {
            columns: sessionConfig.columns,
            rows: sessionConfig.rows,
        };
    },

    sessionConfig: sessionConfig,
    matrix: sessionConfig.matrix,

    /**
     * Center 1 line of string (text)
     * @param {String} string 
     */
    center: function (string) {
        if (!string) {
            return console.error(new TypeError("Missing 'string' parameter"))
        }

        var col = Math.floor(sessionConfig.columns / 2)
        var row = Math.floor(sessionConfig.rows / 2)
        var startCol = col - string.length
    }
}