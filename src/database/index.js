const mysql = require("mysql2");
require("dotenv").config({ path: ".env" });

// Creating connection
let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}).promise();

// Wrapper of .execute method on connection
const query = async (sql, args) => {
    // Check if there are errors in the query
    try {
        // Execute query
        const res = await connection.execute(sql, args);
        // Return BinaryRows
        return res[0];
    } catch (e) {
        // Block the script and give an error
        throw new Error(e);
    }
}

// Exporting wrapper and connection
module.exports = {
    connection,
    query,
}