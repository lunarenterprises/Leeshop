var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);



module.exports.reviewaddQuery = async (deli_staff_id, comment, heading, user_id, rating) => {
    var Query = `insert into reviews (r_delivery_staff_id,r_user_id,r_rating,r_comment,r_heading)values(?,?,?,?,?)`;
    var data = query(Query, [deli_staff_id, user_id, rating, comment, heading]);
    return data;

}

// module.exports.AddReviewImagesQuery = async (review_id, imagepath) => {
//     var Query = `insert into review_images (ri_review_id,ri_image)values(?,?)`;
//     var data = query(Query, [review_id, imagepath]);
//     return data;

// }
module.exports.checkDeliveryStaffQuery = async (deli_staff_id) => {
    var Query = `select * from users WHERE u_id=? and u_role = 'deliverystaff' `;
    var data = query(Query, [deli_staff_id]);
    return data;
}
module.exports.checkuserQuery = async (user_id) => {
    var Query = `select * from users where u_id=?`;
    var data = query(Query, [user_id]);
    return data;
}

module.exports.getAllRatingsQuery = async (deli_staff_id) => {
    var Query = `select r_rating from reviews where r_delivery_staff_id=?`;
    var data = query(Query, [deli_staff_id]);
    return data;
}

module.exports.updateProductRatingQuery = async (deli_staff_id, avgRating) => {
    var Query = `update users set u_rating=? WHERE u_id=?`;
    var data = query(Query, [avgRating, deli_staff_id]);
    return data;
}

module.exports.listDeliveryBoyReviewQuery = async (condition) => {
    var Query = `select r.*,u.u_name,u.u_profile_pic from reviews r
    LEFT JOIN users u ON r.r_user_id = u.u_id ${condition}`;
    var data = query(Query);
    return data;
}

// module.exports.GetReviewImages = async (review_id) => {
//     var Query = `select * from review_images  where ri_review_id=?`;
//     var data = query(Query, [review_id]);
//     return data;
// }