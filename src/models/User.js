const {query} = require ("../database");
const jwt = require('jsonwebtoken');
        
class User {
    constructor () {}
        
    async createUser(name, surname, email_id, password, role) {
        const result = await query("INSERT INTO users (name, surname, email_id, password, role) VALUES (?, ?, ?, ?, ?)", [name, surname, email_id, password, role]);
        return result;
    }
        
    async getUserId(email_id) {
        const result = await query("SELECT id FROM users WHERE email_id = ?", [email_id]);
        return result.length ? result[0].id : null;
    }
        
    async generateAuthToken(email_id, role) {
        const userId = await this.getUserId(email_id);
        if (!userId) return null;
        
        const privateKey = fs.readFileSync('private.key');
        const token = jwt.sign({id: userId, role: role}, privateKey, {algorithm: 'RS256'});
        return token;
    }
        
    async registerUser (name, surname, email_id, password, role) {
        const result = await this.createUser(name, surname, email_id, password, role);
        const token = await this.generateAuthToken(email_id, role);
        return token;
    }
}

module.exports = new User();

