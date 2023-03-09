const { query } = require("../database");

class Author {
    constructor() {

    }

    async getAll() {
        const exists = await query("SELECT author_name, author_surname FROM book_author ORDER BY author_surname ASC;");
        return exists.length ? exists : false;
    }
}


module.exports = new Author;