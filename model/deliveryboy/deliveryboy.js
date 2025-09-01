var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.checkUserOrShop = async (email) => {
    const userQuery = `SELECT * FROM users WHERE u_email = ?`;
    const shopQuery = `SELECT * FROM shops WHERE sh_email = ?`;

    const userResult = await query(userQuery, [email]);
    if (userResult.length > 0) return userResult;

    const shopResult = await query(shopQuery, [email]);
    return shopResult;
};

module.exports.AddDeliveryBoy = async (name, email, mobile, secondary_mobile, whatsapp_contact, hashedPassword, vehicle_type, work_type,location, date, role) => {
    var Query = `insert into users (u_name, u_email,u_password,u_mobile, u_secondary_mobile,u_whatsapp_contact,u_vehicle_type, u_work_type,u_location,u_joindate,u_role)values(?,?,?,?,?,?,?,?,?,?,?)`;
    var data = query(Query, [name, email, hashedPassword, mobile, secondary_mobile, whatsapp_contact, vehicle_type, work_type,location, date, role]);
    return data;
}

module.exports.CheckMobile = async (mobile) => {
  const userQuery = `SELECT * FROM users WHERE u_mobile = ? `;
    const shopQuery = `SELECT * FROM shops WHERE sh_primary_phone = ?`;

    const userResult = await query(userQuery, [mobile]);
    if (userResult.length > 0) return userResult;

    const shopResult = await query(shopQuery, [mobile]);
    return shopResult;
}

module.exports.CheckwhatsappContact = async (mobile) => {
   const userQuery = `SELECT * FROM users WHERE u_whatsapp_contact = ?`;
    const shopQuery = `SELECT * FROM shops WHERE sh_whatsapp_number = ?`;

    const userResult = await query(userQuery, [mobile]);
    if (userResult.length > 0) return userResult;

    const shopResult = await query(shopQuery, [mobile]);
    return shopResult;
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

module.exports.listDeliveryBoyQuery = async (condition,limit,offset) => {
    var Query = ` SELECT * FROM users where u_role ='deliverystaff' ${condition} LIMIT ? OFFSET ?`;
    var data = query(Query,[limit,offset]);
    return data;
}