var model = require("../../model/deliveryboy/review");

module.exports.reviewadd = async (req, res) => {
    try {
        let { deli_staff_id, comment, heading, rating, user_id } = req.body;

        if (!deli_staff_id || !comment || !heading || !rating || !user_id) {
            return res.send({
                result: false,
                message: "All fileds are required"
            });
        }

        if (rating < 0 || rating > 5) {
            return res.send({
                result: false,
                message: "Rating should be between 0 and 5"
            })
        }

        let checkuser = await model.checkuserQuery(user_id);
        if (checkuser.length == 0) {
            return res.send({
                result: false,
                message: "user not found"
            });
        }

        let checkdeliverystaff = await model.checkDeliveryStaffQuery(deli_staff_id);
        if (checkdeliverystaff.length == 0) {
            return res.send({
                result: false,
                message: "delivery staff details not found"
            });
        }

        // Add review
        let reviewadd = await model.reviewaddQuery(deli_staff_id, comment, heading, user_id, rating);

        if (reviewadd.affectedRows > 0) {

            let ratings = await model.getAllRatingsQuery(deli_staff_id);

            if (ratings.length > 0) {
                let totalRating = ratings.reduce((acc, cur) => acc + cur.r_rating, 0);

                let avgRating = (totalRating / ratings.length).toFixed(1);

                await model.updateProductRatingQuery(deli_staff_id, avgRating);
            }

            return res.send({
                result: true,
                message: "review and rating added successfully"
            });
        } else {
            return res.send({
                result: false,
                message: "failed to add review"
            });
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        });
    }
};


module.exports.lisṭDeliveryBoyReview = async (req, res) => {
    try {
       let { u_id, deli_staff_id } = req.body

        let condition = ''

        if (deli_staff_id) {
            condition = `where r.r_delivery_staff_id='${deli_staff_id}'`
        }
        if (deli_staff_id && u_id) {
            condition = `where r.r_delivery_staff_id='${deli_staff_id}' and r.r_user_id = '${u_id}' `
        }

         let page = parseInt(req.body.page) || 1;
        let limit = parseInt(req.body.limit) || 10;
        const offset = (page - 1) * limit;

        let listDeliveryBoyreview = await model.listDeliveryBoyReviewQuery(condition,limit,offset);

        if (listDeliveryBoyreview.length > 0) {
            return res.send({
                result: true,
                message: "data retrieved",
                list: listDeliveryBoyreview,

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