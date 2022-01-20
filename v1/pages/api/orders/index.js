/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/Order";
import Products from "../../../models/Product";
import auth from "../../../middlewares/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      await getOrders(req, res);
      break;
  }
};

const getOrders = async (req, res) => {
  try {
    const result = await auth(req, res);

    let orders;
    if (result.role !== "admin") {
      orders = await Orders.find({ user: result.id }).populate(
        "user",
        "-password"
      );
    } else {
      orders = await Orders.find();
    }

    res.json({ orders });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { fullname, address, phone, cart, method, total } = req.body;

    const newOrder = new Orders({
      user: result.id,
      fullname,
      address,
      phone,
      cart,
      method,
      total,
    });

    await newOrder.save();

    res.json({ msg: "Đặt hàng thành công!", newOrder });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
