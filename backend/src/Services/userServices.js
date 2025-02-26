const pool = require("./../db")

class UserServices {
    static async getAllUsers(limit = 5, offset = 0) {
        limit = (limit > 50) ? 50 : limit;

        return await pool.query(query.getAllUsers, [limit, offset]);
    }

    static async getUser(id) {
        return await pool.query(query.getUser, [id]);
    }

    static async updatePasswordForUser(id, password) {
        await pool.query(query.updatePasswordForUser, [id, password]);
    }

    static async createNewUser(username, password) {
        console.log(1)
        const result = await pool.query("select version()", [username, password]);
        console.log(result)
        return result;
    }

    static async getUserByUsername(username) {
        await pool.query(query.getUserByUsername, [username])
    }
}

class query {
    static getAllUsers() {
        return `
        SELECT *
        FROM users
        LIMIT $1 OFFSET $2
        `
    }

    static getUser() {
        return `
        SELECT *
        FROM users
        WHERE id = $1
        `
    }

    static getUserByUsername() {
        return `
        SELECT *
        FROM users
        WHERE username = $1
        `
    }

    static updatePasswordForUser() {
        return `
        UPDATE users
        SET password = $2
        WHERE id = $1 
        `
    }

    static createNewUser() {
        return `
        INSERT INTO users
        (username, password)
        VALUES ($1, $2)        
        `
    }
}

module.exports = UserServices