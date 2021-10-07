import { hashSync } from "bcrypt";
import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat, validateEmail, validatePhone } from "../utils";

const User = database.Model.userModel;

const message = {
  username: "",
  password: "",
  full_name: "",
  gender: "",
  date_of_birth: "",
  email: "",
  phone_number: "",
  avatar: "",
  role: "",
  status: "",
};

export const checkAdminCreateUser = async (req, res, next) => {
  try {
    const dataCreateUser = {
      username: req.body.username || "",
      password: req.body.password || "",
      full_name: req.body.full_name || "",
      gender: parseInt(req.body.gender) || AppConst.GENDER.other,
      date_of_birth: req.body.date_of_birth || null,
      email: req.body.email || "",
      phone_number: req.body.phone_number || "",
      avatar: req.body.avatar || "",
      role: req.body.role || AppConst.ROLE.manage,
      status: req.body.status
        ? parseInt(req.body.status)
        : AppConst.STATUS.draft,
    };

    const messageCreate = { ...message };

    // Check username
    if (!dataCreateUser.username) {
      messageCreate.username = "Yêu cầu nhập tài khoản";
    } else if (dataCreateUser.username.length < 8) {
      messageCreate.username = "Tài khoản phải có độ dài >= 8";
    } else if (dataCreateUser.username.length > 36) {
      messageCreate.username = "Tài khoản phải có độ dài <= 36";
    } else {
      const user = await User.findOne({
        where: {
          username: dataCreateUser.username,
        },
      });
      if (user) {
        messageCreate.username = "Tài khoản đã tồn tại";
      }
    }

    // Check password
    if (!dataCreateUser.password) {
      messageCreate.password = "Yêu cầu nhập mật khẩu";
    } else if (dataCreateUser.password.length < 8) {
      messageCreate.password = "Mật khẩu phải có độ dài >= 8";
    } else if (dataCreateUser.password.length > 36) {
      messageCreate.password = "Mật khẩu phải có độ dài <= 36";
    }

    // Check gender
    if (!Object.values(AppConst.GENDER).includes(dataCreateUser.gender)) {
      messageCreate.gender = "Sai định dạng giới tính";
    }

    // Check role
    if (!Object.values(AppConst.ROLE).includes(dataCreateUser.role)) {
      messageCreate.role = "Sai định dạng quyền";
    }

    // Check status
    if (!Object.values(AppConst.STATUS).includes(dataCreateUser.status)) {
      messageCreate.status = "Sai định dạng trạng thái";
    }

    // Check email
    if (dataCreateUser.email && !validateEmail(dataCreateUser.email)) {
      messageCreate.email = "Email không đúng định dạng";
    }

    // Check phone number
    if (
      dataCreateUser.phone_number &&
      !validatePhone(dataCreateUser.phone_number)
    ) {
      messageCreate.phone_number = "Số điện thoại không đúng định dạng";
    }

    const checkMessageValidate = Object.values(messageCreate).find(
      (messageItem) => messageItem.length > 0
    );

    if (!checkMessageValidate) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: JSON.stringify(messageCreate) }));
    } else {
      dataCreateUser.password = hashSync(dataCreateUser.password, 10);
      req.body = dataCreateUser;
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkAdminEditUser = async (req, res, next) => {
  try {
    if (
      !(
        req.body.username &&
        req.body.password &&
        req.body.full_name &&
        req.body.gender &&
        req.body.date_of_birth &&
        req.body.email &&
        req.body.phone_number &&
        req.body.avatar &&
        req.body.role
      )
    ) {
      let message = "";
      // Check status
      if (AppConst.STATUS.draft != req.body.status) {
        message = "Sai định dạng trạng thái";
      }
      if (message) {
        return res
          .status(AppConst.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: message }));
      } else {
        req.isDisable = true;
        next();
      }
    } else {
      const dataCreateUser = {
        username: req.body.username || "",
        password: req.body.password || "",
        full_name: req.body.full_name || "",
        gender: parseInt(req.body.gender) || AppConst.GENDER.other,
        date_of_birth: req.body.date_of_birth || null,
        email: req.body.email || "",
        phone_number: req.body.phone_number || "",
        avatar: req.body.avatar || "",
        role: req.body.role || AppConst.ROLE.manage,
        status: parseInt(req.body.status) || AppConst.STATUS.draft,
      };

      const messageCreate = { ...message };

      // Check username
      if (!dataCreateUser.username) {
        messageCreate.username = "Yêu cầu nhập tài khoản";
      } else if (dataCreateUser.username.length < 8) {
        messageCreate.username = "Tài khoản phải có độ dài >= 8";
      } else if (dataCreateUser.username.length > 36) {
        messageCreate.username = "Tài khoản phải có độ dài <= 36";
      } else {
        const user = await User.findOne({
          where: {
            username: dataCreateUser.username,
          },
        });
        if (user) {
          messageCreate.username = "Tài khoản đã tồn tại";
        }
      }

      // Check password
      if (!dataCreateUser.password) {
        messageCreate.password = "Yêu cầu nhập mật khẩu";
      } else if (dataCreateUser.password.length < 8) {
        messageCreate.password = "Mật khẩu phải có độ dài >= 8";
      } else if (dataCreateUser.password.length > 36) {
        messageCreate.password = "Mật khẩu phải có độ dài <= 36";
      }

      // Check gender
      if (!Object.values(AppConst.GENDER).includes(dataCreateUser.gender)) {
        messageCreate.gender = "Sai định dạng giới tính";
      }

      // Check role
      if (!Object.values(AppConst.ROLE).includes(dataCreateUser.role)) {
        messageCreate.role = "Sai định dạng quyền";
      }

      // Check status
      if (!Object.values(AppConst.STATUS).includes(dataCreateUser.status)) {
        messageCreate.status = "Sai định dạng trạng thái";
      }

      // Check email
      if (dataCreateUser.email && !validateEmail(dataCreateUser.email)) {
        messageCreate.email = "Email không đúng định dạng";
      }

      // Check phone number
      if (
        dataCreateUser.phone_number &&
        !validatePhone(dataCreateUser.phone_number)
      ) {
        messageCreate.phone_number = "Số điện thoại không đúng định dạng";
      }

      const checkMessageValidate = Object.values(messageCreate).find(
        (messageItem) => messageItem.length > 0
      );

      if (!checkMessageValidate) {
        return res
          .status(AppConst.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: JSON.stringify(messageCreate) }));
      } else {
        dataCreateUser.password = hashSync(dataCreateUser.password, 10);
        req.body = dataCreateUser;
        next();
      }
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkAdminDeleteUser = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
