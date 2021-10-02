import express from "express";
import multer from "multer";
import { ApiConst } from "../const";
import { AuthController } from "../controllers";
import { CommonMiddleware, AuthMiddleware } from "../middleware";

const commonRoute = express.Router();
const imageUploader = multer({ dest: "images/" });

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

commonRoute.get(
  ApiConst.PROFILE,
  CommonMiddleware.verifyToken,
  AuthController.getProfile
);

commonRoute.post(
  ApiConst.UPLOAD,
  [imageUploader.single("file")],
  CommonMiddleware.verifyToken,
  AuthMiddleware.checkImageUpload,
  AuthController.uploadImage
);

commonRoute.get(
  ApiConst.IMAGE,
  AuthMiddleware.checkGetImage,
  AuthController.getImage
);

export default commonRoute;
