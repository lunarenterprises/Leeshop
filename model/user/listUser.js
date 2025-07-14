var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListUserQuery = async (condition) => {
    var Query = `SELECT * FROM users where u_role='user' ${condition} `;
    var data = query(Query);
    return data;
};