const pool = require("./../db")

class UserServices {
    static async getAllUsers(limit = 5, offset = 0) {
        limit = (limit > 50) ? 50 : limit;

        return (await pool.query(query.getAllUsers, [limit, offset])).rows;
    }

    static async getUser(id) {
        return (await pool.query(query.getUser, [id])).rows;
    }

    static async updateHashedPasswordForUser(id, password) {
        (await pool.query(query.updateHashedPasswordForUser, [id, password])).rows;
    }

    static async createNewUser(username, password) {
        const result = (await pool.query(query.createNewUser, [username, password])).rows
        return result;
    }

    static async getUserByUsername(username) {
        return (await pool.query(query.getUserByUsername, [username])).rows
    }
}

class query {
    static getAllUsers = `
        SELECT *
        FROM users
        LIMIT $1 OFFSET $2
        `;

    static getUser = `
        SELECT *
        FROM users
        WHERE id = $1
        `;

    static getUserByUsername = `
        SELECT *
        FROM users
        WHERE username = $1
        `;

    static updateHashedPasswordForUser = `
        UPDATE users
        SET hashedPassword = $2
        WHERE id = $1 
        `;

    static createNewUser = `
        INSERT INTO users
        (create_time, username, hashed_password)
        VALUES (CURRENT_TIMESTAMP, $1, $2)        
        `;
}

module.exports = UserServices