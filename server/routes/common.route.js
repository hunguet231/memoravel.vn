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

export default commonRoute;
