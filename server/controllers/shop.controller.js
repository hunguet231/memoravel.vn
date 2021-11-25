import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat, convertPaging } from "../utils";
const Shop = database.Model.userModel;
const Op = database.Sequelize.Op;

const responseData = (data) => ({
    id: data.id,
    name: data.name,
    avatar: data.avatar,
    description: data.description,
    status: data.status,
    created: data.createdAt,
    modified: data.updatedAt,
});

export const createShop = async (req, res) => {
    try {
      const newShop = await Shop.create(req.body);
  
      res
        .status(AppConst.STATUS_CREATED)
        .json(responseFormat({ data: responseData(newTopic) }));
    } catch (error) {
      res
        .status(AppConst.STATUS_SERVER_ERROR)
        .json(responseFormat({ error: error, message: "error" }));
    }
};

export const editShop = async (req, res) => {
    try {
      await Shop.update(req.body, {
        where: {
          id: req.params.topic_id,
        },
      });
  
      const getShop = await Shop.findOne({
        where: {
          id: req.params.shop_id,
        },
      });
  
      res
        .status(AppConst.STATUS_OK)
        .json(responseFormat({ data: responseData(getShop) }));
    } catch (error) {
      res
        .status(AppConst.STATUS_SERVER_ERROR)
        .json(responseFormat({ error: error, message: "error" }));
    }
};

export const deleteShop = async (req, res) => {
    try {
      await Shop.update(
        {
          status: AppConst.STATUS.delete,
        },
        {
          where: {
            id: req.params.shop_id,
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