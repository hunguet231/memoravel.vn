import express from 'express';
import { ApiConst } from '../const';
import { ShopController } from '../controllers';
import { CommonMiddleware, ShopMiddleware } from '../middleware';

const shopRoute = express.Router();

// ADMIN API
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

shopRoute.get(
  ApiConst.ADMIN_SHOP_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesAdmin,
  ShopController.getShopDetail
);

shopRoute.get(
  ApiConst.ADMIN_SHOP,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesAdmin,
  ShopController.getListShop
);

shopRoute.delete(
  ApiConst.ADMIN_SHOP_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesAdmin,
  ShopMiddleware.checkDeleteShop,
  ShopController.deleteShop
);

// USER API

export default shopRoute;
