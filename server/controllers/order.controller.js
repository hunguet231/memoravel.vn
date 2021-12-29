import { database } from '../configs';
import { AppConst } from '../const';
import { responseFormat, convertPaging } from '../utils';

const Order = database.Model.orderModel;
const OrderProduct = database.Model.orderProductModel;
const Product = database.Model.productModel;
const Op = database.Sequelize.Op;

const formatResponse = (data) => ({
  id: data.id,
  status: data.status,
  active: data.active,
  total_paid: data.total_paid,
  shipping: data.shipping,
  full_name: data.full_name,
  phone: data.phone,
  country: data.district,
  city: data.city,
  district: data.district,
  ward: data.ward,
  address_details: data.address_details,
  order_items: data.order_products.map((item) => ({
    id: item.product.id,
    quantity: item.quantity,
    name: item.product.name,
    summary: item.product.summary,
    images: JSON.parse(item.product.images),
    price: item.product.price,
    type: item.product.type,
  })),
  created: data.createdAt,
  modified: data.updatedAt,
});

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const arrayOrderProduct = req.body.order_items.map((item) => ({
      ...item,
      order_id: order.dataValues.id,
    }));
    await OrderProduct.bulkCreate(arrayOrderProduct);

    const dataOrder = await findOneOrder(order.dataValues.id);

    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: formatResponse(dataOrder) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const updateOrder = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getListOrder = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getOrderById = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const deleteOrder = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const findOneOrder = async (id) =>
  await Order.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: OrderProduct,
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  });
