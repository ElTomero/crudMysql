const {query} = require ("../database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 10
        
class User {
    constructor () {}
        
    async createUser(name, surname, email_id, password) {
        const hashedPasswd = await bcrypt.hash(password, saltRounds);
        const createdAt = new Date();
        const result = await query("INSERT INTO users (name, surname, email_id, password, registration_date) VALUES (?, ?, ?, ?, ?)", [name, surname, email_id, hashedPasswd, createdAt]);
        return result;
    }
        
    async getUserId(user_id) {
        const id = await query("SELECT user_id FROM users WHERE user_id = ?", [user_id]);        
        return id.length ? id[0].id : null;
    }
    
    async getUserRole(role) {
        const result = await query("SELECT role FROM users WHERE role = ?", [role]);
        return result.length ? result[0].role : null;
    }

    async generateAuthToken(user_id) {
        const token = jwt.sign({ id: user_id}, 'secret', {expiresIn: '1h'});
        return token;
    }
        
    async registerUser(name, surname, email_id, hashedPasswd) {
        const result = await this.createUser(name, surname, email_id, hashedPasswd);
        const user = await query("SELECT user_id FROM users WHERE email_id = ?", [email_id]);
        const token = await this.generateAuthToken(user[0].user_id);
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
        //const resEmail = await this.getUserEmailId(user_id);
        const resPasswd = await bcrypt.compare()
    }

}

module.exports = new User();

