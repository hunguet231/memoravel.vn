import connectDB from "../../../utils/connectDB";
import Users from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/genarateToken";

connectDB();

const accessTokenAuth = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token) return res.status(400).json({ err: "Hãy đăng nhập!" });

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      return res.status(400).json({ err: "Token không đúng hoặc đã hết hạn" });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "Người dùng không tồn tại" });

    const access_token = createAccessToken({ id: user._id });
    res.json({
      access_token,
      user: {
        fullname: user.fullname,
        address: user.address,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default accessTokenAuth;
