var express = require("express");
var route = express.Router();
// var {verifyToken}=require('./components/jwt')

// var { login } = require('./controller/login')
// route.post('/login', login)

var { AddShop } = require('./../controller/shop/addShop')
route.post('/add/shop', AddShop)

module.exports = route
