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
export default productRoute;
