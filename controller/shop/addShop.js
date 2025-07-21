var model = require('../../model/shop/addShop');
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

module.exports.AddShop = async (req, res) => {

    try {
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    result: false,
                    message: "file upload failed!",
                    data: err,
                });

            }

            let { service_or_shop, shop_name, owner_name, category_name,category_id, shop_address, state, city, working_days, description, primary_phone, secondary_phone, whatsapp_number, email, password, product_and_service, opening_hours, location,latitude ,longitude, delivery_option, service_area_coverage } = fields

            if (!service_or_shop || !shop_name || !owner_name || !category_name || !category_id || !shop_address || !state || !city || !working_days || !description || !primary_phone || !secondary_phone || !whatsapp_number || !email || !password || !product_and_service || !opening_hours || !location || !latitude || !longitude || !delivery_option) {
                return res.status(400).json({
                    result: false,
                    message: 'Insufficient parameters',
                });

            }
            if (service_or_shop == 'shop') {

                var addshop = await model.addshop(service_or_shop, shop_name, owner_name,category_id, category_name, shop_address, state, city, working_days, description, primary_phone, secondary_phone, whatsapp_number, email, password, product_and_service, opening_hours, location,latitude ,longitude, delivery_option);
            } else {
                var addshop = await model.addshop(service_or_shop, shop_name, owner_name, category_id, category_name, shop_address, state, city, working_days, description, primary_phone, secondary_phone, whatsapp_number, email, password, product_and_service, opening_hours, location,latitude ,longitude, delivery_option, service_area_coverage);
            }

            let shop_id = addshop.insertId;

            if (files && files.image) {
                // Normalize to array: handles both single and multiple image uploads
                const imageFiles = Array.isArray(files.image) ? files.image : [files.image];

                for (const file of imageFiles) {
                    if (!file || !file.filepath || !file.originalFilename) continue;

                    const oldPath = file.filepath;
                    const newPath = path.join(process.cwd(), '/uploads/shops', file.originalFilename);

                    const rawData = fs.readFileSync(oldPath);
                    fs.writeFileSync(newPath, rawData);

                    const imagePath = "/uploads/shops/" + file.originalFilename;

                    const insertResult = await model.AddImagesQuery(shop_id, imagePath);
                    // console.log(insertResult, "image insert result");
                }
            }
            if (addshop.affectedRows > 0) {
                return res.status(200).json({
                    result: true,
                    message: 'Shop added successfully',
                });
            } else {
                return res.status(500).json({
                    result: false,
                    message: 'Failed to add shop deatils',
                });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            message: 'Internal server error.',
            data: error.message,
        });
    }
};
module.exports.ListShops = async (req, res) => {
    try {
        let { sh_id } = req.body || {}

        let condition = ''

        if (sh_id) {
            condition = `where sh_id = ${sh_id}`
        }

        let listshops = await model.listshopsQuerry(condition);

        if (listshops.length > 0) {
            var data = await Promise.all(
                listshops.map(async (el) => {
                    var sh_id = el.sh_id;
                    let getshopimage = await model.GetImages(sh_id)
                    el.shopimages = getshopimage;
                    return el;
                })
            )

            return res.send({
                result: true,
                message: "shops are listed",
                list: data
            })
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

module.exports.DeleteShops = async (req, res) => {
    try {
        let { sh_id } = req.body;
        if (sh_id) {
            let checkshop = await model.checkshopQuery(sh_id);
            if (checkshop.length == 0) {
                return res.send({
                    result: false,
                    message: "invalid shop id"
                })
            }

            var deletesection = await model.removeshopQuery(sh_id);
            if (deletesection.affectedRows > 0) {
                return res.send({
                    result: true,
                    messsage: "shop deleted successfully"
                });
            } else {
                return res.send({
                    result: false,
                    message: "failed to deleted shop"
                });

            }
        } else {
            return res.send({
                result: false,
                message: "shop id is required"
            })
        }




    } catch (error) {
        return res.send({
            result: false,
            message: error.message,

        });

    }
}

module.exports.editshops = async (req, res) => {
    try {
        const form = new formidable.IncomingForm({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.send({
                    result: false,
                    message: 'File upload failed!',
                    data: err,
                });
            }

            const {
                sh_id, sh_shop_or_service, sh_name, sh_owner_name, sh_category, sh_address, sh_state, sh_city,
                sh_working_days, sh_description, sh_primary_phone, sh_secondary_phone, sh_whatsapp_number,
                sh_email, sh_product_and_service, sh_opening_hours, sh_location,
                sh_delivery_option, sh_service_area_coverage
            } = fields;

            if (!sh_id) {
                return res.send({
                    result: false,
                    message: "Shop ID is required!"
                });
            }

            const shopExists = await model.checkshopQuery(sh_id);
            if (shopExists.length === 0) {
                return res.send({
                    result: false,
                    message: 'Shop does not exist',
                });
            }

            // Build update query fields
            let updates = [];
            if (sh_shop_or_service) updates.push(`sh_shop_or_service='${sh_shop_or_service}'`);
            if (sh_name) updates.push(`sh_name='${sh_name}'`);
            if (sh_owner_name) updates.push(`sh_owner_name='${sh_owner_name}'`);
            if (sh_category) updates.push(`sh_category='${sh_category}'`);
            if (sh_address) updates.push(`sh_address='${sh_address}'`);
            if (sh_state) updates.push(`sh_state='${sh_state}'`);
            if (sh_city) updates.push(`sh_city='${sh_city}'`);
            if (sh_working_days) updates.push(`sh_working_days='${sh_working_days}'`);
            if (sh_description) updates.push(`sh_description='${sh_description}'`);
            if (sh_primary_phone) updates.push(`sh_primary_phone='${sh_primary_phone}'`);
            if (sh_secondary_phone) updates.push(`sh_secondary_phone='${sh_secondary_phone}'`);
            if (sh_whatsapp_number) updates.push(`sh_whatsapp_number='${sh_whatsapp_number}'`);
            if (sh_email) updates.push(`sh_email='${sh_email}'`);
            if (sh_product_and_service) updates.push(`sh_product_and_service='${sh_product_and_service}'`);
            if (sh_opening_hours) updates.push(`sh_opening_hours='${sh_opening_hours}'`);
            if (sh_location) updates.push(`sh_location='${sh_location}'`);
            if (sh_delivery_option) updates.push(`sh_delivery_option='${sh_delivery_option}'`);
            if (sh_service_area_coverage) updates.push(`sh_service_area_coverage='${sh_service_area_coverage}'`);

            if (updates.length > 0) {
                const updateQuery = `SET ${updates.join(', ')}`;
                const updateResult = await model.UpdateshopDetails(updateQuery, sh_id);
                if (!updateResult || updateResult.affectedRows === 0) {
                    return res.send({
                        result: false,
                        message: 'Failed to update shop details'
                    });
                }
            }

            // Delete associated files except image
            if (files) {
                const fileKeys = Object.keys(files).filter(item => item !== 'image');
                console.log("fileKeys :",fileKeys);
                
                if (fileKeys.length > 0) {
                    await model.DeleteFilesQuery(sh_id, fileKeys); // Make sure DeleteFilesQuery accepts sh_id and fileKeys
                }
            }

            // Handle shop image update
            if (files && files.image) {
                const imageFiles = Array.isArray(files.image) ? files.image : [files.image];

                for (const file of imageFiles) {
                    if (!file || !file.filepath || !file.originalFilename) continue;

                    const oldPath = file.filepath;
                    const newPath = path.join(process.cwd(), '/uploads/shops', file.originalFilename);

                    const rawData = fs.readFileSync(oldPath);
                    fs.writeFileSync(newPath, rawData);

                    const imagePath = "/uploads/shops/" + file.originalFilename;

                    const imageUpdate = await model.AddImagesQuery(sh_id,imagePath);
                    
                    if (!imageUpdate || imageUpdate.affectedRows === 0) {
                        return res.send({
                            result: false,
                            message: 'Failed to update shop image',
                        });
                    }
                }
            }

            return res.send({
                result: true,
                message: 'Shop updated successfully',
            });
        });

    } catch (error) {
        return res.send({
            result: false,
            message: error.message,
        });
    }
};

