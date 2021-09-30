import jwt from "jsonwebtoken";
import { AppConst } from "../const";
import { responseFormat } from "../utils";

export const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    res
      .status(AppConst.STATUS_UNAUTHORIZED)
      .json(responseFormat({ message: "Unauthorized token invalid!" }));
  }

  await jwt.verify(token, AppConst.SECRET_KEY, (error, decoded) => {
    if (error) {
      res
        .status(AppConst.STATUS_FORBIDDEN)
        .json(responseFormat({ message: "Unauthorized bad token!" }));
    } else {
      req.user_id = decoded.user_id;
      req.role = decoded.role;
      next();
    }
  });
};

export const verifyRoles = (req, res, next) => {};
