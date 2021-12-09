import express from 'express';
import { ApiConst } from '../const';
import { ShopController } from '../controllers';
import { CommonMiddleware, ShopMiddleware } from '../middleware';

const shopRoute = express.Router();

shopRoute.post(
  ApiConst.MANAGE_SHOP,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  ShopMiddleware.checkCreateShop,
  ShopController.createShop
);
export default shopRoute;
