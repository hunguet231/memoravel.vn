import express from "express";
import { ApiConst } from "../const";
import { TopicController } from "../controllers";
import { CommonMiddleware, TopicMiddleware } from "../middleware";

const topicRoute = express.Router();

topicRoute.post(
  ApiConst.MANAGE_TOPIC,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  TopicMiddleware.checkCreateTopic,
  TopicController.createTopic
);

topicRoute.put(
  ApiConst.MANAGE_TOPIC_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  TopicMiddleware.checkEditTopic,
  TopicController.editTopic
);

topicRoute.get(
  ApiConst.MANAGE_TOPIC,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  TopicController.getAllTopic
);

topicRoute.delete(
  ApiConst.MANAGE_TOPIC_ID,
  CommonMiddleware.verifyToken,
  CommonMiddleware.verifyRolesManage,
  TopicMiddleware.checkDeleteTopic,
  TopicController.deleteTopic
);

topicRoute.get(ApiConst.GET_TOPIC, TopicController.getAllTopic);

topicRoute.get(ApiConst.GET_TOPIC_BY_ALIAS, TopicController.getTopicByAlias);

export default topicRoute;
