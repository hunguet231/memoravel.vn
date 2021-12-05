import { database } from "../configs";
import { AppConst } from "../const";
import {
    responseFormat,
    responseObjectMultiLang,
    convertPaging,
  } from "../utils";

const Product = database.Model.productModel;
const Op = database.Sequelize.Op;

const responseData = (data) => ({
  id: data.id,
  title: data.title,
  summary: data.summary,
  story: data.story,
  price: data.price,
  vectary_link: data.vectary_link,
  slug: data.slug,
  in_stock: data.in_stock,
  status: data.status,
  created: data.createdAt,
  modified: data.updatedAt,
});

export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res
      .status(AppConst.STATUS_CREATED)
      .json(responseFormat({ data: responseData(newProduct) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const editProduct = async (req, res) => {
  try {
    // Update product data
    await Product.update(req.body, {
      where: {
        id: req.params.product_id,
      },
    });

    const getProduct = await Product.findOne({
      where: {
        id: req.params.product_id,
      },
    });

    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: responseData(getProduct) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id:req.params.product_id
    },
  });
    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: formatPostData(product) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const dataPage = convertPaging(req);
    const pagination =
      dataPage.paging === 0
        ? {}
        : {
            limit: dataPage.size,
            offset: (dataPage.page - 1) * dataPage.size,
          };

    const queryData = {
      status: AppConst.STATUS.publish,
    };

    if (dataPage.product_id) {
      queryData.id = {
        [Op.ne]: dataPage.product_id,
      };
    }

    if (dataPage.search) {
      queryData[Op.or] = {
        title: {
          [Op.like]: `%${dataPage.search}%`,
        },
      };
    }

    if (Object.values(AppConst.STATUS).includes(parseInt(dataPage.status))) {
      queryData.status = parseInt(dataPage.status);
    }

    const { count, rows: data } = await Product.findAndCountAll({
      ...pagination,
      where: {
        ...queryData,
      },
    });

    const formatData = data.map((dataMap) =>
      responseData(dataMap, dataPage.paging ? "" : AppConst.DEFAULT_LANG)
    );

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
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.update(
      {
        status: AppConst.STATUS.delete,
      },
      {
        where: {
          id: req.params.product_id,
        },
      }
    );
    res.status(AppConst.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

