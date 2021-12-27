import { database } from '../configs';
import { AppConst } from '../const';
import {
  responseFormat,
  convertTitleToAlias,
  requestObjectMultiLang,
  handleAliasResult,
} from '../utils';

const Product = database.Model.productModel;
const Op = database.Sequelize.Op;
const Shop = database.Model.shopModel;

const formatProductData = {
  name: '',
  summary: '',
  description: '',
  story: '',
  images: '',
  price: '',
  type: '',
  made_in: '',
  vectary_link: '',
  sold: '',
  in_stock: '',
  status: '',
  shop_id: '',
};

export const checkCreateProduct = async (req, res, next) => {
  try {
    const productData = { ...formatProductData };

    //Check if name is empty
    if (!req.body.name) {
      productData.name = 'Yêu cầu nhập tên sản phẩm!';
    } else {
      const productName = await Product.findOne({
        where: {
          name: req.body.name,
        },
      });
      if (productName) {
        productData.name = 'Đã tồn tại sản phẩm!';
      }
    }

    //Check if summary is empty
    if (!req.body.summary) {
      productData.summary = 'Yêu cầu nhập tổng quan về sản phẩm!';
    }

    //Check if description is empty
    if (!req.body.description) {
      productData.description = 'Yêu cầu nhập mô tả sản phẩm!';
    }

    //Check if story is empty
    if (!req.body.story) {
      productData.story = 'Yêu cầu nhập câu chuyện về sản phẩm!';
    }

    //Check if have images and ok
    const imageCheck = req.body.images;
    if (!imageCheck.length) {
      productData.images = 'Yêu cầu thêm ảnh sản phẩm!';
    } else {
      imageCheck.map((item) => {
        console.log(item.image);
        if (item.image === '') productData.images = 'Ảnh không hợp lệ!';
      });
    }

    //Check if price is empty
    if (!req.body.price) {
      productData.price = 'Yêu cầu nhập giá của sản phẩm!';
    }

    //Check if type is empty
    if (!req.body.type) {
      productData.price = 'Yêu cầu nhập loại sản phẩm!';
    }

    //Check if made_in is empty
    if (!req.body.made_in) {
      productData.price = 'Yêu cầu nhập nơi xuất xứ sản phẩm!';
    }

    //Check if vectary_link is empty
    if (!req.body.vectary_link) {
      productData.vectary_link = 'Yêu cầu nhập link AR!';
    }

    //Check if name is empty
    if (!req.body.in_stock) {
      productData.in_stock = 'Yêu cầu nhập sản phẩm còn trong kho!';
    }

    // Check status is not exist in object
    if (!Object.values(AppConst.STATUS).includes(req.body.status)) {
      messagePost.status = 'Status không tồn tại!';
    }

    const shopId = req.body.shop_id;
    const shops = await Shop.findAll();
    const shopIdFromDatabase = shops?.map(({ id }) => id) || [];

    const isExistShop = shopIdFromDatabase.includes(shopId);

    if (!isExistShop) {
      productData.shop_id = 'Shop này không tồn tại!';
    }

    const images =
      req.body.images?.map(({ image }) => ({ image: image })) || [];

    const refactorProductData = {
      name: req.body.name,
      summary: req.body.summary,
      description: req.body.description,
      story: req.body.story,
      images: JSON.stringify(images),
      alias: convertTitleToAlias(req.body.name) + '.html',
      price: req.body.price,
      type: req.body.type,
      made_in: req.body.made_in,
      vectary_link: req.body.vectary_link,
      sold: 0,
      in_stock: req.body.in_stock,
      status: req.body.status
        ? parseInt(req.body.status)
        : AppConst.STATUS.draft,
      shop_id: shopId,
      number_view: 0,
    };

    const checkProductValidate = Object.values(productData).find(
      (item) => item.length > 0
    );

    if (checkProductValidate) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: JSON.stringify(productData) }));
    } else {
      req.body = refactorProductData;
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkUpdateProduct = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkDeleteProduct = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkCreateRatingProduct = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
