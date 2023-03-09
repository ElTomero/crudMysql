const { query } = require("../database");

class Language {
    constructor() {

    }

    async getAll() {
        const exists = await query("SELECT language_name FROM book_language ORDER BY language_name ASC;");
        return exists.length ? exists : false;
    }
}


module.exports = new Language;