const model = require("../../model/deliveryboy/deliveryboy");
const moment = require('moment');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports.Register = async (req, res) => {
    try {
        const form = new formidable.IncomingForm({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).send({
                    result: false,
                    message: "File upload failed",
                    data: err,
                });
            }

            const { name, email, mobile, secondary_mobile, whatsapp_contact, password, vehicle_type, work_type } = fields;

            if (!name || !email || !mobile || !whatsapp_contact || !vehicle_type || !work_type || !password) {
                return res.send({
                    result: false,
                    message: "All fields are required"
                });
            }

            let role = 'deliverystaff'

            const checkMail = await model.CheckMail(email);
            if (checkMail.length > 0) {
                return res.send({
                    result: false,
                    message: "This email is already registered "
                });
            }

            const checkMobile = await model.CheckMobile(mobile);
            if (checkMobile.length > 0) {
                return res.send({
                    result: false,
                    message: "This mobile number is already registered"
                });
            }

            const checkWhatsapp = await model.CheckwhatsappContact(whatsapp_contact);
            if (checkWhatsapp.length > 0) {
                return res.send({
                    result: false,
                    message: "This WhatsApp number is already registered "
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const date = moment().format("YYYY-MM-DD");
            const adddeliverystaff = await model.AddDeliveryBoy(
                name,
                email,
                mobile,
                secondary_mobile,
                whatsapp_contact,
                hashedPassword,
                vehicle_type,
                work_type,
                date,
                role
            );
            // Default values
            let profilePath = "";

            if (adddeliverystaff.affectedRows > 0) {
                const u_id = adddeliverystaff.insertId;

                // Handle profile image upload
                if (files.profile) {
                    const profileFile = files.profile;
                    const profileName = 'DELV_' + Date.now() + '_' + profileFile.originalFilename;
                    const newProfilePath = path.join(process.cwd(), 'uploads/profile', profileName);

                    const rawData = fs.readFileSync(profileFile.filepath);
                    fs.writeFileSync(newProfilePath, rawData);

                    profilePath = '/uploads/profile/' + profileName;
                    let addprofileimage = await model.UpdateProfileimage(profilePath, u_id)

                }


                // Optional: save license
                if (files.licence) {
                    const licenceFile = files.licence;
                    const licenceName = 'DRIV_LIC' + Date.now() + '_' + licenceFile.originalFilename;
                    const newProfilePath = path.join(process.cwd(), 'uploads/driving_licence', licenceName);

                    const rawData = fs.readFileSync(licenceFile.filepath);
                    fs.writeFileSync(newProfilePath, rawData);

                    let licencePath = '/uploads/driving_licence/' + licenceName;
                    // Optional: Save this to DB if needed

                    let addlicenceimage = await model.UpdateLicenceimage(licencePath, u_id)
                }

                return res.send({
                    result: true,
                    message: "Delivery Staff details registered successfully"
                });
            } else {
                return res.send({
                    result: false,
                    message: "Failed to register delivery staff"
                });
            }
        });
    } catch (error) {
        console.error("Error in Register:", error);
        return res.status(500).send({
            result: false,
            message: error.message
        });
    }
};
