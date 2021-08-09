import auth from "../../../middlewares/auth";
import Users from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import bcrypt from "bcrypt";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUsers(req, res);
      break;
    case "PATCH":
      await updateProfile(req, res);
      break;
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const users = await Users.find().select("-password");
    res.json({ users });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const result = await auth(req, res);
    const user = await Users.findOne({ _id: result.id });

    user.fullname = req.body.fullname || user.fullname;
    user.avatar = req.body.avatar || user.avatar;
    user.address = req.body.address || user.address;
    user.username = req.body.username || user.username;
    user.badge = req.body.badge || user.badge;
    user.shop_name = req.body.shop_name || user.shop_name;
    user.shop_description = req.body.shop_description || user.shop_description;
    user.shop_avatar = req.body.shop_avatar || user.shop_avatar;
    user.is_first_create_shop = false;

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({
      msg: "Update Success!",
      user: {
        fullname: user.fullname,
        avatar: user.avatar,
        address: user.address,
        username: user.username,
        badge: user.badge,
        shop_name: user.shop_name,
        shop_description: user.shop_description,
        shop_avatar: user.shop_avatar,
        is_first_create_shop: user.is_first_create_shop,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
