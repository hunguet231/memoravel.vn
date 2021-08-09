import connectDB from "../../../../utils/connectDB";
import Products from "../../../../models/Product";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
  }
};

// @desc    Get all products for user
// @route   GET /products/user/:userId
// @access  Private
const getProducts = async (req, res) => {
  try {
    const products = await Products.find({ user: `${req.query.userId}` });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
