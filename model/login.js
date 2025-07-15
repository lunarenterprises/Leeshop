var db = require('../config/db.js');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.checkuser = async (email, role) => {
    var Query = `select * from users where u_email =? and u_role=?`
    var data = query(Query, [email, role]);
    return data;

};  