const { query } = require("../database");

class Publisher {
    constructor() {

    }

    async getAll() {
        const exists = await query("SELECT publisher_name FROM publisher ORDER BY publisher_name ASC;");
        return exists.length ? exists : false;
    }
}


module.exports = new Publisher;