import { database } from '../configs';
import { AppConst } from '../const';
import { responseFormat, convertPaging } from '../utils';

const Product = database.Model.productModel;
const Shop = database.Model.shopModel;
const ShopAddress = database.Model.shopAddressModel;
const ProductRating = database.Model.productRatingModel;
const User = database.Model.userModel;
const Op = database.Sequelize.Op;

const formatProductData = (data) => {
  return {
    id: data.id,
    name: data.name,
    summary: data.summary,
    description: data.description,
    story: data.story,
    images: JSON.parse(data.images),
    alias: data.alias,
    price: data.price,
    type: data.type,
    made_in: data.made_in,
    vectary_link: data.vectary_link,
    sold: data.sold,
    in_stock: data.in_stock,
    status: data.status,
    details: data.details ? JSON.parse(data.details) : '',
    shop_id: data.shop_id,
    number_view: 0,
    created: data.createdAt,
    modified: data.updatedAt,
  };
};
export const createProduct = async (req, res) => {
  try {
    const createProduct = await Product.create({ ...req.body });
    const getProduct = await findProductById(createProduct.id);

    res
      .status(AppConst.STATUS_CREATED)
      .json(responseFormat({ data: formatProductData(getProduct) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const updateProduct = async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.product_id,
      },
    });
    const getProduct = await findProductById(req.params.product_id);
    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: formatProductData(getProduct) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const dataPage = convertPaging(req);
    const pagination =
      dataPage.paging === 0
        ? {}
        : {
            limit: dataPage.size,
            offset: (dataPage.page - 1) * dataPage.size,
          };

    const queryDataProduct = {};
    if (dataPage.search) {
      queryDataProduct.name = {
        [Op.like]: `%${dataPage.search}%`,
      };
    }

    const { count, rows: data } = await Product.findAndCountAll({
      ...pagination,
      where: {
        ...queryDataProduct,
      },
      include: [{ model: Shop, attributes: ['id', 'name'] }],
      distinct: true,
    });

    const formatData = data.map((item) => formatProductData(item));

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

export const getProductById = async (req, res) => {
  try {
    const data = await findProductById(req.params.product_id);

    const formatData = formatProductData(data);
    res.status(AppConst.STATUS_OK).json(responseFormat({ data: formatData }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const findProductById = async (id) =>
  await Product.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Shop,
        attributes: ['id', 'name'],
      },
    ],
  });

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.product_id;

    await Product.destroy({
      where: {
        id: productId,
      },
    });

    res.status(AppConst.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

// USER API
const formatResposeProduct = (data) => ({
  id: data.id,
  name: data.name,
  summary: data.summary,
  description: data.description,
  story: data.story,
  images: JSON.parse(data.images),
  alias: data.alias,
  price: data.price,
  type: data.type,
  made_in: data.made_in,
  vectary_link: data.vectary_link,
  sold: data.sold,
  in_stock: data.in_stock,
  number_view: data.number_view,
  average_star:
    Math.round((data.total_star / data.total_amount + Number.EPSILON) * 100) /
      100 || 0,
  status: data.status,
  details: data.details,
  created: data.createdAt,
  shop: data.shop,
  rating: data.product_ratings,
});

export const getProductByAlias = async (req, res) => {
  try {
    const Alias = req.params.alias;

    const product = await Product.findOne({
      where: {
        alias: Alias,
        status: AppConst.STATUS.publish,
      },
      include: [
        {
          model: Shop,
          attributes: ['id', 'name', 'alias', 'avatar', 'details'],
          include: [
            {
              model: ShopAddress,
              attributes: [
                'country',
                'city',
                'district',
                'ward',
                'address_details',
              ],
            },
          ],
        },
        {
          model: ProductRating,
          attributes: ['comment', 'star'],
          include: [
            {
              model: User,
              attributes: ['full_name', 'avatar'],
            },
          ],
        },
      ],
    });

    if (!product) {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Shop is not exist' }));
    }

    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: formatResposeProduct(product) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getListProduct = async (req, res) => {
  try {
    const dataPage = convertPaging(req);
    const pagination = {
      limit: dataPage.size,
      offset: (dataPage.page - 1) * dataPage.size,
    };

    const queryDataProduct = {};
    if (dataPage.search) {
      queryDataProduct.name = {
        [Op.like]: `%${dataPage.search}%`,
      };
    }

    if (dataPage.shop_id) {
      queryDataProduct.shop_id = req.body.shop_id;
    }

    const { count, rows: data } = await Product.findAndCountAll({
      ...pagination,
      where: {
        ...queryDataProduct,
      },
      include: [
        {
          model: Shop,
          attributes: ['id', 'name', 'alias', 'avatar', 'details'],
          include: [
            {
              model: ShopAddress,
              attributes: [
                'country',
                'city',
                'district',
                'ward',
                'address_details',
              ],
            },
          ],
        },
        {
          model: ProductRating,
          attributes: ['comment', 'star'],
          include: [
            {
              model: User,
              attributes: ['full_name', 'avatar'],
            },
          ],
        },
      ],
      distinct: true,
    });

    const formatData = data.map((item) => formatResposeProduct(item));

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

export const getListProductHot = async (req, res) => {
  try {
    const limitPerPage = req.query?.limit || 5;
    const limit =
      parseInt(limitPerPage) > AppConst.LIMIT_PAGE_SIZE
        ? AppConst.LIMIT_PAGE_SIZE
        : parseInt(limitPerPage);

    const pagination = {
      limit: limit,
      offset: 0,
    };

    const { count, rows: data } = await Product.findAndCountAll({
      ...pagination,
      where: {
        status: AppConst.STATUS.publish,
      },
      include: [
        {
          model: Shop,
          attributes: ['id', 'name', 'alias', 'avatar', 'details'],
          include: [
            {
              model: ShopAddress,
              attributes: [
                'country',
                'city',
                'district',
                'ward',
                'address_details',
              ],
            },
          ],
        },
        {
          model: ProductRating,
          attributes: ['comment', 'star'],
          include: [
            {
              model: User,
              attributes: ['full_name', 'avatar'],
            },
          ],
        },
      ],
      order: [['sold', 'DESC']],
      distinct: true,
    });

    const formatData = data.map((dataMap) => formatResposeProduct(dataMap));

    const response = {
      data: formatData,
      total: count,
    };

    res.status(AppConst.STATUS_OK).json(responseFormat(response));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const productRating = async (req, res) => {
  try {
    const reqData = req.body;
    const arrayImages = Array.isArray(reqData.images) ? reqData.images : [];
    const stringImages = JSON.stringify(arrayImages);
    const createData = {
      product_id: reqData.product_id,
      comment: reqData.comment,
      star: reqData.star,
      images: stringImages,
      user_id: req.user_id,
    };

    const totalStar = reqData.product.total_star + reqData.star;
    const totalAmount = reqData.product.total_amount + 1;

    const newProductRating = await ProductRating.create(createData);
    await Product.update(
      {
        total_star: totalStar,
        total_amount: totalAmount,
      },
      {
        where: {
          id: reqData.product_id,
        },
      }
    );

    const dataProductRating = await ProductRating.findOne({
      where: {
        id: newProductRating.dataValues.id,
      },
      include: [
        {
          model: User,
          attributes: ['full_name', 'avatar'],
        },
      ],
    });

    const formatDataResponse = {
      id: dataProductRating.id,
      product_id: dataProductRating.product_id,
      comment: dataProductRating.comment,
      star: dataProductRating.star,
      image: JSON.parse(dataProductRating.images),
      created: dataProductRating.createdAt,
      rating_user: dataProductRating.user,
    };

    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: formatDataResponse }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

// USER API
