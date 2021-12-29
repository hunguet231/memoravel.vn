import { database } from '../configs';
import { AppConst } from '../const';
import { responseFormat, convertPaging } from '../utils';

const Product = database.Model.productModel;
const Shop = database.Model.shopModel;
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
    details: data.details,
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

const findProductById = async (id) =>
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
