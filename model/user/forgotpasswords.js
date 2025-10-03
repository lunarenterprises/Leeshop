var db = require("../../config/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.checkUserOrShop = async (email) => {
    const userQuery = `SELECT u_id AS id, u_email AS email, u_password AS password, u_role AS role, 'user' AS source FROM users WHERE u_email = ?`;
    const shopQuery = `SELECT sh_id AS id, sh_email AS email, sh_password AS password, 'shop' AS role, 'shop' AS source FROM shops WHERE sh_email = ?`;

    const userResult = await query(userQuery, [email]);
    if (userResult.length > 0) return userResult;

    const shopResult = await query(shopQuery, [email]);
    return shopResult;
};


module.exports.Shopupdatepassword = async (password, email) => {
    var Query = `update shops set sh_password=? where sh_email=?`;
    var data = await query(Query, [password, email]);
    return data;
};

module.exports.Userupdatepassword = async (password, email) => {
    var Query = `update users set u_password=? where u_email=?`;
    var data = await query(Query, [password, email]);
    return data;
};
module.exports.ShopStoreResetToken = async (token, expirationDate, sh_id) => {
    var Query = `update shops SET sh_token = ?, sh_token_expiry = ? WHERE sh_id = ?`;
    var data = await query(Query, [token, expirationDate, sh_id]);
    return data;
};

module.exports.UserStoreResetToken = async (token, expirationDate, u_id) => {
    var Query = `update users SET u_token = ?, u_token_expiry = ? WHERE u_id = ?`;
    var data = await query(Query, [token, expirationDate, u_id]);
    return data;
};

module.exports.ShopValidateResetToken = async (email, otp) => {
    var Query = `select * FROM shops WHERE sh_email=? AND sh_token=? AND sh_otp_status='unverified' `;
    var data = await query(Query, [email, otp]);
    return data;
};

module.exports.UserValidateResetToken = async (email, otp) => {
    var Query = `select * FROM users WHERE u_email=? AND u_token=? AND u_otp_status='unverified' `;
    var data = await query(Query, [email, otp]);
    return data;
};

module.exports.ShopupdateOtpStatus = async (email, status) => {
    var Query = `update shops set sh_otp_status=? where sh_email=?`;
    var data = await query(Query, [status, email]);
    return data;
}

module.exports.USerupdateOtpStatus = async (email, status) => {
    var Query = `update users set u_otp_status=? where u_email=?`;
    var data = await query(Query, [status, email]);
    return data;
}


