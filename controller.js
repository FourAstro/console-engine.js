const child_process = require("child_process")
const prompt = require("prompt")

var sessionConfig = {
    in: null,
    out: null,
    columns: null,
    rows: null,
}

module.exports = {
    /**
     * Intiate console-engine.js
     * @param {*} stdin 
     * @param {*} stdout 
     */
    config: function (stdin, stdout) {
        console.clear()

        if (!stdin || !stdout) {
            return console.log(new TypeError("Missing parameters, either 'stdin' or 'stdout'"))
        }

        sessionConfig.in = stdin
        sessionConfig.out = stdout

        if (!sessionConfig.out.columns || !sessionConfig.out.rows) {
            return console.log(new TypeError("'stdout' does not have either 'columns' or 'rows' parameter"))
        }

        sessionConfig.columns = sessionConfig.out.columns
        sessionConfig.rows = sessionConfig.out.rows

        return true;
    }
}