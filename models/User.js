import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    address: String,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: "normal",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);

export default Dataset;
