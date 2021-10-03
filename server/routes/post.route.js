import express from "express";
import { ApiConst } from "../const";
import { MnPostController, PostController } from "../controllers";
import {
  CommonMiddleware,
  MnPostMiddleware,
  PostMiddleware,
} from "../middleware";

const postRoute = express.Router();

postRoute.post(
  ApiConst.MANAGE_POST,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  MnPostMiddleware.checkMnCreatePost,
  MnPostController.mnCreatePost
);

postRoute.put(
  ApiConst.MANAGE_POST_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  MnPostMiddleware.checkMnEditPost,
  MnPostController.mnEditPost
);

postRoute.get(
  ApiConst.MANAGE_POST,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  MnPostMiddleware.checkMnGetListPost,
  MnPostController.mnGetListPost
);

postRoute.get(
  ApiConst.MANAGE_POST_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  MnPostMiddleware.checkMnGetPostById,
  MnPostController.mnGetPostById
);

postRoute.delete(
  ApiConst.MANAGE_POST_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  MnPostMiddleware.checkMnDeletePost,
  MnPostController.mnDeletePost
);

postRoute.get(
  ApiConst.GET_POST,
  PostMiddleware.checkGetPost,
  PostController.getPost
);

postRoute.get(
  ApiConst.GET_POST_BY_ALIAS,
  PostMiddleware.checkGetPostByAlias,
  PostController.getPostByAlias
);

postRoute.get(
  ApiConst.GET_POST_HOT,
  PostMiddleware.checkGetPostHot,
  PostController.getPostHot
);

export default postRoute;
