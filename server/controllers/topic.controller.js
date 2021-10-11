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

const responseData = (data) => ({
  id: data.id,
  title: data.title,
  description: data.description,
  alias: data.alias,
  status: data.status,
  created: data.createdAt,
  modified: data.updatedAt,
});

export const createTopic = async (req, res) => {
  try {
    const newTopic = await Topic.create(req.body);

    // Convert string to object
    newTopic.title = responseObjectMultiLang(newTopic.title);
    newTopic.description = responseObjectMultiLang(newTopic.description);
    newTopic.alias = responseObjectMultiLang(newTopic.alias);

    res
      .status(AppConst.STATUS_CREATED)
      .json(responseFormat({ data: responseData(newTopic) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const editTopic = async (req, res) => {
  try {
    // Update topic data
    await Topic.update(req.body, {
      where: {
        id: req.params.topic_id,
      },
    });

    const getTopic = await Topic.findOne({
      where: {
        id: req.params.topic_id,
      },
    });

    // Convert string to object
    getTopic.title = responseObjectMultiLang(getTopic.title);
    getTopic.description = responseObjectMultiLang(getTopic.description);
    getTopic.alias = responseObjectMultiLang(getTopic.alias);

    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: responseData(getTopic) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const getAllTopic = async (req, res) => {
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
      id: {
        [Op.ne]: req.topic_id,
      },
    };

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

    const { count, rows: data } = await Topic.findAndCountAll({
      ...pagination,
      where: {
        ...queryData,
      },
    });

    const formatData = data.map((dataMap) => responseData(dataMap));

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

export const getTopicByAlias = async (req, res) => {
  try {
    if (!req.params.alias) {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Yêu cầu alias!" }));
    }

    const topicData = await Topic.findOne({
      where: {
        alias: {
          [Op.like]: `%${req.params.alias}%`,
        },
      },
      attributes: ["id", "title", "description", "alias", "createdAt"],
    });

    if (!topicData) {
      res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Alias không tồn tại!" }));
    } else {
      res.status(AppConst.STATUS_OK).json(
        responseFormat({
          data: {
            id: topicData.id,
            title: responseObjectMultiLang(
              topicData.title,
              AppConst.DEFAULT_LANG
            ),
            description: responseObjectMultiLang(
              topicData.description,
              AppConst.DEFAULT_LANG
            ),
            alias: responseObjectMultiLang(
              topicData.alias,
              AppConst.DEFAULT_LANG
            ),
            created: topicData.createdAt,
          },
        })
      );
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topicData = await findTopicById(req.params.topic_id);

    const oldPostIds = topicData.posts?.map((item) => item.id);

    await topicData.removePosts(oldPostIds);
    await topicData.destroy({
      where: {
        id: req.params.topic_id,
      },
    });

    res.status(AppConst.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

const findTopicById = async (id) =>
  await Topic.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Post,
        attributes: ["id"],
      },
    ],
  });
