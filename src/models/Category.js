const { query } = require("../database");

class Category {
    constructor() {

    }

    async getAll() {
        const exists = await query("SELECT * FROM book_category");
        return exists.length ? exists : false;
    }
}

module.exports = new Category;