var model = require("../../model/user/register");
var moment = require('moment')
var bcrypt = require('bcrypt')
var formidable = require('formidable')
var fs = require('fs')

module.exports.Register = async (req, res) => {
    try {

        var date = moment().format("YYYY-MM-DD")

        var { name,email,mobile, password,address,district,state,zipcode } =  req.body;
        if (! name || !email || !password) {
            return res.send({
                result: false,
                message: "All fields are required"
            })
        }

        let checkmail = await model.checkUserOrShop(email);
        if (checkmail.length > 0) {
            return res.send({
                result: false,
                message: "This email already registered "
            })
        } else {

            // console.log(email, hashedPassword);

            var hashedPassword = await bcrypt.hash(password, 10);

            let adduser = await model.AddUser(name,email,mobile, hashedPassword,address,district,state,zipcode,date);
            if (adduser.affectedRows > 0) {

                return res.send({
                    result: true,
                    message: "user details added successfully"
                })
            } else {
                return res.send({
                    result: false,
                    message: "Failed to add user details"
                })
            }

        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
};

