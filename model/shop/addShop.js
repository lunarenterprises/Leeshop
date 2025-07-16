var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.addshop = async (service_or_shop, shop_name, owner_name, business_category, shop_address, state, city, working_days, description, primary_phone, secondary_phone, whatsapp_number, email, password, product_and_service, opening_hours, location, delivery_option, service_area_coverage) => {
    var Query = `INSERT INTO shops (sh_shop_or_service,sh_name,sh_owner_name,sh_category,sh_address,sh_state,sh_city,sh_working_days,sh_description,sh_primary_phone,sh_secondary_phone,sh_whatsapp_number,sh_email,sh_password,sh_product_and_service,sh_opening_hours,sh_location,sh_delivery_option,sh_service_area_coverage) VALUES ( ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    var data = query(Query, [service_or_shop, shop_name, owner_name, business_category, shop_address, state, city, working_days, description, primary_phone, secondary_phone, whatsapp_number, email, password, product_and_service, opening_hours, location, delivery_option, service_area_coverage]);
    return data;
}

module.exports.AddImagesQuery = async (shop_id, imagepath) => {
    var Query = `INSERT INTO shopimages (si_shop_id,si_image) VALUES ( ?, ?)`;
    var data = query(Query, [shop_id, imagepath]);
    return data;
}

module.exports.listshopsQuerry = async (condition) => {
    var Query = `select * from shops ${condition} `;
    var data = await query(Query);
    return data;
}

module.exports.GetImages = async (si_shop_id) => {
    var Query = `select * from shopimages where si_shop_id=?`;
    var data = await query(Query, [si_shop_id]);
    return data;
}

module.exports.checkshopQuery = async (sh_id) => {
    var Query = `select * from shops where sh_id=?`;
    var data = await query(Query, [sh_id]);
    return data;
}

module.exports.removeshopQuery = async (sh_id) => {
    var Query = `delete from shops where sh_id=?`;
    var data = await query(Query, [sh_id]);
    return data;
}

module.exports.viewshopsQuerry = async (sh_id) => {
    var Query = `select * from shops where sh_id=?`;
    var data = await query(Query, [sh_id]);
    return data;
}

module.exports.UpdateshopDetails = async (updateQuery, sh_id) => {
    var Query = `update shops ${updateQuery} where sh_id=?`;
    var data = await query(Query, [sh_id]);
    return data;

}

module.exports.updateshopImage = async (imagepath, shop_id) => {
    var Query = `update shops set si_image=? where sh_id=?`;
    var data = await query(Query, [imagepath, shop_id]);
    return data;
}

module.exports.DeleteFilesQuery = async (sh_id, fileKeys) => {
    var Query = `delete from shopimages where si_shop_id=? and s_id not in (${fileKeys})`;
    var data = await query(Query, [sh_id, fileKeys]);
    return data;
}