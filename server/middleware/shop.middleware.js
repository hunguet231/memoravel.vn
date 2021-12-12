import { database } from '../configs';
import { AppConst } from '../const';
import {
  responseFormat,
  convertTitleToAlias,
  mappingArrayErrorToString,
} from '../utils';

const Shop = database.Model.shopModel;
const Op = database.Sequelize.Op;

export const checkCreateShop = async (req, res, next) => {
  try {
    const reqData = req.body;
    const arrayError = [];
    if (!reqData.name) {
      arrayError.push('Name shop is required');
    } else {
      const shop = await Shop.findOne({
        where: {
          alias: convertTitleToAlias(reqData.name) + '.html',
        },
      });
      if (shop) {
        arrayError.push('Name shop is exist');
      }
    }
    if (!Object.values(AppConst.STATUS).includes(reqData.status)) {
      arrayError.push('Status is invalid');
    }
    if (!reqData.address) {
      arrayError.push('Address is required');
    } else if (!reqData.address?.country) {
      arrayError.push('Country is required');
    }
    if (!reqData.address?.city) {
      arrayError.push('City is required');
    }
    const StringResponseError = await mappingArrayErrorToString(arrayError);
    if (StringResponseError || arrayError.length > 0) {
      return res.status(AppConst.STATUS_BAD_REQUEST).json(
        responseFormat({
          message: StringResponseError || 'Request has error',
        })
      );
    } else {
      req.body = {
        name: reqData.name,
        avatar: reqData.avatar || '',
        cover: reqData.cover || '',
        alias: convertTitleToAlias(reqData.name) + '.html',
        description: reqData.description || '',
        status: reqData.status,
        address: {
          country: reqData.address.country,
          city: reqData.address.city || '',
          district: reqData.address.district || '',
          address_details: reqData.address.address_details || '',
        },
      };
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkUpdateShop = async (req, res, next) => {
  try {
    const shopId = req.params.shop_id;
    if (!shopId) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: 'Required shop_id' }));
    }

    const reqData = req.body;
    const arrayError = [];

    if (reqData.name === '') {
      arrayError.push('Name shop is required');
    } else if (reqData.name) {
      const alias = convertTitleToAlias(reqData.name) + '.html';
      const shop = await Shop.findOne({
        where: {
          id: {
            [Op.ne]: shopId,
          },
          alias: alias,
        },
      });

      if (shop) {
        arrayError.push('Name shop is exist');
      } else {
        req.body.alias = alias;
      }
    }

    if (
      reqData.status &&
      !Object.values(AppConst.STATUS).includes(reqData.status)
    ) {
      arrayError.push('Status is invalid');
    }
    if (reqData.address) {
      if (!reqData.address.country) {
        arrayError.push('Country is required');
      }
      if (!reqData.address.city) {
        arrayError.push('City is required');
      }
    }

    const StringResponseError = await mappingArrayErrorToString(arrayError);
    if (StringResponseError || arrayError.length > 0) {
      return res.status(AppConst.STATUS_BAD_REQUEST).json(
        responseFormat({
          message: StringResponseError || 'Request has error',
        })
      );
    } else {
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkDeleteShop = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkCreateRatingShop = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
