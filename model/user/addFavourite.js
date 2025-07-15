var db =require("../../config/db.js");
var util =require("util")
const query =util.promisify(db.query).bind(db);


 module.exports.Checkuser =async(u_id)=>{
    var Query=`select * from users where u_id=?`;
    var data= query(Query,[u_id]);
    return data;

 }
   module.exports.checkshop =async (sh_id)=>{
      var Query=`select * from shops where sh_id=?`;
      var data =query(Query,[sh_id]);
      return data;

   }
module.exports.checkwish =async(u_id,sh_id)=>{
   var Query=`select  * from fav  where f_u_id =? and  f_sh_id =? `;
   var data =query(Query,[u_id,sh_id]);
   return data;

}
module.exports.removewish =async (u_id,sh_id)=>{
   var Query=`delete from fav where f_u_id = ? AND f_sh_id = ?`;
   var data =query(Query,[u_id,sh_id]);
   return data;

}
module.exports.AddWish =async(u_id,sh_id)=>{
   var Query=`INSERT INTO fav(f_u_id,f_sh_id)  VALUES (?,?)`;
   var data =query(Query,[u_id,sh_id]);
   return data;
}
