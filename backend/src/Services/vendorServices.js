const pool = require("./../db")

class VendorServices {
    static async getAllVendors(limit = 5, offset = 0, search = "", order) {

        const getOrderSQL = (order) => {
            switch (order) {
                case "recent":
                    return "ORDER BY create_time DESC";
                case 'oldest':
                    return "ORDER BY create_time ASC";
                case 'alphabetic-desc':
                    return "ORDER BY name DESC";
                case 'alphabetic-asc':
                    return "ORDER BY name ASC";
                default:
                    console.log("ORDER WAS WRONG NOW WE HAVE TO DEAFULT", order)
                    return "ORDER BY name DESC"
            }
        }

        if (search != "") {
            const query = `
                SELECT *
                FROM vendors
                WHERE delete_time IS null AND NAME LIKE '%' || $3 || '%'
                ${getOrderSQL(order)}
                LIMIT $1 OFFSET $2
            `;

            return (await pool.query(query, [limit, offset, search])).rows;
        } else {
            const query = `
                SELECT *
                FROM vendors
                WHERE delete_time IS null
                ${getOrderSQL(order)}
                LIMIT $1 OFFSET $2
            `;
            return (await pool.query(query, [limit, offset])).rows;
        }
    }

    static async getVendor(id) {
        console.log(id)
        return (await pool.query(query.getVendor, [id])).rows;
    }

    static async updateVendor(id, url, name, district) {
        (await pool.query(query.updateVendor, [id, url, name, district])).rows;
    }

    static async createVendor(url, name, district) {
        (await pool.query(query.createVendor, [url, name, district])).rows;
    }

    // This performs a soft delete
    static async deleteVendor(id) {
        await pool.query(query.deleteVendor, [id])
    }

    static async deleteVendorPERMANENTLY(id) {
        await pool.query(query.deleteVendorPERMANENTLY, [id])
    }
}

class query {
    static getAllVendors = `
        SELECT *
        FROM vendors
        WHERE delete_time IS null
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
            districtFK = COALESCE(
            (SELECT id FROM district WHERE LOWER(name) = LOWER($4))
        )
        WHERE id = $1 
        `;

    static createVendor = `
        INSERT INTO vendors
        (create_time, delete_time, name, url, districtFK)
        VALUES
        (NOW(), null, $2, $1, COALESCE(
            (SELECT id FROM district WHERE LOWER(name) = LOWER($3))
        ))
    `;

    static deleteVendor = `
        UPDATE vendors
        SET
            delete_time = NOW()
        WHERE id = $1
    `;

    static deleteVendorPERMANENTLY = `
        DELETE FROM vendors
        WHERE id = $1
    `;
}

module.exports = VendorServices