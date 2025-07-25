var express = require("express");
var route = express.Router();
// var {verifyToken}=require('./components/jwt')


var { Register } = require('../controller/user/register')
route.post('/register', Register)

var{ListUser}=require('../controller/user/listUser')
route.post('/list/user',ListUser)

var{AddFav}=require('../controller/user/addFavourite')
route.post('/add/fav',AddFav)

var{EditPersonalInfo }=require('../controller/user/editprofile')
route.post('/edit/profile',EditPersonalInfo )

var{listfav}=require('../controller/user/listfavourite')
route.post('/list/fav',listfav)

var{forgotpassword}=require('../controller/user/forgotpassword')
route.post('/forgotpassword',forgotpassword)

var{verifyOtp}=require('../controller/user/forgotpassword')
route.post('/verifyotp',verifyOtp)

var{ResetPassword }=require('../controller/user/forgotpassword')
route.post('/ResetPassword',ResetPassword  )



module.exports = route
