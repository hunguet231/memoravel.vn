import { database } from '../configs';
import { AppConst } from '../const';
import { ProductController } from '../controllers';
import {
  responseFormat,
  convertTitleToAlias,
  mappingArrayErrorToString,
} from '../utils';

const Product = database.Model.productModel;
const Op = database.Sequelize.Op;
const Shop = database.Model.shopModel;

export const checkCreateProduct = async (req, res, next) => {
  try {
    const arrayError = [];

    //Check if name is empty
    if (!req.body.name) {
      arrayError.push('Yêu cầu nhập tên sản phẩm');
    } else {
      const productName = await Product.findOne({
        where: {
          name: req.body.name,
        },
      });
      if (productName) {
        arrayError.push('Đã tồn tại sản phẩm');
      }
    }

    //Check if description is empty
    if (!req.body.description) {
      arrayError.push('Yêu cầu nhập mô tả sản phẩm');
    }

    //Check if have images and ok
    const imageCheck = req.body.images;
    if (!imageCheck.length) {
      arrayError.push('Yêu cầu thêm ảnh sản phẩm');
    } else {
      imageCheck.map((item) => {
        if (!item.image) arrayError.push('Ảnh không hợp lệ');
      });
    }

    //Check if price is empty
    if (!req.body.price) {
      arrayError.push('Yêu cầu nhập giá của sản phẩm');
    }
    //Check if type is empty
    if (!req.body.type) {
      arrayError.push('Yêu cầu nhập loại sản phẩm');
    }
    //Check if made_in is empty
    if (!req.body.made_in) {
      arrayError.push('Yêu cầu nhập nơi xuất xứ sản phẩm');
    }
    //Check if name is empty
    if (!req.body.in_stock) {
      arrayError.push('Yêu cầu nhập sản phẩm còn trong kho');
    }
    // Check status is not exist in object
    if (!Object.values(AppConst.STATUS).includes(req.body.status)) {
      arrayError.push('Status không tồn tại');
    }

    const shopData = await Shop.findOne({
      where: {
        id: req.body.shop_id,
      },
    });
    if (!shopData) {
      arrayError.push('Shop này không tồn tại');
    }

    const refactorProductData = {
      name: req.body.name,
      summary: req.body.summary,
      description: req.body.description,
      story: req.body.story,
      images: JSON.stringify(req.body.images),
      alias: convertTitleToAlias(req.body.name) + '.html',
      price: req.body.price,
      type: req.body.type,
      made_in: req.body.made_in,
      vectary_link: req.body.vectary_link,
      sold: 0,
      in_stock: req.body.in_stock,
      total_star: 0,
      total_amount: 0,
      status: req.body.status
        ? parseInt(req.body.status)
        : AppConst.STATUS.draft,
      shop_id: req.body.shop_id,
      number_view: 0,
      details: req.body.details ? JSON.stringify(req.body.details) : '',
    };

    const StringResponseError = await mappingArrayErrorToString(arrayError);
    if (StringResponseError) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: StringResponseError }));
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
    const productId = req.params.product_id;
    if (!productId) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: 'Yêu cầu có product_id' }));
    }

    const arrayError = [];
    const refactorProductData = {};

    //Check if name is empty
    if (req.body.name === '') {
      arrayError.push('Yêu cầu nhập tên sản phẩm');
    } else if (req.body.name) {
      const productName = await Product.findOne({
        where: {
          id: {
            [Op.ne]: productId,
          },
          name: req.body.name,
        },
      });
      if (productName) {
        arrayError.push('Đã tồn tại sản phẩm');
      }
      refactorProductData.name = req.body.name;
    }

    if (req.body.summary) {
      refactorProductData.summary = req.body.summary;
    }

    //Check if description is empty
    if (req.body.description === '') {
      arrayError.push('Yêu cầu nhập mô tả sản phẩm');
    } else if (req.body.description) {
      refactorProductData.description = req.body.description;
    }

    if (req.body.story) {
      refactorProductData.story = req.body.story;
    }

    //Check if have images and ok
    if (req.body.images) {
      const imageCheck = req.body.images;
      if (!imageCheck.length) {
        arrayError.push('Yêu cầu thêm ảnh sản phẩm');
      } else {
        imageCheck.map((item) => {
          if (item.image === '') arrayError.push('Ảnh không hợp lệ');
        });
      }
      refactorProductData.images = JSON.stringify(req.body.images);
    }

    //Check if price is empty
    if (req.body.price === '') {
      arrayError.push('Yêu cầu nhập giá của sản phẩm');
    } else if (req.body.price) {
      refactorProductData.price = req.body.price;
    }

    //Check if type is empty
    if (req.body.type === '') {
      arrayError.push('Yêu cầu nhập loại sản phẩm');
    } else if (req.body.type) {
      refactorProductData.type = req.body.type;
    }

    //Check if made_in is empty
    if (req.body.made_in === '') {
      arrayError.push('Yêu cầu nhập nơi xuất xứ sản phẩm');
    } else if (req.body.made_in) {
      refactorProductData.made_in = req.body.made_in;
    }

    if (req.body.vectary_link) {
      refactorProductData.vectary_link = req.body.vectary_link;
    }

    //Check if name is empty
    if (req.body.in_stock === '') {
      arrayError.push('Yêu cầu nhập sản phẩm còn trong kho');
    } else if (req.body.in_stock || req.body.in_stock === 0) {
      refactorProductData.in_stock = req.body.in_stock;
    }

    // Check status is not exist in object
    if (
      req.body.status &&
      !Object.values(AppConst.STATUS).includes(req.body.status)
    ) {
      arrayError.push('Status không tồn tại');
    } else if (req.body.status) {
      refactorProductData.status = req.body.status;
    }

    if (req.body.details) {
      refactorProductData.details = JSON.stringify(req.body.details);
    }

    const StringResponseError = await mappingArrayErrorToString(arrayError);
    if (StringResponseError) {
      res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: StringResponseError }));
    } else if (!Object.values(refactorProductData).length) {
      res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Không có thay đổi!' }));
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

export const checkGetProductById = async (req, res, next) => {
  try {
    const isExistProduct = await Product.findByPk(req.params.product_id);
    if (isExistProduct) {
      next();
    } else {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'product_id không hợp lệ' }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkDeleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.product_id;

    if (!productId) {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Required product_id' }));
    }

    const productDetails = await ProductController.findProductById(productId);

    if (productDetails) {
      next();
    } else {
      res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Product is not exist' }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkCreateRatingProduct = async (req, res, next) => {
  try {
    const reqData = req.body;
    const arrayError = [];
    if (!reqData.product_id) {
      arrayError.push('product_id is required');
    } else {
      const productDetails = await ProductController.findProductById(
        reqData.product_id
      );
      if (!productDetails) {
        return res
          .status(AppConst.STATUS_NOT_FOUND)
          .json(responseFormat({ message: 'Product is not exist' }));
      }
      req.body.product = productDetails;
    }
    if (!reqData.comment) {
      arrayError.push('comment is required');
    }
    if (!reqData.star) {
      arrayError.push('star is required');
    }
    const StringResponseError = await mappingArrayErrorToString(arrayError);
    if (StringResponseError || arrayError.length > 0) {
      return res.status(AppConst.STATUS_BAD_REQUEST).json(
        responseFormat({
          message: StringResponseError || 'Request has error',
        })
      );
    } else {
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
