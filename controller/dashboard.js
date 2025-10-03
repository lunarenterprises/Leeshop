var model = require('../model/dashboard');

module.exports.Dashboard = async (req, res) => {
    try {
        let listshops = await model.TotalShops();
        let listservice = await model.TotalService();
        let Listuser = await model.Totaluser();
        let TotalDeliveryStaff = await model.TotalDeliveryStaff();

        if (TotalDeliveryStaff) {

            return res.send({
                result: true,
                message: "data retrieved",
                TotalShops:listshops,
                TotalService:listservice,
                Totaluser:Listuser,
                TotalDeliveryStaff:TotalDeliveryStaff,
            });

        } else {
            return res.send({
                result: false,
                message: "data not found"
            });
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message,
        });
    }
};
