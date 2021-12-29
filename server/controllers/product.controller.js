import { database } from '../configs';
import { AppConst } from '../const';
import {
  responseFormat,
  convertPaging,
  requestObjectMultiLang,
  responseObjectMultiLang,
} from '../utils';

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
    //continue here
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
