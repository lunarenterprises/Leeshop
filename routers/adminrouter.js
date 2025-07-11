var express = require("express");
var route = express.Router();
// var {verifyToken}=require('./components/jwt')

// var { login } = require('../controller/login')
// route.post('/login', login)

var { DeleteDeliveryBoy } = require('../controller/deliveryboy/deliveryboy')
route.post('/delete/delivery-staffs', DeleteDeliveryBoy)

module.exports = route