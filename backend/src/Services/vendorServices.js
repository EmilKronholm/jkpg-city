const pool = require("./../db")

class VendorServices {
    static async getAllVendors(limit = 5, offset = 0, search = "") {
        const maxLimit = 200;
        limit = (limit > maxLimit) ? maxLimit : limit;
        if (search === "")
            return (await pool.query(query.getAllVendors, [limit, offset])).rows;
        else {
            console.log(search)
            return (await pool.query(query.getAllVendorsWithSearch, [limit, offset, search])).rows;
        }
    }

    static async getVendor(id) {
        console.log(id)
        return (await pool.query(query.getVendor, [id])).rows;
    }

    static async updateVendor(id, url, name, districtFK) {
        (await pool.query(query.updateVendor, [url, name, districtFK])).rows;
    }

    static async createVendor(url, name, district) {
        (await pool.query(query.createVendor, [url, name, district])).rows;
    }

    static async deleteVendor(id) {
        await pool.query(query.createVendor, [id])
    }
}

class query {
    static getAllVendors = `
        SELECT *
        FROM vendors
        ORDER BY name
        LIMIT $1 OFFSET $2
        `;

        static getAllVendorsWithSearch = `
        SELECT *
        FROM vendors
        WHERE name LIKE '%' || $3 || '%'
        ORDER BY name
        LIMIT $1 OFFSET $2

        `;
    static getVendor = `
        SELECT vendor.create_time, vendor.delete_time, vendor.name, vendor.url, district.name AS district 
        FROM vendors AS vendor 
        LEFT JOIN district ON vendor.districtfk = district.id
        WHERE vendor.id = $1
        `;

    static updateVendor = `
        UPDATE vendors
        SET 
            url = $2,
            name = $3,
            districtFK = $4
        WHERE id = $1 
        `;

    static createVendor = `
        INSERT INTO vendors
        (create_time, delete_time, name, url, districtFK)
        VALUES
        (NOW(), null, $1, $2, COALESCE(
            (SELECT id FROM district WHERE LOWER(name) = LOWER($3))
        ))
    `;

    static deleteVendor = `
        UPDATE vendors
        SET
            delete_time = NOW()
        WHERE id = $1
    `;
}

module.exports = VendorServices