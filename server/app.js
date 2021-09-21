import express from "express";
import cors from "cors";
import database from "./configs/database.config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const runSequelize = async () => {
  try {
    let run = await database.sequelize.sync();
    if (run) {
      console.log("Sequelize is Running");
    }
  } catch (err) {
    console.log(err.message);
  }
};

runSequelize();

export default app;
