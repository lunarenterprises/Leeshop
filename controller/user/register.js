var model = require("../model/register");
var moment = require('moment')
var bcrypt = require('bcrypt')
var formidable = require('formidable')
var fs = require('fs')

module.exports.Register = async (req, res) => {
    try {
        var form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async function (err, fields, files) {
            if (err) {
                return res.send({
                    result: false,
                    message: "File Upload Failed!",
                    data: err,
                });
            }
            var date = moment().format("YYYY-MM-DD")
           
            var { name, email, mobile, address, district, state, zip_code, password } = fields
            if (!name || !email || !mobile || !address || !district || !state || !zip_code || !password) {
                return res.send({
                    result: false,
                    message: "All fields are required"
                })
            }

                let checkmail = await model.CheckMail(email);
                if (checkmail.length > 0) {
                    return res.send({
                        result: false,
                        message: "This email already registered "
                    })
                } else {
                    // if (files.image) {
                    //     var oldPath = files.image.filepath;
                    //     var newPath =
                    //         process.cwd() +
                    //         "/uploads/profile/" + files.image.originalFilename
                    //     let rawData = fs.readFileSync(oldPath);
                    //     console.log(oldPath);

                    //     fs.writeFileSync(newPath, rawData)
                    //     var image = "/uploads/profile/" + files.image.originalFilename
                    console.log(u_ref_id, name, email, mobile, address, district, state, zip_code, bank_name, account_no, bank_branch, ifsc_code, hashedPassword, masterid, date);

                    var hashedPassword = await bcrypt.hash(password, 10);
                    let adduser = await model.AddUser(u_ref_id, name, email, mobile, address, district, state, zip_code, bank_name, account_no, bank_branch, ifsc_code, hashedPassword, masterid, date);
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
           
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
};

