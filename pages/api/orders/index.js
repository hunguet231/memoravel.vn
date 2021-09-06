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
