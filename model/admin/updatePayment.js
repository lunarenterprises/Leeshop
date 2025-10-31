var db =require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.findshops = async (sh_id) => {
    var Query = ` select * from shops where sh_id =?`;
    var data = await query(Query,[sh_id]);
    return data;
}

module.exports.updatePaymentStatus = async (sh_id, sh_status) => {
    var Query = `update shops set sh_payment_status=? where sh_id=?`;
    var data = await query(Query, [sh_status, sh_id]);
    return data;
}