import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat } from "../utils";

const Topic = database.Model.topicModel;

const message = {
  title: "",
  description: "",
  alias: "",
  status: "",
  details: "",
};

export const checkCreateTopic = async (req, res, next) => {
  try {
    const dataCreateTopic = {
      title: req.body.title || "",
      description: req.body.description || "",
      alias: req.body.alias || "",
      status: parseInt(req.body.status),
      details: req.body.details || "",
    };

    const messageCreate = { ...message };

    // Check status
    if (!Object.values(AppConst.STATUS).includes(dataCreateTopic.status)) {
      messageCreate.status = "Sai định dạng trạng thái";
    }

    const checkMessageValidate = Object.values(messageCreate).find(
      (messageItem) => messageItem.length > 0
    );

    if (!checkMessageValidate) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: JSON.stringify(messageCreate) }));
    } else {
      req.body = dataCreateTopic;
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
    if (
      !(
        req.body.title &&
        req.body.description &&
        req.body.alias &&
        req.body.details
      )
    ) {
      let message = "";
      // Check status
      if (AppConst.STATUS.draft != req.body.status) {
        message = "Sai định dạng trạng thái";
      }
      if (message) {
        return res
          .status(AppConst.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: message }));
      } else {
        req.isDisable = true;
        next();
      }
    } else {
      const dataCreateTopic = {
        title: req.body.title || "",
        description: req.body.description || "",
        alias: req.body.alias || "",
        details: req.body.details || "",
        status: parseInt(req.body.status) || AppConst.STATUS.draft,
      };

      const messageCreate = { ...message };

      // Check status
      if (!Object.values(AppConst.STATUS).includes(dataCreateTopic.status)) {
        messageCreate.status = "Sai định dạng trạng thái";
      }

      const checkMessageValidate = Object.values(messageCreate).find(
        (messageItem) => messageItem.length > 0
      );

      if (!checkMessageValidate) {
        return res
          .status(AppConst.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: JSON.stringify(messageCreate) }));
      } else {
        req.body = dataCreateTopic;
        next();
      }
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
