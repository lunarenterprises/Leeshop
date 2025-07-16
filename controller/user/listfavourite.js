var model =require('../../model/user/listfavourite')


module.exports.listfav= async (req,res)=>{
    try{
        let{u_id} =req.body;
        if(!u_id){
            return res.send({
                result:false,
                message:"insufficent parameter"
            })
        }
        let checkfavshop=await model.checkfavshop(u_id);
        if(checkfavshop.length >0){
            return res.send({
                result:true,
                message:"faouite shops are listed",
                list:checkfavshop

            })
        }
        else{
              return res.send({
                result: false,
                message: "no favorites found"
            })
        }





    }catch (error){
        return res.send({
           result: false,
            message: error.message 
        })
    }
}






