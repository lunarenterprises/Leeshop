var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.AddDeliveryBoy = async (name, email, mobile, secondary_mobile, whatsapp_contact, hashedPassword, vehicle_type, work_type, date, role) => {
    var Query = `insert into users (u_name, u_email,u_password,u_mobile, u_secondary_mobile,u_whatsapp_contact,u_vehicle_type, u_work_type,u_joindate,u_role)values(?,?,?,?,?,?,?,?,?,?)`;
    var data = query(Query, [name, email, hashedPassword, mobile, secondary_mobile, whatsapp_contact, vehicle_type, work_type, date, role]);
    return data;
}

module.exports.CheckMail = async (email) => {
    var Query = ` SELECT * FROM users WHERE u_email= ?`;
    var data = query(Query, [email]);
    return data;
}

module.exports.CheckMobile = async (email) => {
    var Query = ` SELECT * FROM users WHERE u_mobile= ?`;
    var data = query(Query, [email]);
    return data;
}

module.exports.CheckwhatsappContact = async (email) => {
    var Query = ` SELECT * FROM users WHERE u_whatsapp_contact= ?`;
    var data = query(Query, [email]);
    return data;
}

module.exports.AddLicenceImage = async (licencePath, u_id) => {
    var Query = ` insert into users (dl_u_id,dl_image) values (?,?)`;
    var data = query(Query, [licencePath, u_id]);
    return data;
}

module.exports.CheckDeliveryStaffQuery = async (u_id) => {
    var Query = ` SELECT * FROM users WHERE u_id= ?`;
    var data = query(Query, [u_id]);
    return data;
}

module.exports.ChangeDeliveryStaffInfo = async (condition, u_id) => {
    var Query = `update users ${condition} WHERE u_id= ?`;
    var data = query(Query, [u_id]);
    return data;
}

module.exports.UpdateProfileimage = async (profileimage, u_id) => {
    var Query = `update users set u_profile_pic=? WHERE u_id= ?`;
    var data = query(Query, [profileimage, u_id]);
    return data;
}

module.exports.UpdateLicenceimage = async (licenceimage, u_id) => {
    var Query = `update users set u_licence_pic=? WHERE u_id= ?`;
    var data = query(Query, [licenceimage, u_id]);
    return data;
}

module.exports.DeleteDeliveryBoyQuery = async (u_id) => {
    var Query = `delete from users WHERE u_id= ?`;
    var data = query(Query, [u_id]);
    return data;
}

module.exports.listDeliveryBoyQuery = async (condition) => {
    var Query = ` SELECT * FROM users where u_role ='deliverystaff' ${condition}`;
    var data = query(Query);
    return data;
}