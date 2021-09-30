import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { database } from "../configs";
import { AppConst } from "../const";
import { responseFormat } from "../utils";
const User = database.Model.userModel;

export const login = async (req, res) => {
  try {
    let token = jwt.sign(
      {
        user_id: req.body.user_id,
        role: req.body.role,
      },
      AppConst.SECRET_KEY,
      {
        expiresIn: 86400, // Expires in 24 hours
      }
    );

    res.status(AppConst.STATUS_OK).json(
      responseFormat({
        data: {
          ...req.body,
          token: token,
        },
      })
    );
  } catch (error) {
    res
      .status(AppConst.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const changePassword = async (req, res) => {
  try {
    await User.update(
      {
        password: bcrypt.hashSync(req.body.new_password, 10),
      },
      {
        where: {
          id: req.user_id,
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
