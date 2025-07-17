var db=  require("../../config/db");
var util=require("util");
const query =util.promisify(db.query).bind(db);
 
module.exports.checkfavshop=async (u_id)=>{
    var Query =`select * from fav  inner join shops  ON fav.f_sh_id= shops.sh_id 
    where fav.f_sh_id=?`
    var data= await query(Query,[u_id]);
    return data;
}