import express from 'express';
import { ApiConst } from '../const';
import { ShopController } from '../controllers';
import { CommonMiddleware, ShopMiddleware } from '../middleware';

const shopRoute = express.Router();

shopRoute.post(
  ApiConst.ADMIN_SHOP,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesAdmin,
  ShopMiddleware.checkCreateShop,
  ShopController.createShop
);

shopRoute.put(
  ApiConst.ADMIN_SHOP_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesAdmin,
  ShopMiddleware.checkUpdateShop,
  ShopController.updateShop
);

export default shopRoute;
