var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.addshop = async (shop_name, shop_address, shop_phone, about_us, ratings, product_and_service, opening_hours, location, delivery_option) => {
    var Query = `INSERT INTO shops (sh_name, sh_address, sh_phone, sh_about_us, sh_ratings, sh_product_and_service, sh_opening_hours, sh_location, sh_delivery_option) VALUES ( ?, ?, ?, ?, ?, ?, ?,?, ?)`;
    var data = query(Query, [shop_name, shop_address, shop_phone, about_us, ratings, product_and_service, opening_hours, location, delivery_option]);
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