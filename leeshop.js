var express = require("express");
var cors = require("cors");
var app = express();
var bodyparser = require("body-parser");
var https = require("https")
var http = require('http')
const fs = require('fs');
require('dotenv').config({ encoding: 'latin1' })

//var privateKey = fs.readFileSync('/etc/ssl/private.key', 'utf8').toString();

// var certificate = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8').toString();

// var ca = fs.readFileSync('/etc/ssl/ca_bundle.crt').toString();

// var options = { key: privateKey, cert: certificate, ca: ca };

//var server = https.createServer(options, app);
 var server = http.createServer(app);

app.use(
    bodyparser.urlencoded({
        extended: false,
    })
);

app.use(bodyparser.json());
app.use(cors());
app.use(express.static('./', {
    maxAge: '1d' // Cache images for one day
  }));

var admin = require("./routers/adminrouter");
var user = require("./routers/userrouter");
var shop = require("./routers/shoprouter");
var deliverystaff = require("./routers/deliveryboyrouter");

app.use("/leeshop/admin", admin);
app.use("/leeshop/user", user);
app.use("/leeshop/shop", shop);
app.use("/leeshop/deliverystaff", deliverystaff);

server.listen(6031, () => {
    console.log("server running on port 6031");
});