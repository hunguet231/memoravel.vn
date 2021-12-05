import { database } from "../configs";
import { AppConst } from "../const";
import {
  responseFormat,
  requestObjectMultiLang,
  handleAliasResult,
} from "../utils";

const Shop = database.Model.shopModel;
const Op = database.Sequelize.Op;

const message = {
  name: "",
  description: "",
  avatar: "",
  status: "",
};

export const checkCreateShop = async (req, res, next) => {
    try {
      const messageShop = { ...message };
  
      
      if (!requestObjectMultiLang(req.body.name, true)) {
        messageShop.title = "Yêu cầu nhập tiêu đề !";
      } else {
        const shop = await Shop.findOne({
          where: {
            title: requestObjectMultiLang(req.body.name),
          },
        });
      }
      // Check status is not exist in object
      if (!Object.values(AppConst.STATUS).includes(req.body.status)) {
        messageShop.status = "Status không tồn tại!";
      }
  
      const title = requestObjectMultiLang(req.body.title);
      const refactorTopicData = {
        title: title,
        description: requestObjectMultiLang(req.body.description),
        alias: handleAliasResult(JSON.parse(title), false),
        status: req.body.status
          ? parseInt(req.body.status)
          : AppConst.STATUS.draft,
      };
  
      const checkMessageValidate = Object.values(messageShop).find(
        (messageItem) => messageItem.length > 0
      );
  
      if (checkMessageValidate) {
        return res
          .status(AppConst.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: JSON.stringify(messageTopic) }));
      } else {
        req.body = refactorTopicData;
        next();
      }
    } catch (error) {
      res
        .status(AppConst.STATUS_SERVER_ERROR)
        .json(responseFormat({ error: error, message: "error" }));
    }
  };


export const checkDeleteShop = async (req, res, next) => {
    try {
      const shop = await Shop.findOne({
        where: {
          id: req.params.shop_id,
        },
      });
      if (!shop) {
        return res
          .status(AppConst.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: "Shop không tồn tại!" }));
      } else {
        next();
      }
    } catch (error) {
      res
        .status(AppConst.STATUS_SERVER_ERROR)
        .json(responseFormat({ error: error, message: "error" }));
    }
};