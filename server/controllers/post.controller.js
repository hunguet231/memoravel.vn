import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat, convertPaging } from "../utils";

const User = database.Model.userModel;
const Topic = database.Model.topicModel;
const Post = database.Model.postModel;
const Op = database.Sequelize.Op;

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
