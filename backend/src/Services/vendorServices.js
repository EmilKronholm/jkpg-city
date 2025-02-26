const pool = require("./../db")

class VendorServices {
    static async getAllVendors(limit = 5, offset = 0) {
        limit = (limit > 50) ? 50 : limit;
        
        return await pool.query(query.getAllVendors, [limit, offset]);
    }
    
    static async getVendor(id) {
        return await pool.query(query.getVendor, [id]);
    }

    static async updateVendor(id, url, name, districtFK) {
        await pool.query(query.updatePasswordForUser, [id, url, name, districtFK]);
    }
}

class query {
    static getAllVendors() {
        return `
        SELECT *
        FROM vendors
        LIMIT $1 OFFSET $2
        `
    }

    static getVendor() {
        return `
        SELECT *
        FROM vendors
        WHERE id = $1
        `
    }

    static updatePasswordForUser() {
        return `
        UPDATE users
        SET 
            url = $2as,
            name = $3,
            districtFK = $4
        WHERE id = $1 
        `
    }
}

module.exports = VendorServices