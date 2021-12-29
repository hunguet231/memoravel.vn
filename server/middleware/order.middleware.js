import { database } from '../configs';
import { AppConst } from '../const';
import {
  responseFormat,
  isValidPhoneFormat,
  mappingArrayErrorToString,
} from '../utils';

const Order = database.Model.orderModel;
const Product = database.Model.productModel;

export const checkCreateOrder = async (req, res, next) => {
  try {
    const arrayError = [];

    if (!req.body.full_name) {
      arrayError.push('Required input fullname');
    }
    if (!req.body.phone) {
      arrayError.push('Required input phone number');
    } else if (!isValidPhoneFormat(req.body.phone)) {
      arrayError.push('Phone number format is illegal');
    }
    if (!req.body.country) {
      arrayError.push('Required input country');
    }
    if (!req.body.city) {
      arrayError.push('Required input city');
    }
    if (!req.body.order_items?.length) {
      arrayError.push('Required choose product');
    }

    const arrayProduct = await Product.findAll({
      attributes: ['id', 'price'],
    });

    if (arrayProduct?.length) {
      let total_paid = 0;
      arrayProduct.forEach((item) => {
        let curProd = req.body.order_items.find(
          (child) => child.product_id === item.id
        );
        if (curProd) {
          total_paid += parseInt(item.price) * curProd.quantity;
        }
      });
      if (total_paid !== 0) {
        req.body.total_paid = total_paid;
      }
    }

    const StringResponseError = await mappingArrayErrorToString(arrayError);
    if (StringResponseError) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: StringResponseError }));
    } else {
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkUpdateStatusOrder = async (req, res, next) => {
  try {
    const isExistOrder = await Order.findByPk(req.params.order_id);
    if (isExistOrder) {
      next();
    } else {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Order is invalid' }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkMnGetOrderById = async (req, res, next) => {
  try {
    const isExistOrder = await Order.findByPk(req.params.order_id);
    if (isExistOrder) {
      next();
    } else {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Order is invalid' }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkMnDeleteOrder = async (req, res, next) => {
  try {
    const isExistOrder = await Order.findByPk(req.params.order_id);
    if (isExistOrder) {
      next();
    } else {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Order is invalid' }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
