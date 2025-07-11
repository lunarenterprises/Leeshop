var model = require('../model/addshop');
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");
module.exports.addshop = async (req, res) => {
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

            let { shop_name, shop_address, shop_phone, about_us, ratings, product_and_service, opening_hours, location, delivery_option } = fields

            if (!shop_name || !shop_address || !shop_phone || !about_us || !ratings || !product_and_service || !opening_hours || !location || !delivery_option) {
                return res.status(400).json({
                    result: false,
                    message: 'Insufficient parameters',
                });

            }


            let addshop = await model.addshop(shop_name, shop_address, shop_phone, about_us, ratings, product_and_service, opening_hours, location, delivery_option);
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
                    console.log(insertResult, "image insert result");
                }
            }
            if (addshop.affectedRows > 0) {
                return res.status(200).json({
                    result: true,
                    message: 'Shop added successfully',
                    data: addshop,
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
module.exports.listshops = async (req, res) => {
    try {

        let listshops = await model.listshopsQuerry();

        if (listshops.length > 0) {
            var data = await Promise.all(
                listshops.map(async (el) => {
                    var sh_id = el.sh_id;
                    let getsubimage = await model.GetImages(sh_id)
                    console.log(getsubimage, "sssss");
                    el.images = getsubimage;
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
module.exports.deleteshops = async (req, res) => {
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


module.exports.viewshops = async (req, res) => {
    try {

        let { sh_id } = req.body;

        let listshops = await model.viewshopsQuerry(sh_id);

        if (listshops.length > 0) {
            var data = await Promise.all(
                listshops.map(async (el) => {
                    var sh_id = el.sh_id;
                    let getsubimage = await model.GetImages(sh_id)
                    console.log(getsubimage, "sssss");
                    el.images = getsubimage;
                    return el;
                })
            )
            return res.send({
                result: true,
                message: "shop are listed",
                list: data
            })
        } else {
            return res.send({
                result: false,
                message: "data not found"
            })
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message


        })

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
                sh_id,
                shop_name,
                shop_address,
                shop_phone,
                about_us,
                ratings,
                product_and_service,
                opening_hours,
                location,
                delivery_option
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

            // Prepare updates
            let updates = [];
            if (shop_name) updates.push(`sh_name='${shop_name}'`);
            if (shop_address) updates.push(`sh_address='${shop_address}'`);
            if (shop_phone) updates.push(`sh_phone='${shop_phone}'`);
            if (about_us) updates.push(`sh_about_us='${about_us}'`);
            if (ratings) updates.push(`sh_ratings='${ratings}'`);
            if (product_and_service) updates.push(`sh_product_and_service='${product_and_service}'`);
            if (opening_hours) updates.push(`sh_opening_hours='${opening_hours}'`);
            if (location) updates.push(`sh_location='${location}'`);
            if (delivery_option) updates.push(`sh_delivery_option='${delivery_option}'`);

            if (updates.length > 0) {
                const updateQuery = `SET ${updates.join(', ')}`;
                const updateResult = await model.UpdateshopDetails(updateQuery, sh_id);
                if (!updateResult.affectedRows) {
                    return res.send({
                        result: false,
                        message: 'Failed to update shop details'
                    });
                }
            }

            // Handle shop image update
            if (files.image) {
                const oldPath = files.image.filepath;
                const filename = 'SHOP_' + Date.now() + '_' + files.image.originalFilename;
                const newPath = path.join(process.cwd(), '/uploads/shops/', filename);

                const rawData = fs.readFileSync(oldPath);
                fs.writeFileSync(newPath, rawData);

                const imagePath = '/uploads/shops/' + filename;
                const imageUpdate = await model.updateshopImage(imagePath, sh_id);

                if (!imageUpdate.affectedRows) {
                    return res.send({
                        result: false,
                        message: 'Failed to update shop image',
                    });
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
