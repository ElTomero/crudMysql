const { query } = require("../database");

class Category {
    constructor() {

    }

    async getAll() {
        const exists = await query("SELECT category_name FROM book_category ORDER BY category_name ASC;");
        return exists.length ? exists : false;
    }
}


module.exports = new Category;