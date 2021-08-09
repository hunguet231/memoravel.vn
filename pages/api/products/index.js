import connectDB from "../../../utils/connectDB";
import Products from "../../../models/Product";
import slugify from "slugify";
import short from "short-uuid";
import auth from "../../../middlewares/auth";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.category !== "all")
      this.query.find({ category: queryObj.category });
    if (queryObj.title !== "all")
      this.query.find({ title: { $regex: queryObj.title } });

    this.query.find();
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// @desc    Get all products
// @route   GET /products
// @access  Private
const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// @desc    Create a new product
// @route   POST /products
// @access  Private
const createProduct = async (req, res) => {
  try {
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
      user,
    } = req.body;

    if (!title || !details || !price || !images || !category) {
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

    const newPost = new Products({
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
      user,
    });

    await newPost.save();

    res.json({ msg: "Thêm thành công!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
