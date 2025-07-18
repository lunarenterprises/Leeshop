var express = require("express");
var route = express.Router();
// var {verifyToken}=require('./components/jwt')

// var { login } = require('../controller/login')
// route.post('/login', login)

var { DeleteDeliveryBoy } = require('../controller/deliveryboy/deliveryboy')
route.post('/delete/delivery-staffs', DeleteDeliveryBoy)

var { DeleteShops } = require('../controller/shop/addShop')
route.post('/delete/shop', DeleteShops)

var { categoryadd } =require('../controller/admin/addcategory')
route.post('/category/add', categoryadd)

var { Listcategory }=require('../controller/admin/addcategory')
route.post('/category/list', Listcategory)

var { deletecategory } =require('../controller/admin/addcategory')
route.post('/category/delete', deletecategory)

var { editcategory } =require('../controller/admin/addcategory')
route.post('/category/edit', editcategory)



module.exports = route