const { query } = require("../database");

class Format {
    constructor() {

    }

    async getAll() {
        const exists = await query("SELECT format_name FROM book_format ORDER BY format_name ASC;");
        return exists.length ? exists : false;
    }
}

module.exports = new Format;