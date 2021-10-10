import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat, convertPaging } from "../utils";
const User = database.Model.userModel;
const Op = database.Sequelize.Op;

const responseData = (data) => ({
  id: data.id,
  username: data.username,
  full_name: data.full_name,
  gender: data.gender,
  date_of_birth: data.date_of_birth,
  email: data.email,
  phone_number: data.phone_number,
  avatar: data.avatar,
  role: data.role,
  status: data.status,
  created: data.createdAt,
  modified: data.updatedAt,
});

export const adminCreateUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res
      .status(AppConst.STATUS_CREATED)
      .json(responseFormat({ data: responseData(newUser) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const adminEditUser = async (req, res) => {
  try {
    if (req.isDisable) {
      await User.update(
        {
          status: req.body.status,
        },
        {
          where: {
            id: req.params.user_id,
          },
        }
      );
    } else {
      await User.update(req.body, {
        where: {
          id: req.params.user_id,
        },
      });
    }

    const user = await User.findByPk(req.params.user_id);

    res
      .status(AppConst.STATUS_CREATED)
      .json(responseFormat({ data: responseData(user) }));
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const adminGetListUser = async (req, res) => {
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
        [Op.ne]: req.user_id,
      },
    };

    if (dataPage.search) {
      queryData[Op.or] = {
        username: {
          [Op.like]: `%${dataPage.search}%`,
        },
        full_name: {
          [Op.like]: `%${dataPage.search}%`,
        },
      };
    }

    if (Object.values(AppConst.STATUS).includes(parseInt(dataPage.status))) {
      queryData.status = parseInt(dataPage.status);
    }

    const { count, rows: data } = await User.findAndCountAll({
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

export const adminDeleteUser = async (req, res) => {
  try {
    await User.update(
      {
        status: AppConst.STATUS.delete,
      },
      {
        where: {
          id: req.params.user_id,
        },
      }
    );
    res.status(AppConst.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
