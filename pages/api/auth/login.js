import connectDB from "../../../utils/connectDB";
import Users from "../../../models/User";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/genarateToken";

connectDB();

const loginAuth = async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

export default loginAuth;

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user) return res.status(400).json({ err: "Tài khoản không tồn tại!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ err: "Mật khẩu không đúng!" });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.json({
      msg: "Đăng nhập thành công!",
      access_token,
      refresh_token,
      user: {
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
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
