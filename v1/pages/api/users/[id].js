import auth from "../../../middlewares/auth";
import Users from "../../../models/User";
import connectDB from "../../../utils/connectDB";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUser(req, res);
      break;
    case "PUT":
      await updateUser(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.query;

    const user = await Users.findById(id).select("-password");
    if (!user)
      return res.status(400).json({ err: "This user does not exist." });

    res.json({
      user,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // const { id } = req.query;

    // const post = await Posts.findOne({ _id: id });

    // post.picture = req.body.picture || post.picture;
    // post.title = req.body.title || post.title;
    // post.content = req.body.content || post.content;

    // if (req.body.title) {
    //   const slug =
    //     slugify(req.body.title, {
    //       lower: true,
    //       locale: "vi",
    //     }) +
    //     "-" +
    //     short.generate();
    //   post.slug = slug;
    // }

    // await post.save();

    res.json({ msg: "Cập nhật thành công" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const { id } = req.query;

    await Users.findByIdAndDelete(id);
    res.json({ msg: "Xoá thành công" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
