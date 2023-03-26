const {query} = require ("../database");
const jwt = require('jsonwebtoken');
        
class User {
    constructor () {}
        
    async createUser(name, surname, email_id, password, role) {
        const result = await query("INSERT INTO users (name, surname, email_id, password, role) VALUES (?, ?, ?, ?, ?)", [name, surname, email_id, password, role]);
        return result;
    }
        
    async getUserId(user_id) {
        const id = await query("SELECT id FROM users WHERE user_id = ?", [user_id]);        
        return id.length ? id[0].id : null;
    }
    
    async getUserRole(role) {
        const result = await query("SELECT role FROM users WHERE role = ?", [role]);
        return role.lenght ? result[0].role : null;
    }

    async generateAuthToken(user_id, role) {
        const userId = await this.getUserId(user_id);
        if (!userId) return null;
        const role = await this.getUserRole(role);
        if (!role) return null;
        const token = jwt.sign({ id: userId, role: role }, 'chiave', {expiresIn: '1h'});
        return token;
    }
        
    async registerUser (name, surname, email_id, password, role, user_id) {
        const result = await this.createUser(name, surname, email_id, password, role);
        const token = await this.generateAuthToken(user_id, role);
        return token;
    }
}

module.exports = new User();

