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
    await Order.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id: req.params.order_id,
        },
      }
    );

    const dataOrder = await findOneOrder(req.params.order_id);
    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: formatResponse(dataOrder) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getListOrder = async (req, res) => {
  try {
    const dataPage = convertPaging(req);
    const pagination =
      dataPage.paging === 0
        ? {}
        : {
            limit: dataPage.size,
            offset: (dataPage.page - 1) * dataPage.size,
          };

    const queryDataOrder = {};
    if (dataPage.search) {
      queryDataOrder.name = {
        [Op.like]: `%${dataPage.search}%`,
      };
    }

    const { count, rows: data } = await Order.findAndCountAll({
      ...pagination,
      where: {
        ...queryDataOrder,
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
      distinct: true,
    });

    const formatData = data.map((item) => formatResponse(item));

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

export const getOrderById = async (req, res) => {
  try {
    const dataOrder = await findOneOrder(req.params.order_id);

    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: formatResponse(dataOrder) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const dataOrder = await findOneOrder(req.params.order_id);
    const arrayId = dataOrder.order_products.map(({ id }) => id);

    const deleteChild = arrayId.map(
      async (id) =>
        await OrderProduct.destroy({
          where: {
            id: id,
          },
        })
    );
    Promise.all(deleteChild);
    await Order.destroy({
      where: {
        id: req.params.order_id,
      },
    });

    res.status(AppConst.STATUS_OK).json(responseFormat());
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
