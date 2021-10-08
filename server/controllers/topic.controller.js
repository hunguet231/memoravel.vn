import { database } from "../configs";
import { AppConst } from "../const";
import {
  responseFormat,
  convertPaging,
  responseObjectMultiLang,
} from "../utils";
const Topic = database.Model.topicModel;
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
    if (req.isDisable) {
      await Topic.update(
        {
          status: req.body.status,
        },
        {
          where: {
            id: req.params.topic_id,
          },
        }
      );
    } else {
      await Topic.update(req.body, {
        where: {
          id: req.params.topic_id,
        },
      });
    }

    const topic = await Topic.findByPk(req.params.topic_id);

    res
      .status(AppConst.STATUS_CREATED)
      .json(responseFormat({ data: responseData(topic) }));
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

// export const getListTopic = async (req, res) => {
//   try {
//     let listTopic = await Topic.findAll({
//       where: {
//         id: req.topic_Id,
//       },
//       include: [
//         {
//           model: ,
//         },
//       ],
//     });
//     res.status(200).send({
//       success: true,
//       data: listTopic,
//     });
//   } catch (error) {
//     res
//       .status(AppConst.STATUS_SERVER_ERROR)
//       .json(responseFormat({ error: error, message: "error" }));
//   }
// };

export const getTopicByAlias = async (req, res) => {
  try {
    let topicAlias = await Topic.findOne({
      where: {
        alias: req.params.alias,
      },
    });
    res.status(AppConst.STATUS_OK).json(responseFormat({ data: topicAlias }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const deleteTopic = async (req, res) => {
  try {
    let topic = await Topic.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!topic) {
      return res
        .status(400)
        .send({ success: false, error: "Topic does not exists!" });
    }
    await Topic.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(AppConst.STATUS_OK).json(responseFormat(response));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
