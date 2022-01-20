import jwt from "jsonwebtoken";
import Users from "../models/User";

const auth = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ err: "Invalid Authentication." });

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) return res.status(400).json({ err: "Invalid Authentication." });

  const user = await Users.findOne({ _id: decoded.id }).select("-password");
  req.user = user;

  return {
    id: user._id,
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
  };
};

export default auth;
