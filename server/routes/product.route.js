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

productRoute.delete(
  ApiConst.MANAGE_PRODUCT_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  ProductMiddleware.checkDeleteProduct,
  ProductController.deleteProduct
);

productRoute.get(ApiConst.PRODUCT_ALIAS, ProductController.getProductByAlias);

productRoute.get(ApiConst.PRODUCT_HOT, ProductController.getListProductHot);

export default productRoute;
