import { database } from '../configs';
import { AppConst } from '../const';
import {
  responseFormat,
  convertPaging,
  responseObjectMultiLang,
} from '../utils';
const Topic = database.Model.topicModel;
const Post = database.Model.postModel;
const Op = database.Sequelize.Op;

const responseData = (data, key) => ({
  id: data.id,
  title: responseObjectMultiLang(data.title, key),
  description: responseObjectMultiLang(data.description, key),
  alias: responseObjectMultiLang(data.alias, key),
  status: data.status,
  created: data.createdAt,
  modified: data.updatedAt,
});

export const createTopic = async (req, res) => {
  try {
    const newTopic = await Topic.create(req.body);

    res
      .status(AppConst.STATUS_CREATED)
      .json(responseFormat({ data: responseData(newTopic) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
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

    res
      .status(AppConst.STATUS_OK)
      .json(responseFormat({ data: responseData(getTopic) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
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

    const queryData = {};

    if (!req.user_id) {
      queryData.status = AppConst.STATUS.publish;
    }

    if (dataPage.topic_id) {
      queryData.id = {
        [Op.ne]: dataPage.topic_id,
      };
    }

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

    const formatData = data.map((dataMap) =>
      responseData(dataMap, dataPage.paging ? '' : AppConst.DEFAULT_LANG)
    );

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
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getTopicByAlias = async (req, res) => {
  try {
    if (!req.params.alias) {
      return res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Yêu cầu alias!' }));
    }

    const topicData = await Topic.findOne({
      where: {
        alias: {
          [Op.like]: `%${req.params.alias}%`,
        },
        status: AppConst.STATUS.publish,
      },
    });

    if (!topicData) {
      res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'Alias không tồn tại!' }));
    } else {
      res.status(AppConst.STATUS_OK).json(
        responseFormat({
          data: responseData(topicData, AppConst.DEFAULT_LANG),
        })
      );
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
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
      .json(responseFormat({ error: error, message: 'error' }));
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
        attributes: ['id'],
      },
    ],
  });
