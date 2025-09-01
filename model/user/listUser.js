var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListUserQuery = async (condition) => {
    var Query = `SELECT u_id, u_name, u_email, u_mobile, u_secondary_mobile, 
    u_whatsapp_contact, u_vehicle_type, u_work_type, u_profile_pic, u_licence_pic, 
    u_address, u_district, u_state, u_location, u_pincode, u_joindate, u_role, u_rating, u_status 
    FROM users where u_role='user' ${condition} `;
    var data = query(Query);
    return data;
};
module.exports.delteuserquery=async(u_id)=>{
    var Query=`DELETE FROM users WHERE u_id=?`;
    var data = query(Query,[u_id]);
    return data;
}