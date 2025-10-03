var db = require('../../config/db');
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

module.exports.addshop = async (service_or_shop, shop_name, owner_name, category_id, category_name, shop_address, state, city, working_days, description, primary_phone, secondary_phone, whatsapp_number, email, password, product_and_service, opening_hours, location, latitude, longitude, delivery_option, service_area_coverage) => {
    var Query = `INSERT INTO shops (sh_shop_or_service,sh_name,sh_owner_name,sh_category_id,sh_category_name,sh_address,sh_state,sh_city,sh_working_days,sh_description,sh_primary_phone,sh_secondary_phone,sh_whatsapp_number,sh_email,sh_password,sh_product_and_service,sh_opening_hours,sh_location,sh_latitude ,sh_longitude,sh_delivery_option,sh_service_area_coverage) VALUES ( ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    var data = query(Query, [service_or_shop, shop_name, owner_name, category_id, category_name, shop_address, state, city, working_days, description, primary_phone, secondary_phone, whatsapp_number, email, password, product_and_service, opening_hours, location, latitude, longitude, delivery_option, service_area_coverage]);
    return data;
}

module.exports.AddImagesQuery = async (shop_id, imagepath) => {
    var Query = `INSERT INTO shopimages (si_shop_id,si_image) VALUES (?,?)`;
    var data = query(Query, [shop_id, imagepath]);
    return data;
}

module.exports.listshopsQuerry = async (condition,limit,offset) => {
    var Query = `select * from shops ${condition} LIMIT ? OFFSET ? `;
    console.log(Query)
    var data = await query(Query,[limit,offset]);
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
    var Query = `delete from shopimages where si_shop_id=? and si_id not in (${fileKeys})`;
    var data = await query(Query, [sh_id, fileKeys]);
    return data;
}


