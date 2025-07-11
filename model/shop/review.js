var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.reviewaddQuery = async (shop_id, comment, heading, user_id, rating) => {
    var Query = `insert into reviews (r_shop_id,r_comment,r_heading,r_user_id,r_rating) VALUES (?,?,?,?,?)`;
    var data = query(Query, [shop_id, comment, heading, user_id, rating]);
    return data;
}
module.exports.checkuserQuery = async (user_id) => {
    var Query = `SELECT * FROM users WHERE u_id =?`;
    var data = query(Query, [user_id]);
    return data;
}
module.exports.checkshopQuery = async (shop_id) => {
    var Query = `select * from shops where sh_id=?`;
    var data = query(Query, [shop_id]);
    return data;
}
module.exports.getAllRatingsQuery = async (shop_id) => {
    var Query = `select r_rating from reviews where r_shop_id=?`;
    var data = query(Query, [shop_id]);
    return data;


}
module.exports.updateshopRatingQuery = async (shop_id, avgRating) => {
    var Query = `UPDATE shops SET sh_ratings = ? WHERE sh_id = ?`;
    var data = query(Query, [avgRating, shop_id]);
    return data;
}

