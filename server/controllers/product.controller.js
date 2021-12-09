import { database } from '../configs';
import { AppConst } from '../const';
import { responseFormat, convertPaging } from '../utils';

const Product = database.Model.productModel;
const Op = database.Sequelize.Op;

export const createProduct = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
