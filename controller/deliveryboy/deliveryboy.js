let model = require('../../model/deliveryboy/deliveryboy')

module.exports.lisṭDeliveryBoy = async (req, res) => {
    try {
        let { u_id, } = req.body || {}

        let condition = ''

        if (u_id) {
            condition = `where u_id = ${u_id}`
        }
        let listDeliveryBoy = await model.listDeliveryBoyQuery(condition);

        if (listDeliveryBoy.length > 0) {
            return res.send({
                result: true,
                message: "data retrieved",
                list: listDeliveryBoy,

            });

        } else {
            return res.send({
                result: false,
                message: "data not found",
            });
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message,

        });
    }
}


module.exports.EditDeliveryStaff = async (req, res) => {
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

            let { u_id, u_name, u_email, u_mobile, u_secondary_mobile, u_whatsapp_contact, u_vehicle_type, u_work_type, u_profile_pic, u_licence_pic } = fields

            if (!u_id) {
                return res.send({
                    result: false,
                    messaage: "user id is required"
                })
            }

            var checkDeliveryStaff = await model.CheckDeliveryStaffQuery(u_id)


            if (checkDeliveryStaff.length > 0) {

                let condition = ``;

                if (u_name) {
                    if (condition == '') {
                        condition = `set u_name ='${u_name}'`
                    } else {
                        condition += `,u_name='${u_name}'`
                    }
                }
                if (u_email) {
                    if (condition == '') {
                        condition = `set u_email='${u_email}'`
                    } else {
                        condition += `,u_email='${u_email}'`
                    }
                }
                if (u_mobile) {
                    if (condition == '') {
                        condition = `set u_mobile ='${u_mobile}'`
                    } else {
                        condition += `,u_mobile='${u_mobile}'`
                    }
                }
                if (u_secondary_mobile) {
                    if (condition == '') {
                        condition = `set u_secondary_mobile ='${u_secondary_mobile}' `
                    } else {
                        condition += `,u_secondary_mobile='${u_secondary_mobile}'`
                    }
                }
                if (u_whatsapp_contact) {
                    if (condition == '') {
                        condition = `set u_whatsapp_contact ='${u_whatsapp_contact}' `
                    } else {
                        condition += `,u_whatsapp_contact='${u_whatsapp_contact}'`
                    }
                }
                if (u_vehicle_type) {
                    if (condition == '') {
                        condition = `set u_vehicle_type ='${u_vehicle_type}' `
                    } else {
                        condition += `,u_vehicle_type='${u_vehicle_type}'`
                    }
                }
                if (u_work_type) {
                    if (condition == '') {
                        condition = `set u_work_type ='${u_work_type}' `
                    } else {
                        condition += `,u_work_type='${u_work_type}'`
                    }
                }
                if (condition !== '') {
                    var EditDeliveryBoy = await model.ChangeDeliveryStaffInfo(condition, u_id)
                }

                if (EditDeliveryBoy.affectedRows > 0) {

                    if (files) {

                        if (files.profile) {
                            var oldPath = files.profile.filepath;
                            var newPath =
                                process.cwd() +
                                "/uploads/profile/" + files.profile.originalFilename
                            let rawData = fs.readFileSync(oldPath);

                            fs.writeFileSync(newPath, rawData)
                            var profileimage = "/uploads/profile/" + files.profile.originalFilename

                            var InsertDeliveryStaffimage = await model.UpdateProfileimage(profileimage, u_id)
                        }

                        if (files.licence) {
                            var oldPath = files.licence.filepath;
                            var newPath =
                                process.cwd() +
                                "/uploads/driving_licence/" + files.licence.originalFilename
                            let rawData = fs.readFileSync(oldPath);

                            fs.writeFileSync(newPath, rawData)
                            var licenceimage = "/uploads/driving_licence/" + files.licence.originalFilename

                            var InsertDeliveryStaffimage = await model.UpdateLicenceimage(licenceimage, u_id)

                        }

                        return res.send({
                            result: true,
                            message: "Delivery Staff details updated successfully"
                        })
                    }

                    return res.send({
                        result: true,
                        message: "Delivery Staff details updated successfully"
                    })
                } else {
                    return res.send({
                        result: false,
                        message: "failed to update Delivery Staff"
                    })
                }
            } else {
                return res.send({
                    result: false,
                    message: "Delivery Staff details not found"
                })
            }
        })

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}

module.exports.DeleteDeliveryBoy = async (req, res) => {
    try {
        let u_id = req.body.u_id

        let listDeliveryBoy = await model.CheckDeliveryStaffQuery(u_id);

        if (listDeliveryBoy.length > 0) {

            let deleteDeliveryBoy = await model.DeleteDeliveryBoyQuery(u_id);

            if (deleteDeliveryBoy.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "Delivery staff details deleted sucessfully",
                });
            }

        } else {
            return res.send({
                result: false,
                message: "data not found",
            });
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message,

        });
    }
}