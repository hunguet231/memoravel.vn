import { database } from "../configs";
import { AppConst } from "../const";
import {
  responseFormat,
  convertPaging,
  responseObjectMultiLang,
} from "../utils";

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

    const getPost = await findPostById(createPost.id);

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
    const formatData = { ...req.body };
    delete formatData["topic_ids"];
    delete formatData["topics"];

    const dataTopics = req.body.topics.filter((topic) =>
      req.body.topic_ids.includes(topic.id)
    );

    // Update post data and rejoin with topics
    await Post.update(req.body, {
      where: {
        id: req.params.post_id,
      },
    });

    const postData = await findPostById(req.params.post_id);

    const oldTopicIds = postData.topics?.map((item) => item.id);

    await postData.removeTopics(oldTopicIds);
    await postData.setTopics(dataTopics);

    const getPost = await findPostById(req.params.post_id);

    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: formatPostData(getPost) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const mnGetListPost = async (req, res) => {
  try {
    const dataPage = convertPaging(req);
    const pagination =
      dataPage.paging === 0
        ? {}
        : {
            limit: dataPage.size,
            offset: (dataPage.page - 1) * dataPage.size,
          };

    const queryDataPost = {};
    if (dataPage.search) {
      queryDataPost.title = {
        [Op.like]: `%${dataPage.search}%`,
      };
    }

    const queryDataTopic = {};
    if (dataPage.topic_id) {
      queryDataTopic.id = dataPage.topic_id;
    }

    const { count, rows: data } = await Post.findAndCountAll({
      ...pagination,
      where: {
        ...queryDataPost,
      },
      include: [
        {
          model: Topic,
          where: {
            ...queryDataTopic,
          },
          attributes: ["id", "title"],
        },
      ],
      distinct: true,
    });

    const formatData = data.map((dataMap) => formatPostData(dataMap));

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

export const mnGetPostById = async (req, res) => {
  try {
    const getPost = await findPostById(req.params.post_id);

    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: formatPostData(getPost) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const mnDeletePost = async (req, res) => {
  try {
    const postData = await findPostById(req.params.post_id);

    const oldTopicIds = postData.topics?.map((item) => item.id);

    await postData.removeTopics(oldTopicIds);
    await postData.destroy({
      where: {
        id: req.params.post_id,
      },
    });

    res.status(AppConst.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

const findPostById = async (id) =>
  await Post.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Topic,
        attributes: ["id", "title"],
      },
    ],
  });
