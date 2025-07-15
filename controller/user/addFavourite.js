var model = require("../../model/user/addFavourite");

module.exports.AddFav = async (req, res) => {
  try {
    var { u_id, sh_id, fav } = req.body;
    // var Id = req.body.Id;
    let CheckUser = await model.Checkuser (u_id);

    if (CheckUser.length > 0) {
      let checkshop = await model.checkshop(sh_id);
      if (checkshop.length > 0) {
        let checkwish = await model.checkwish(u_id, sh_id);
        if (checkwish.length > 0) {
          if (fav == 0) {
            let removewish = await model.removewish(u_id, sh_id);
            return res.send({
              result: true,
              message: "shops removed from favourite ",
            });
          } else {
            return res.send({
              result: false,
              message: "shops already added in favourite",
            });
          }
        } else {
          if (fav == 0) {
            return res.send({
              result: true,
              message: "shops already removed from favourite",
            });
          } else {
            let addwish = await model.AddWish(u_id, sh_id);
            return res.send({
              result: true,
              message: "shops added to favourite",
            });
          }
        }
      } else {
        return res.send({
          result: false,
          message: "shops not found",
        });
      }
    } else {
      return res.send({
        result: false,
        message: "user does not exist",
      });
    }
  } catch (error) {
    return res.send({
      result: false,
      message: error.message,
    });
  }
};