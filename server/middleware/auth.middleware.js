import bcrypt from "bcrypt";
import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat } from "../utils";
const User = database.Model.userModel;

export const checkRequestLogin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Vui lòng nhập tài khoản!" }));
    } else if (!password) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Vui lòng nhập mật khẩu!" }));
    }

    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Tài khoản không tồn tại!" }));
    }

    let passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Mật khẩu chưa chính xác!" }));
    } else {
      req.body = {
        user_id: user.id,
        role: user.role,
        full_name: user.full_name,
        avatar: user.avatar,
      };
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
