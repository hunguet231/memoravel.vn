import express from "express";
import { ApiConst } from "../const";
import { UserController } from "../controllers";
import { CommonMiddleware, UserMiddleware } from "../middleware";

const userRoute = express.Router();

export default userRoute;
