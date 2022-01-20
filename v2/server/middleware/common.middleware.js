import jwt from "jsonwebtoken";
import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat } from "../utils";

const User = database.Model.userModel;
const Op = database.Sequelize.Op;

export const verifyToken = async (req, res, next) => {
  let authorization = req.headers["authorization"]?.split(" ");
  let token = authorization?.length >= 2 ? authorization[1] : "";
  if (!token) {
    return res
      .status(AppConst.STATUS_UNAUTHORIZED)
      .json(responseFormat({ message: "Unauthorized token invalid!" }));
  }

  await jwt.verify(token, AppConst.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(AppConst.STATUS_FORBIDDEN)
        .json(responseFormat({ message: "Unauthorized bad token!" }));
    } else {
      req.user_id = decoded.user_id;
      req.role = decoded.role;
      next();
    }
  });
};

export const verifyRolesAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user_id,
        status: AppConst.STATUS.publish,
        role: AppConst.ROLE.admin,
      },
    });
    if (user) {
      next();
    } else {
      return res
        .status(AppConst.STATUS_UNAUTHORIZED)
        .json(responseFormat({ message: "API bị giới hạn quyền truy cập!" }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const verifyRolesManage = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user_id,
        status: AppConst.STATUS.publish,
        role: {
          [Op.or]: [AppConst.ROLE.manage, AppConst.ROLE.admin],
        },
      },
    });
    if (user) {
      next();
    } else {
      return res
        .status(AppConst.STATUS_UNAUTHORIZED)
        .json(responseFormat({ message: "API bị giới hạn quyền truy cập!" }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
