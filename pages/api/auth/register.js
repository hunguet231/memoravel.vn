import connectDB from "../../../utils/connectDB";
import Users from "../../../models/User";
import bcrypt from "bcrypt";
import validate from "../../../utils/validate";

connectDB();

const registerAuth = async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

export default registerAuth;

const register = async (req, res) => {
  try {
    const { fullname, address, username, password, cf_password } = req.body;

    const errMsg = validate(fullname, address, username, password, cf_password);

    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ username });

    if (user) return res.status(400).json({ err: "Tài khoản này đã tồn tại!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      fullname,
      address,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      msg: "Đăng ký thành công!",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
