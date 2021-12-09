import { database } from '../configs';
import { AppConst } from '../const';
import { responseFormat, convertTitleToAlias } from '../utils';

const Product = database.Model.productModel;
const Op = database.Sequelize.Op;

export const checkCreateProduct = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkUpdateProduct = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkDeleteProduct = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkCreateRatingProduct = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
