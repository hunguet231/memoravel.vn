import { database } from '../configs';
import { AppConst } from '../const';
import { responseFormat, convertPaging } from '../utils';

const Shop = database.Model.shopModel;
const ShopAddress = database.Model.shopAddressModel;
const Op = database.Sequelize.Op;

const createDataFormat = (newShop, newAddress) => ({
  id: newShop.dataValues.id,
  name: newShop.dataValues.name,
  avatar: newShop.dataValues.avatar,
  cover: newShop.dataValues.cover,
  description: newShop.dataValues.description,
  alias: newShop.dataValues.alias,
  details: newShop.dataValues.details,
  created: newShop.dataValues.createdAt,
  modified: newShop.dataValues.updatedAt,
  address: {
    country: newAddress.dataValues.country,
    city: newAddress.dataValues.city,
    district: newAddress.dataValues.district,
    address_details: newAddress.dataValues.address_details,
  },
});

export const createShop = async (req, res) => {
  try {
    const ShopData = { ...req.body, user_id: req.user_id };
    delete ShopData['address'];
    const newShop = await Shop.create(ShopData);

    const ShopAddressData = {
      ...req.body.address,
      shop_id: newShop.dataValues.id,
    };
    const newShopAddress = await ShopAddress.create(ShopAddressData);
    newShop.address = newShopAddress;

    res
      .status(AppConst.STATUS_CREATED)
      .json(
        responseFormat({ data: createDataFormat(newShop, newShopAddress) })
      );
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
