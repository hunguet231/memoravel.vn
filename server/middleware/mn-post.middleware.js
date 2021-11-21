import { database } from '../configs';
import { AppConst } from '../const';
import {
  responseFormat,
  requestObjectMultiLang,
  handleAliasResult,
} from '../utils';

const Topic = database.Model.topicModel;
const Post = database.Model.postModel;
const Op = database.Sequelize.Op;

const formatPostData = {
  title: '',
  description: '',
  content: '',
  status: '',
  topic_ids: '',
};

export const checkMnCreatePost = async (req, res, next) => {
  try {
    const messagePost = { ...formatPostData };

    // Check title is empty
    if (!requestObjectMultiLang(req.body.title, true)) {
      messagePost.title = 'Yêu cầu nhập tiêu đề !';
    } else {
      const post = await Post.findOne({
        where: {
          title: requestObjectMultiLang(req.body.title),
        },
      });
      if (post) {
        messagePost.title = 'Tiêu đề đã tồn tại!';
      }
    }
    // Check description is empty
    if (!requestObjectMultiLang(req.body.description, true)) {
      messagePost.description = 'Yêu cầu nhập mô tả!';
    }
    // Check content isEmpty
    if (!requestObjectMultiLang(req.body.content, true)) {
      messagePost.content = 'Yêu cầu nhập nội dung!';
    }
    // Check status is not exist in object
    if (!Object.values(AppConst.STATUS).includes(req.body.status)) {
      messagePost.status = 'Status không tồn tại!';
    }

    // Check topic ids
    const topicIds = req.body.topic_ids?.map(({ id }) => id) || [];
    const topics = await Topic.findAll();
    const topicIdsFromDatabase = topics?.map(({ id }) => id) || [];

    const isNotExistTopicId = topicIds.find(
      (topicId) => !topicIdsFromDatabase.includes(topicId)
    );

    if (isNotExistTopicId) {
      messagePost.topic_ids = 'Danh mục không tồn tại!';
    }

    const title = requestObjectMultiLang(req.body.title);
    const refactorPostData = {
      title: title,
      description: requestObjectMultiLang(req.body.description),
      content: requestObjectMultiLang(req.body.content),
      alias: handleAliasResult(JSON.parse(title)),
      background: req.body.background,
      number_view: 0,
      status: req.body.status
        ? parseInt(req.body.status)
        : AppConst.STATUS.draft,
      topic_ids: topicIds,
      topics: topics,
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
      .json(responseFormat({ error: error, message: 'error' }));
  }
};

export const checkMnEditPost = async (req, res, next) => {
  try {
    const messagePost = { ...formatPostData };

    if (!req.params.post_id) {
      messagePost.id = 'Yêu cầu post_id!';
    }

    // Check title is empty
    if (!requestObjectMultiLang(req.body.title, true)) {
      messagePost.title = 'Yêu cầu nhập tiêu đề !';
    } else {
      const post = await Post.findOne({
        where: {
          id: {
            [Op.ne]: req.params.post_id,
          },
          title: requestObjectMultiLang(req.body.title),
        },
      });
      if (post) {
        messagePost.title = 'Tiêu đề đã tồn tại!';
      }
    }
    // Check description is empty
    if (!requestObjectMultiLang(req.body.description, true)) {
      messagePost.description = 'Yêu cầu nhập mô tả!';
    }
    // Check content isEmpty
    if (!requestObjectMultiLang(req.body.content, true)) {
      messagePost.content = 'Yêu cầu nhập nội dung!';
    }
    // Check status is not exist in object
    if (!Object.values(AppConst.STATUS).includes(req.body.status)) {
      messagePost.status = 'Status không tồn tại!';
    }

    // Check topic ids
    const topicIds = req.body.topic_ids?.map(({ id }) => id) || [];
    const topics = await Topic.findAll();
    const topicIdsFromDatabase = topics?.map(({ id }) => id) || [];

    const isNotExistTopicId = topicIds.find(
      (topicId) => !topicIdsFromDatabase.includes(topicId)
    );

    if (isNotExistTopicId) {
      messagePost.topic_ids = 'Danh mục không tồn tại!';
    }

    const title = requestObjectMultiLang(req.body.title);
    const refactorPostData = {
      title: title,
      description: requestObjectMultiLang(req.body.description),
      content: requestObjectMultiLang(req.body.content),
      alias: handleAliasResult(JSON.parse(title)),
      background: req.body.background,
      number_view: 0,
      status: req.body.status
        ? parseInt(req.body.status)
        : AppConst.STATUS.draft,
      topic_ids: topicIds,
      topics: topics,
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
      .json(responseFormat({ error: error, message: 'error' }));
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
        .json(responseFormat({ message: 'post_id không tồn tại' }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
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
        .json(responseFormat({ message: 'post_id không tồn tại' }));
    }
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: 'error' }));
  }
};
