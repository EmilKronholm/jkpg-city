const pool = require("./../db")

class VendorServices {
    static async getAllVendors(limit = 5, offset = 0) {
        const maxLimit = 50;
        limit = (limit > maxLimit) ? maxLimit : limit;
        return (await pool.query(query.getAllVendors, [limit, offset])).rows;
    }

    static async getVendor(id) {
        return (await pool.query(query.getVendor, [id])).rows;
    }

    static async updateVendor(id, url, name, districtFK) {
        (await pool.query(query.updatePasswordForUser, [id, url, name, districtFK])).rows;
    }
}

class query {
    static getAllVendors = `
        SELECT *
        FROM vendors
        ORDER BY name
        LIMIT $1 OFFSET $2
        `;

    static getVendor = `
        SELECT *
        FROM vendors
        WHERE id = $1
        `;

    static updatePasswordForUser = `
        UPDATE users
        SET 
            url = $2,
            name = $3,
            districtFK = $4
        WHERE id = $1 
        `;
}

module.exports = VendorServices