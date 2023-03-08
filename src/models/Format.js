const { query } = require("../database");

class Format {
    constructor() {

    }

    async getAll() {
        const exists = await query("SELECT format_name FROM book_format");
        return exists.length ? exists : false;
    }
}

module.exports = new Format;