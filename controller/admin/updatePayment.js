var model = require('../../model/admin/updatePayment');

module.exports.updateBookingStatus = async (req, res) => {
    try {
        const { sh_id,sh_status } = req.body;

        if (!sh_id || !sh_status) {
            return res.send({
                result: false,
                message: "Insufficient parameters"
            });
        }

        if (!["pending","failed","paid","cancelled"].includes(sh_status)) {
            return res.send({
                result: false,
                message: "Invalid status value"
            });
        }

        const checkshops = await model.findshops(sh_id);

        if (checkshops.length === 0) {
            return res.send({ result: false, message: "Booking not found" });
        }

        const result = await model.updatePaymentStatus(sh_id, sh_status);

        if (result.affectedRows > 0) {
            return res.send({
                result: true,
                message: `Shop payment status updated to ${sh_status}`
            });

        } else {
            return res.send({
                result: false,
                message: "failed to update shop payment status "
            });

        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        });
    }
};
