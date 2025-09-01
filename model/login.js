var db = require('../config/db.js');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.checkUserOrShop = async (email) => {
    const userQuery = `SELECT u_id AS id, u_email AS email, u_password AS password, u_role AS role, 'user' AS source FROM users WHERE u_email = ?`;
    const shopQuery = `SELECT sh_id AS id, sh_email AS email, sh_password AS password, 'shop' AS role, 'shop' AS source FROM shops WHERE sh_email = ?`;

    const userResult = await query(userQuery, [email]);
    if (userResult.length > 0) return userResult;

    const shopResult = await query(shopQuery, [email]);
    return shopResult;
};
 