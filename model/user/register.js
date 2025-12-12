var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db)


module.exports.AddUser = async (name, email, mobile, hashedPassword, address, district, state, zipcode, date) => {
    var Query = `INSERT INTO users(u_name,u_email,u_mobile,u_password,u_address,u_district,u_state,u_pincode,u_joindate)values(?,?,?,?,?,?,?,?,?);`
    var data = query(Query, [name, email, mobile, hashedPassword, address, district, state, zipcode, date]);
    return data;
}

module.exports.checkUserOrShop = async (email) => {
    const userQuery = `SELECT * FROM users WHERE u_email = ? and u_role ='user'`;
    const shopResult = await query(userQuery, [email]);
    return shopResult;
};