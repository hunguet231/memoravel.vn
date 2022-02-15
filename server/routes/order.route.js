import express from 'express';
import { ApiConst } from '../const';
import { OrderController } from '../controllers';
import { CommonMiddleware, OrderMiddleware } from '../middleware';

const orderRoute = express.Router();

orderRoute.post(
  ApiConst.ORDER,
  OrderMiddleware.checkCreateOrder,
  OrderController.createOrder
);

orderRoute.put(
  ApiConst.MANAGE_ORDER_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  OrderMiddleware.checkUpdateStatusOrder,
  OrderController.updateOrder
);

orderRoute.get(
  ApiConst.MANAGE_ORDER_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  OrderMiddleware.checkMnGetOrderById,
  OrderController.getOrderById
);

orderRoute.get(
  ApiConst.MANAGE_ORDER,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  OrderController.getListOrder
);

orderRoute.delete(
  ApiConst.MANAGE_ORDER_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  OrderMiddleware.checkMnDeleteOrder,
  OrderController.deleteOrder
);

export default orderRoute;
