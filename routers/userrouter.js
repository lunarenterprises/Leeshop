var express = require("express");
var route = express.Router();
// var {verifyToken}=require('./components/jwt')

var{ListUser}=require('../controller/user/listUser')
route.post('/list/user',ListUser)



// var { login } = require('./controller/login')
// route.post('/login', login)

module.exports = route
