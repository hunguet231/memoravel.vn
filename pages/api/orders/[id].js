/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/Order";
import Products from "../../../models/Product";
import auth from "../../../middlewares/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getOrder(req, res);
      break;
  }
};

// @desc    Get all Order by shop id
// @route   GET /orders/:_id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const orders = await Orders.find();

    let dataResponse = orders.map((item) => {
      let formatData = {};
      item.cart.forEach((product) => {
        if (product.shop_id == req.query.id) {
          formatData.title = product.title;
          formatData.images = product.images;
          formatData.quantity = product.quantity;
        }
      });
      formatData._id = item._id;
      formatData.fullname = item.fullname;
      formatData.phone = item.phone;
      formatData.address = item.address;
      formatData.delivered = item.delivered;
      return formatData;
    });

    res.json({
      success: true,
      data: dataResponse,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
