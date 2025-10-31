var express = require("express");
var route = express.Router();
// var {verifyToken}=require('./components/jwt')

var { Register } = require('../controller/deliveryboy/register')
route.post('/register/delivery_staffs', Register)

var { listDeliveryBoy } = require('../controller/deliveryboy/deliveryboy')
route.post('/list/delivery_staffs', listDeliveryBoy)

var { EditDeliveryStaff } = require('../controller/deliveryboy/deliveryboy')
route.post('/edit/delivery_staffs', EditDeliveryStaff)

var { reviewadd } = require('../controller/deliveryboy/review')
route.post('/add/delivery_staff_review', reviewadd)

var { lisṭDeliveryBoyReview } = require('../controller/deliveryboy/review')
route.post('/list/delivery_staff_review', lisṭDeliveryBoyReview)



module.exports = route
