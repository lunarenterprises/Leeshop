var model = require("../../model/user/listUser");

module.exports.ListUser =async(req,res)=>{
    try {
        let u_id=req.body?.u_id
        var condition =''
        if(u_id){
            condition=`and u_id='${u_id}'`
        }
        let Userlist =await model.ListUserQuery(condition);
        if (Userlist.length>0){
            return res.send({
                message:"data retrived",
                list:Userlist,

            })
        }else{
         
            return res.send({
                result: false,
                message: "data not found",
        })
    }

        
    } catch (error) {
        return res.send({
            result:false,
            message:error.message,

        })
    }
}