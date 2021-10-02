import bcrypt from "bcrypt";
import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat, validateEmail, validatePhone } from "../utils";
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

export const checkEditProfile = async (req, res, next) => {
  try {
    const dataEditProfile = {
      full_name: req.body.full_name || "",
      gender: req.body.gender || AppConst.GENDER.other,
      date_of_birth: req.body.date_of_birth || null,
      email: req.body.email || "",
      phone_number: req.body.phone_number || "",
      avatar: req.body.avatar || "",
    };

    const messageProfile = {
      gender: "",
      email: "",
      phone_number: "",
    };

    // Check gender
    if (!Object.values(AppConst.GENDER).includes(dataEditProfile.gender)) {
      messageProfile.gender = "Sai định dạng giới tính";
    }

    // Check email
    if (dataEditProfile.email && !validateEmail(dataEditProfile.email)) {
      messageProfile.email = "Email không đúng định dạng";
    }

    // Check phone number
    if (
      dataEditProfile.phone_number &&
      !validatePhone(dataEditProfile.phone_number)
    ) {
      messageProfile.phone_number = "Số điện thoại không đúng định dạng";
    }

    const checkMessageValidate = Object.values(messageProfile).find(
      (messageItem) => messageItem.length > 0
    );

    if (checkMessageValidate) {
      res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: JSON.stringify(messageProfile) }));
    } else {
      req.body = dataEditProfile;
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkImageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Không có file nào được tải lên!" }));
    } else {
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkGetImage = async (req, res, next) => {
  try {
    const imageName = req.params.image_name;
    if (!imageName) {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(
          responseFormat({ message: "Không có tên file nào được chỉ định!" })
        );
    } else {
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
