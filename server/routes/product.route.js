import express from 'express';
import { ApiConst } from '../const';
import { ProductController } from '../controllers';
import { CommonMiddleware, ProductMiddleware } from '../middleware';

const productRoute = express.Router();

productRoute.post(
  ApiConst.MANAGE_PRODUCT,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  ProductMiddleware.checkCreateProduct,
  ProductController.createProduct
);

productRoute.put(
  ApiConst.MANAGE_PRODUCT_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  ProductMiddleware.checkUpdateProduct,
  ProductController.updateProduct
);

productRoute.get(
  ApiConst.MANAGE_PRODUCT,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  ProductController.getAllProduct
);

productRoute.get(
  ApiConst.MANAGE_PRODUCT_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  ProductMiddleware.checkGetProductById,
  ProductController.getProductById
);

export default productRoute;
