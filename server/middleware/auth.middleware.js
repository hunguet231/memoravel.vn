import bcrypt from "bcrypt";
import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat } from "../utils";
const User = database.Model.userModel;

export const checkRequestLogin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    let message = "";

    if (!username) {
      message = "Vui lòng nhập tài khoản!";
    } else if (!password) {
      message = "Vui lòng nhập mật khẩu!";
    }

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Tài khoản không tồn tại!" }));
    }

    let passwordInValid = !bcrypt.compareSync(password, user.password);

    if (passwordInValid && !message) {
      message = "Mật khẩu chưa chính xác!";
    }

    if (message) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: message }));
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

export const checkRequestChangePassword = async (req, res, next) => {
  try {
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    const confirm_password = req.body.confirm_password;
    let message = "";
    if (!old_password) {
      message = "Vui lòng nhập mật khẩu hiện tại!";
    } else if (!new_password) {
      message = "Vui lòng nhập mật khẩu mới!";
    } else if (!confirm_password) {
      message = "Vui lòng nhập xác nhận mật khẩu!";
    } else if (new_password.length < 8) {
      message = "Yêu cầu độ dài mật khẩu >= 8";
    } else if (new_password.length > 36) {
      message = "Yêu cầu độ dài mật khẩu <= 36";
    } else if (new_password !== confirm_password) {
      message = "Xác nhận mật khẩu chưa chính xác!";
    }

    const user = await User.findByPk(req.user_id);

    let passwordInValid = !bcrypt.compareSync(old_password, user.password);

    if (passwordInValid && !message) {
      message = "Mật khẩu chưa chính xác!";
    }

    if (message) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: message }));
    } else {
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
