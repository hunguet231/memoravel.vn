import { database } from '../configs';
import { AppConst } from '../const';
import {
  responseFormat,
  responseObjectMultiLang,
  convertPaging,
} from '../utils';

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
  background: data.background,
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
    const dataPage = convertPaging(req);
    dataPage.size =
      dataPage.size > AppConst.LIMIT_PAGE_SIZE
        ? AppConst.LIMIT_PAGE_SIZE
        : dataPage.size;

    const pagination =
      dataPage.paging === 0
        ? {}
        : {
            limit: dataPage.size,
            offset: (dataPage.page - 1) * dataPage.size,
          };

    const queryDataPost = {
      status: AppConst.STATUS.publish,
    };
    if (dataPage.search) {
      queryDataPost.title = {
        [Op.like]: `%${dataPage.search}%`,
      };
    }

    const queryDataTopic = {
      status: AppConst.STATUS.publish,
    };
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
          attributes: ['id', 'title', 'description', 'alias'],
        },
      ],
      distinct: true,
    });

    const formatData = data.map((dataMap) => formatResponseData(dataMap));

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

export const getPostByAlias = async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        alias: {
          [Op.like]: `%${req.params.alias}%`,
        },
      },
      include: [
        {
          model: Topic,
          attributes: ['id', 'title', 'description', 'alias'],
        },
      ],
    });
    if (!postData) {
      res
        .status(AppConst.STATUS_NOT_FOUND)
        .json(responseFormat({ message: 'alias không tồn tại' }));
    } else {
      let numberView = ++postData.number_view;
      await Post.update(
        {
          number_view: numberView,
        },
        {
          where: {
            id: postData.id,
          },
        }
      );
      postData.number_view = numberView;
      res
        .status(AppConst.STATUS_OK)
        .json(responseFormat({ data: formatResponseData(postData) }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const getPostHot = async (req, res) => {
  try {
    const limitPerPage = req.query?.limit || 5;
    const limit =
      parseInt(limitPerPage) > AppConst.LIMIT_PAGE_SIZE
        ? AppConst.LIMIT_PAGE_SIZE
        : parseInt(limitPerPage);

    const pagination = {
      limit: limit,
      offset: 0,
    };

    const { count, rows: data } = await Post.findAndCountAll({
      ...pagination,
      where: {
        status: AppConst.STATUS.publish,
      },
      include: [
        {
          model: Topic,
          where: {
            status: AppConst.STATUS.publish,
          },
          attributes: ['id', 'title', 'description', 'alias'],
        },
      ],
      order: [['number_view', 'DESC']],
      distinct: true,
    });

    const formatData = data.map((dataMap) => formatResponseData(dataMap));

    const response = {
      data: formatData,
      total: count,
    };
    res.status(AppConst.STATUS_OK).json(responseFormat(response));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
