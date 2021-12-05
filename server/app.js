import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AppConst, ApiConst } from './const';
import { database } from './configs';
import { CommonRoute, UserRoute, TopicRoute, PostRoute } from './routes';

dotenv.config({ path: path.resolve('./.env') });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(ApiConst.ROOT, CommonRoute);
app.use(ApiConst.ROOT, UserRoute);
app.use(ApiConst.ROOT, TopicRoute);
app.use(ApiConst.ROOT, PostRoute);

const runSequelize = async () => {
  try {
    let run = await database.sequelize.sync();
    if (run) {
      const userModel = database.Model.userModel;
      let user = await userModel.findOne({
        where: {
          username: process.env.ADMIN_ACCOUNT,
        },
      });
      if (!user) {
        await userModel.create({
          username: process.env.ADMIN_ACCOUNT,
          password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
          full_name: process.env.ADMIN_ACCOUNT,
          role: AppConst.ROLE.admin,
          status: AppConst.STATUS.publish,
        });
      }
      console.log('Sequelize is Running');
    }
  } catch (err) {
    console.log(err.message);
  }
};

runSequelize();

export default app;
