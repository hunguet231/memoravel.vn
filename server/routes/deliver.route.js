import express from 'express';
import { ApiConst } from '../const';
import { DeliverController } from '../controllers';

const deliverRoute = express.Router();

deliverRoute.get(ApiConst.SHIPMENT_GET_FEE, DeliverController.getShipment);

deliverRoute.get(ApiConst.SHIPMENT_GET_ORDER, DeliverController.getOrder);

deliverRoute.post(
  ApiConst.SHIPMENT_CREATE_ORDER,
  DeliverController.createOrder
);

export default deliverRoute;
