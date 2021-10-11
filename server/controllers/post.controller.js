import { database } from "../configs";
import { AppConst } from "../const";
import {
  responseFormat,
  responseObjectMultiLang,
  convertPaging,
} from "../utils";

const User = database.Model.userModel;
const Topic = database.Model.topicModel;
const Post = database.Model.postModel;
const Op = database.Sequelize.Op;

const formatResponseData = (data) => ({
  id: data.id,
  title: responseObjectMultiLang(data.title, AppConst.DEFAULT_LANG),
  description: responseObjectMultiLang(data.description, AppConst.DEFAULT_LANG),
  content: responseObjectMultiLang(data.content, AppConst.DEFAULT_LANG),
  alias: responseObjectMultiLang(data.alias, AppConst.DEFAULT_LANG),
  number_view: data.number_view,
  link_background: data.link_background,
  created: data.createdAt,
  topics: data.topics.map((topic) => ({
    id: topic.id,
    title: responseObjectMultiLang(topic.title, AppConst.DEFAULT_LANG),
    description: responseObjectMultiLang(
      topic.description,
      AppConst.DEFAULT_LANG
    ),
    alias: responseObjectMultiLang(topic.alias, AppConst.DEFAULT_LANG),
  })),
});

export const getPost = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const getPostByAlias = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const getPostHot = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
