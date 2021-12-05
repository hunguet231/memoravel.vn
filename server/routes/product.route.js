import express from "express";
import { ApiConst } from "../const";
import { ProductController } from "../controllers";
import { CommonMiddleware, ProductMiddleware } from "../middleware";

const productRoute = express.Router();

productRoute.post(
    ApiConst.MANAGE_TOPIC,
    CommonMiddleware.verifyToken,
    CommonMiddleware.verifyRolesManage,
    ProductMiddleware.checkCreateProduct,
    ProductController.createProduct
);

prductRoute.put(
    ApiConst.MANAGE_TOPIC_ID,
    CommonMiddleware.verifyToken,
    CommonMiddleware.verifyRolesManage,
    ProductMiddleware.checkEditProduct,
    ProductController.editProduct
);

topicRoute.get(
    ApiConst.MANAGE_TOPIC,
    CommonMiddleware.verifyToken,
    CommonMiddleware.verifyRolesManage,
    ProductController.getAllProduct
);
  
productRoute.delete(
    ApiConst.MANAGE_TOPIC_ID,
    CommonMiddleware.verifyToken,
    CommonMiddleware.verifyRolesManage,
    ProductMiddleware.checkDeleteProduct,
    ProductController.deleteProduct
);

