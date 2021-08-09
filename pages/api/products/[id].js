/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Products from "../../../models/Product";
import auth from "../../../middlewares/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

// @desc    Get product by ID
// @route   GET /products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);
    if (!product)
      return res.status(400).json({ err: "Sản phẩm không tồn tại!" });

    res.json({ product });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// @desc    Update product
// @route   PUT /products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);

    if (!product)
      return res.status(400).json({ err: "Sản phẩm không tồn tại!" });

    // make sure user is product owner
    if (
      product.user.toString() != req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ err: "Không có quyền chỉnh sửa sản phẩm này!" });
    }

    const {
      title,
      summary,
      story,
      details,
      price,
      images,
      vectary_link,
      category,
      in_stock,
    } = req.body;

    if (!title || !details || !price || !images || !category || !in_stock) {
      return res
        .status(400)
        .json({ err: "Hãy nhập tất cả các trường bắt buộc!" });
    }

    const slug =
      slugify(title, {
        lower: true,
        locale: "vi",
      }) +
      "-" +
      short.generate();

    await Products.findOneAndUpdate(
      { _id: id },
      {
        title,
        summary,
        story,
        details,
        price,
        images,
        vectary_link,
        category,
        in_stock,
        slug,
      }
    );

    res.json({ msg: "Sửa đổi thành công!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);

    if (!product)
      return res.status(400).json({ err: "Sản phẩm không tồn tại!" });

    // make sure user is product owner
    if (
      product.user.toString() != req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ err: "Không có quyền xoá sản phẩm này!" });
    }

    await Products.findByIdAndDelete(id);

    res.json({ msg: "Xoá thành công!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
