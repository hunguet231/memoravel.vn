import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat } from "../utils";
const User = database.Model.userModel;

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
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const adminDeleteUser = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
