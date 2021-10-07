import { database } from "../configs";
import { AppConst } from "../const";
import {
  responseFormat,
  requestObjectMultiLang,
  convertTitleToAlias,
} from "../utils";

const Topic = database.Model.topicModel;
const Post = database.Model.postModel;

const formatPostData = {
  title: "",
  description: "",
  content: "",
  alias: "",
  background: "",
  status: "",
  topic_ids: "",
};

export const checkMnCreatePost = async (req, res, next) => {
  try {
    const messagePost = { ...formatPostData };

    // Check title is empty
    if (!requestObjectMultiLang(req.body.title, true)) {
      messagePost.title = "";
    } else {
      const post = await Post.findOne({
        where: {
          username: requestObjectMultiLang(req.body.title),
        },
      });
      if (post) {
        messagePost.title = "đã tồn tại";
      }
    }

    // Check description is empty
    if (!requestObjectMultiLang(req.body.description, true)) {
      messagePost.description = "";
    }

    // Check content isEmpty
    if (!requestObjectMultiLang(req.body.content, true)) {
      messagePost.content = "";
    }

    // Check topic

    const refactorPostData = {
      title: requestObjectMultiLang(req.body.title),
      description: requestObjectMultiLang(req.body.description),
      content: requestObjectMultiLang(req.body.content),
      alias: convertTitleToAlias(req.body.alias),
      background: req.body.background,
      number_view: 0,
      status: req.body.status
        ? parseInt(req.body.status)
        : AppConst.STATUS.draft,
      topic_ids: req.body.topic_ids,
    };

    const checkMessageValidate = Object.values(messagePost).find(
      (messageItem) => messageItem.length > 0
    );

    if (checkMessageValidate) {
      return res
        .status(AppConst.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: JSON.stringify(messagePost) }));
    } else {
      req.body = refactorPostData;
      next();
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkMnEditPost = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkMnGetListPost = async (req, res, next) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkMnGetPostById = async (req, res, next) => {
  try {
    // Check Post Id id exist
    const post = await Post.findByPk(req.params.post_id);
    if (post) {
      next();
    } else {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "post_id is not exist" }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const checkMnDeletePost = async (req, res, next) => {
  try {
    // Check Post Id id exist
    const post = await Post.findByPk(req.params.post_id);
    if (post) {
      next();
    } else {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "post_id is not exist" }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
