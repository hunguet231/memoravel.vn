import { database } from "../configs";
import { AppConst } from "../const";
import {
  responseFormat,
  requestObjectMultiLang,
  handleAliasResult,
} from "../utils";

const Product = database.Model.productModel;

const message = {
    name = "",
    summary = "",
    story = "",
    price = "",
    vectary_link = "",
    slug = "",
    in_stock = "",
    status = "",
}

export const checkCreateProduct = async (req, res, next) => {
  try {
    const messageProduct = { ...message };

    // Check name is empty
    if (!requestObjectMultiLang(req.body.name, true)) {
      messageProduct.name = "Yêu cầu nhập tên sản phẩm !";
    } else {
      const product = await Product.findOne({
        where: {
          product: requestObjectMultiLang(req.body.name),
        },
      });
      if (product) {
        messageProduct.name = "Tên đã tồn tại!"; // cậu check lại chỗ này xem có cần ko nhé ^^
      }
    }
    // Check status is not exist in object
    if (!Object.values(AppConst.STATUS).includes(req.body.status)) {
      messageProduct.status = "Status không tồn tại!";
    }

    const name = requestObjectMultiLang(req.body.name);
    const refactorProductData = {
      name: name,
      summary: requestObjectMultiLang(req.body.summary),
      story: requestObjectMultiLang(req.body.story),
      price: requestObjectMultiLang(req.body.price),
      vectary_link: requestObjectMultiLang(req.body.vectary_link),
      slug: requestObjectMultiLang(req.body.slug), 
      in_stock: requestObjectMultiLang(req.body.in_stock),  
      status: req.body.status
        ? parseInt(req.body.status)
        : AppConst.STATUS.draft,
    };

    const checkMessageValidate = Object.values(messageTopic).find(
      (messageItem) => messageItem.length > 0
    );

    if (checkMessageValidate) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: JSON.stringify(messageProduct) }));
    } else {
      req.body = refactorProductData;
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkGetProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id:req.params.product_id
    },
  });
    if (product) {
      next();
    } else {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "product_id không tồn tại" }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkEditProduct = async (req, res, next) => {
  try {
    const messageProduct = { ...message };

    if (!req.params.product_id) {
      messageProduct.id = "Yêu cầu product_id!";
    }

    if (!requestObjectMultiLang(req.body.name, true)) {
      messageProduct.name = "Yêu cầu nhập tên !";
    } else {
      const product = await Product.findOne({
        where: {
          id: {
            [Op.ne]: req.params.product_id,
          },
          name: requestObjectMultiLang(req.body.name),
        },
      });
      if (topic) {
        messageProduct.name = "Tên đã tồn tại!";
      }
    }

    if (!requestObjectMultiLang(req.body.story, true)) {
      messageProduct.story = "Yêu cầu viết story !";
    } 
    
    // Check status is not exist in object
    if (!Object.values(AppConst.STATUS).includes(req.body.status)) {
      messageTopic.status = "Status không tồn tại!";
    }

    const name = requestObjectMultiLang(req.body.name);
    const refactorProductData = {
      name: name,
      summary: requestObjectMultiLang(req.body.summary),
      story: requestObjectMultiLang(req.body.story),
      price: requestObjectMultiLang(req.body.price),
      vectary_link: requestObjectMultiLang(req.body.vectary_link),
      slug: requestObjectMultiLang(req.body.slug), 
      in_stock: requestObjectMultiLang(req.body.in_stock),  
      status: req.body.status
        ? parseInt(req.body.status)
        : AppConst.STATUS.draft,
    };

    const checkMessageValidate = Object.values(messageProduct).find(
      (messageItem) => messageItem.length > 0
    );

    if (checkMessageValidate) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: JSON.stringify(messageProduct) }));
    } else {
      req.body = refactorProductData;
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.product_id,
      },
    });
    if (!product) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Product không tồn tại!" }));
    } else {
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};