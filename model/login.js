var db = require('../config/db.js');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.checkUserOrShop = async (email, role) => {
    const userQuery = `
        SELECT 
            u_id AS id, 
            u_email AS email, 
            u_password AS password, 
            u_role AS role 
        FROM users 
        WHERE u_email = ? AND u_role = ? `;

    const shopQuery = `
        SELECT
            sh_id AS id, 
            sh_email AS email, 
            sh_password AS password, 
            'shop' AS role 
        FROM shops 
        WHERE sh_email = ? `;

    // If role is user or deliverystaff → check users table
    if (role === "user" || role === "deliverystaff") {
        const userResult = await query(userQuery, [email, role]);
        return userResult.length > 0 ? userResult[0] : null;
    }

    // If role is shop → check shops table
    if (role === "shop") {
        const shopResult = await query(shopQuery, [email]);
        return shopResult.length > 0 ? shopResult[0] : null;
    }

    // Unknown role
    return null;
};
