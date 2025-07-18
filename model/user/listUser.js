var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListUserQuery = async (condition) => {
    var Query = `SELECT * FROM users where u_role='user' ${condition} `;
    var data = query(Query);
    return data;
};
module.exports.delteuserquery=async(u_id)=>{
    var Query=`DELETE FROM users WHERE u_id=?`;
    var data = query(Query,[u_id]);
    return data;
}