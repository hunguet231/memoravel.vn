import express from "express";
import { ApiConst } from "../const";
import { UserController } from "../controllers";
import { CommonMiddleware, UserMiddleware } from "../middleware";

const userRoute = express.Router();

userRoute.post(
  ApiConst.ADMIN_USER,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesAdmin,
  UserMiddleware.checkAdminCreateUser,
  UserController.adminCreateUser
);

userRoute.put(
  ApiConst.ADMIN_USER_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesAdmin,
  UserMiddleware.checkAdminEditUser,
  UserController.adminEditUser
);

userRoute.get(
  ApiConst.ADMIN_USER,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesAdmin,
  UserMiddleware.checkAdminGetListUser,
  UserController.adminGetListUser
);

userRoute.delete(
  ApiConst.ADMIN_USER_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesAdmin,
  UserMiddleware.checkAdminDeleteUser,
  UserController.adminDeleteUser
);

export default userRoute;
