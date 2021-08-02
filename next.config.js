const withLess = require("next-with-less");
const path = require("path");

const pathToLessFileWithVariables = path.resolve("./styles/antd-custom.less");

module.exports = withLess({
  lessLoaderOptions: {
    /* ... */
    additionalData: (content) =>
      `${content}\n\n@import '${pathToLessFileWithVariables}';`,
  },
  env: {
    // BASE_URL: "https://tndgroup.edu.vn",
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://hunguet231:huet231@cluster0.nmy5u.mongodb.net/memoravel-vn?retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "D(u)>&HDe=sbdrXWCa4y<=",
    REFRESH_TOKEN_SECRET: "^8B5c(%769,E&bBux.&9(m{Pbs4E(",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
});
