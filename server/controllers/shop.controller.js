import { database } from '../configs';
import { AppConst } from '../const';
import { responseFormat, convertPaging } from '../utils';

const Shop = database.Model.shopModel;
const ShopAddress = database.Model.shopAddressModel;
const Op = database.Sequelize.Op;

const createDataFormat = (newShop, newAddress) => ({
  id: newShop.id,
  name: newShop.name,
  avatar: newShop.avatar,
  cover: newShop.cover,
  description: newShop.description,
  alias: newShop.alias,
  details: newShop.details,
  created: newShop.createdAt,
  modified: newShop.updatedAt,
  address: {
    country: newAddress.country,
    city: newAddress.city,
    district: newAddress.district,
    address_details: newAddress.address_details,
  },
});

export const createShop = async (req, res) => {
  try {
    const ShopData = { ...req.body, user_id: req.user_id };
    delete ShopData['address'];
    const newShop = await Shop.create(ShopData);

    const ShopAddressData = {
      ...req.body.address,
      total_rating: 0.0,
      total_comment: 0,
      shop_id: newShop.dataValues.id,
    };
    const newShopAddress = await ShopAddress.create(ShopAddressData);
    newShop.address = newShopAddress;

    res.status(AppConst.STATUS_CREATED).json(
      responseFormat({
        data: createDataFormat(newShop.dataValues, newShopAddress.dataValues),
      })
    );
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const updateShop = async (req, res) => {
  try {
    const shopId = req.params.shop_id;
    const ShopData = { ...req.body };

    if (req.body.address) {
      delete ShopData['address'];
    }

    await Shop.update(ShopData, {
      where: {
        id: shopId,
      },
    });

    if (req.body.address) {
      await ShopAddress.update(req.body.address, {
        where: {
          shop_id: shopId,
        },
      });
    }

    const shopDetails = await findOneShop(shopId);

    res.status(AppConst.STATUS_OK).json(
      responseFormat({
        data: createDataFormat(shopDetails, shopDetails.shop_address),
      })
    );
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getShopDetail = async (req, res) => {
  try {
    const shopId = req.params.shop_id;

    if (!shopId) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: 'Required shop_id' }));
    }

    const shopDetails = await findOneShop(shopId);

    if (shopDetails) {
      res.status(AppConst.STATUS_OK).json(
        responseFormat({
          data: createDataFormat(shopDetails, shopDetails.shop_address),
        })
      );
    } else {
      res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Shop is not exist' }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getListShop = async (req, res) => {
  try {
    const dataPage = convertPaging(req);
    const pagination =
      dataPage.paging === 0
        ? {}
        : {
            limit: dataPage.size,
            offset: (dataPage.page - 1) * dataPage.size,
          };

    const queryDataShop = {};
    if (dataPage.search) {
      queryDataShop.name = {
        [Op.like]: `%${dataPage.search}%`,
      };
    }
    if (dataPage.user_id) {
      queryDataShop.user_id = dataPage.user_id;
    }

    const { count, rows: data } = await Shop.findAndCountAll({
      ...pagination,
      where: {
        ...queryDataShop,
      },
      include: [
        {
          model: ShopAddress,
        },
      ],
      distinct: true,
    });

    const formatData = data.map((shopDetail) =>
      createDataFormat(shopDetail, shopDetail.shop_address)
    );

    const response =
      dataPage.paging === 0
        ? {
            data: formatData,
            total: count,
          }
        : {
            data: formatData,
            total: count,
            page: dataPage.page,
          };
    res.status(AppConst.STATUS_OK).json(responseFormat(response));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const deleteShop = async (req, res) => {
  try {
    const shopId = req.params.shop_id;

    await ShopAddress.destroy({
      where: {
        shop_id: shopId,
      },
    });
    await Shop.destroy({
      where: {
        id: shopId,
      },
    });

    res.status(AppConst.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const findOneShop = async (shopId) =>
  await Shop.findOne({
    where: {
      id: shopId,
    },
    include: [
      {
        model: ShopAddress,
      },
    ],
  });
