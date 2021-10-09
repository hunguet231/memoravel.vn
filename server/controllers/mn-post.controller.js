import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat, responseObjectMultiLang } from "../utils";

const Topic = database.Model.topicModel;
const Post = database.Model.postModel;
const Op = database.Sequelize.Op;

const formatPostData = (data) => {
  return {
    id: data.id,
    title: responseObjectMultiLang(data.title),
    description: responseObjectMultiLang(data.description),
    content: responseObjectMultiLang(data.content),
    alias: responseObjectMultiLang(data.alias),
    number_view: data.number_view,
    link_background: data.link_background,
    status: data.status,
    created: data.createdAt,
    modified: data.updatedAt,
    topics: data.topics.map((topic) => ({
      id: topic.id,
      title: responseObjectMultiLang(topic.title),
    })),
  };
};

export const mnCreatePost = async (req, res) => {
  try {
    const formatData = { ...req.body, user_id: req.user_id };
    delete formatData["topic_ids"];
    delete formatData["topics"];

    const dataTopics = req.body.topics.filter((topic) =>
      req.body.topic_ids.includes(topic.id)
    );

    // Create post data and join with topics
    const createPost = await Post.create(req.body);
    await createPost.setTopics(dataTopics);

    const getPost = await Post.findOne({
      where: {
        id: createPost.id,
      },
      include: [
        {
          model: Topic,
          attributes: ["id", "title"],
        },
      ],
    });

    res
      .status(AppConst.STATUS_CREATED)
      .json(responseFormat({ data: formatPostData(getPost) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const mnEditPost = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const mnGetListPost = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const mnGetPostById = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const mnDeletePost = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
