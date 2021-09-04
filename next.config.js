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
    // BASE_URL: "https://memoravel.vn",
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://hunguet231:huet231@cluster0.nmy5u.mongodb.net/memoravel-vn?retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "D(u)>&HDe=sbdrXWCa4y<=",
    REFRESH_TOKEN_SECRET: "^8B5c(%769,E&bBux.&9(m{Pbs4E(",
    FACEBOOK_APP_ID: "544997160144210",
    FACEBOOK_APP_ID_TEST: "261367802469525",
    FACEBOOK_PAGE_ID: "103447301918593",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
});
