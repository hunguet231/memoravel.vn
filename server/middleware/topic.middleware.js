import { database } from "../configs";
import { AppConst } from "../const";
import {
  responseFormat,
  requestObjectMultiLang,
  handleAliasResult,
} from "../utils";

const Topic = database.Model.topicModel;
const Op = database.Sequelize.Op;

const message = {
  title: "",
  description: "",
  status: "",
};

export const checkCreateTopic = async (req, res, next) => {
  try {
    const messageTopic = { ...message };

    // Check title is empty
    if (!requestObjectMultiLang(req.body.title, true)) {
      messageTopic.title = "Yêu cầu nhập tiêu đề !";
    } else {
      const topic = await Topic.findOne({
        where: {
          title: requestObjectMultiLang(req.body.title),
        },
      });
      if (topic) {
        messageTopic.title = "Tiêu đề đã tồn tại!";
      }
    }
    // Check status is not exist in object
    if (!Object.values(AppConst.STATUS).includes(req.body.status)) {
      messageTopic.status = "Status không tồn tại!";
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

    const checkMessageValidate = Object.values(messageTopic).find(
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

export const checkEditTopic = async (req, res, next) => {
  try {
    const messageTopic = { ...message };

    // Check title is empty
    if (!requestObjectMultiLang(req.body.title, true)) {
      messageTopic.title = "Yêu cầu nhập tiêu đề !";
    } else {
      const topic = await Topic.findOne({
        where: {
          id: {
            [Op.ne]: req.params.post_id,
          },
          title: requestObjectMultiLang(req.body.title),
        },
      });
      if (topic) {
        messageTopic.title = "Tiêu đề đã tồn tại!";
      }
    }
    // Check status is not exist in object
    if (!Object.values(AppConst.STATUS).includes(req.body.status)) {
      messageTopic.status = "Status không tồn tại!";
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

    const checkMessageValidate = Object.values(messageTopic).find(
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

export const checkGetTopicByAlias = async (req, res) => {
  try {
    let topicAlias = await Topic.findOne({
      where: {
        alias: req.params.alias,
      },
    });
    if (!topicAlias) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Topic alias not found" }));
    } else {
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkDeleteTopic = async (req, res, next) => {
  try {
    let topic = await Topic.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!topic) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Topic not found" }));
    } else {
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
