const child_process = require("child_process")
const prompt = require("prompt")

var sessionConfig = {
    in: null,
    out: null,

    columns: null,
    rows: null,
    table: []
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
     * @param {number} refreshRate The speed the output will refresh at
     * @returns {object} `{ columns: int, rows: int }` Columns are lines vertically from left to right, Rows are horizontal loines from top to bottom.
     */
    config: function (stdin, stdout, refreshRate) {
        stdout.clearScreenDown()

        if (!stdin || !stdout || !refreshRate) {
            return console.error(new TypeError("Missing parameters, either 'stdin' or 'stdout' or 'refreshRate'"))
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

        for (let row = 0; row < sessionConfig.rows; row++) {
            for (let col = 0; col < sessionConfig.columns; col++) {
                sessionConfig.table.push(
                    {
                        row: row,
                        col: col,
                        value: ''
                    }
                )
            }
        }

        require("./refresh")(refreshRate, sessionConfig)

        return {
            columns: sessionConfig.columns,
            rows: sessionConfig.rows
        };
    },

    sessionConfig: sessionConfig,

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
        var array = string.split("")

        console.log(col, row, startCol)

        Object.keys(array).forEach(index => {
            var character = array[index]
            var tableElement = sessionConfig.table.findIndex(tab => tab.row == row)

            tableElement.value = character
        })
    }
}