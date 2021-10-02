import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { renameSync } from "fs";
import { basename, resolve } from "path";
import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat } from "../utils";
const User = database.Model.userModel;

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.body.user_id,
        role: req.body.role,
        status: AppConst.STATUS.publish,
      },
    });

    if (!user) {
      res.status(AppConst.STATUS_FORBIDDEN).json(
        responseFormat({
          message: "Tài khoản của bạn đã bị vô hiệu hóa!",
        })
      );
    }

    let token = jwt.sign(
      {
        user_id: req.body.user_id,
        role: req.body.role,
      },
      AppConst.SECRET_KEY,
      {
        expiresIn: 86400, // Expires in 24 hours
      }
    );

    res.status(AppConst.STATUS_CREATED).json(
      responseFormat({
        data: {
          ...req.body,
          token: token,
        },
      })
    );
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const changePassword = async (req, res) => {
  try {
    await User.update(
      {
        password: bcrypt.hashSync(req.body.new_password, 10),
      },
      {
        where: {
          id: req.user_id,
        },
      }
    );
    res.status(AppConst.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user_id,
      },
      attributes: [
        "id",
        "username",
        "full_name",
        "gender",
        "date_of_birth",
        "email",
        "phone_number",
        "avatar",
        "role",
      ],
    });
    res.status(AppConst.STATUS_OK).json(responseFormat({ data: user }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const editProfile = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.user_id,
      },
    });

    const user = await User.findOne({
      where: {
        id: req.user_id,
      },
      attributes: [
        "id",
        "username",
        "full_name",
        "gender",
        "date_of_birth",
        "email",
        "phone_number",
        "avatar",
        "role",
      ],
    });
    res.status(AppConst.STATUS_OK).json(responseFormat({ data: user }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const uploadImage = async (req, res) => {
  try {
    const processedFile = req.file || {};
    let orgName = processedFile.originalname || "";
    orgName = orgName.trim().replace(/ /g, "-");
    const fullPathInServ = processedFile.path;
    const newFullPath = `${fullPathInServ}-${orgName}`;

    renameSync(fullPathInServ, newFullPath);

    let fileString = basename(newFullPath);
    let imageUri = `/api/image/` + fileString;

    res.status(AppConst.STATUS_OK).json(responseFormat({ data: imageUri }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const getImage = (req, res) => {
  try {
    res
      .status(AppConst.STATUS_OK)
      .sendFile(resolve(`./images/${req.params.image_name}`));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
