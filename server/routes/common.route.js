import express from "express";
import { ApiConst } from "../const";
import { AuthController } from "../controllers";
import { CommonMiddleware, AuthMiddleware } from "../middleware";

const commonRoute = express.Router();

commonRoute.post(
  ApiConst.LOGIN,
  AuthMiddleware.checkRequestLogin,
  AuthController.login
);

commonRoute.put(
  ApiConst.CHANGE_PASSWORD,
  CommonMiddleware.verifyToken,
  AuthMiddleware.checkRequestChangePassword,
  AuthController.changePassword
);

export default commonRoute;
