var db= require('../../config/db');
var util=require("util");
const query =util.promisify(db.query).bind(db)


module.exports.AddUser=async ( email, password,date)=>{
    var Query=`INSERT INTO users(u_email,u_password,u_joindate)values(?,?,?);`
    var data=query(Query,[email,password,date]);
    return data;
}
module.exports.CheckMail=async(email)=>{
    var Query=`SELECT * FROM users WHERE u_email=?`
    var data=query(Query,[email]);
    return data;
}