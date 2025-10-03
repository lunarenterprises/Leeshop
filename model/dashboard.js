var db = require("../config/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.TotalShops = async () => {
    const Query = ` SELECT COUNT(*) AS total_shops
    FROM shops where sh_shop_or_service ='shop' `;
    const data = await query(Query);
    return data[0]?.total_shops || 0;
};

module.exports.TotalService = async () => {
    const Query = ` SELECT COUNT(*) AS total_shops
    FROM shops where sh_shop_or_service ='service' `;
    const data = await query(Query);
    return data[0]?.total_shops || 0;
};

module.exports.Totaluser = async () => {
    const Query = ` SELECT COUNT(*) AS total_users
    FROM users `;
    const data = await query(Query);
    return data[0]?.total_users || 0;
};

module.exports.TotalDeliveryStaff = async () => {
    const Query = ` SELECT COUNT(*) AS total_delivery_staff
    FROM users where u_role ='deliverystaff' `;
    const data = await query(Query);
    return data[0]?.total_delivery_staff || 0;
};