const {query} = require ("../database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 10
        
class User {
    constructor () {}
        
    async createUser(name, surname, email_id, password, role) {
        const hashedPasswd = await bcrypt.hash(password, saltRounds)
        const result = await query("INSERT INTO users (name, surname, email_id, password, role) VALUES (?, ?, ?, ?, ?)", [name, surname, email_id, hashedPasswd, role]);
        return result;
    }
        
    async getUserId(user_id) {
        const id = await query("SELECT id FROM users WHERE user_id = ?", [user_id]);        
        return id.length ? id[0].id : null;
    }
    
    async getUserRole(role) {
        const result = await query("SELECT role FROM users WHERE role = ?", [role]);
        return result.length ? result[0].role : null;
    }

    async generateAuthToken(user_id, User_role) {
        const userId = await this.getUserId(user_id);
        if (!userId) return null;
        const role = await this.getUserRole(User_role);
        if (!role) return null;
        const token = jwt.sign({ id: userId, role: role }, 'secret', {expiresIn: '1h'});
        return token;
    }
        
    async registerUser(name, surname, email_id, hashedPasswd, role, user_id) {
        const result = await this.createUser(name, surname, email_id, hashedPasswd, role);
        const token = await this.generateAuthToken(user_id, role);
        return token;
    }

    async getUserPasswd(user_id) {
        const result = await query('SELECT password FROM users WHERE user_id = ?', [user_id]);
        return result.length ? result : false;
    }

    async getUserEmailId(user_id) {
        const result = await query('SELECT email_id FROM users WHERE user_id = ?', [user_id]);
        return result.length ? result : false;
        }
    
    async verifyUserByPassword(user_id) {
        const resPassword = await this.getUserPasswd(user_id);
        const resEmail = await this.getUserEmailId(user_id);
        const resPasswd = await bcrypt.compare()
    }

}

module.exports = new User();

