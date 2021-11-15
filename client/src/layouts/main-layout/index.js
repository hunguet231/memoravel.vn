import { NoSsr } from "@material-ui/core";
import { BackTop } from "antd";
import { AppHead } from "components";
import { AppConstant } from "const";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <NoSsr>
      <AppHead {...DEFAULT_APP_HEADER} />
      <main>{children}</main>
      <BackTop />
    </NoSsr>
  );
};

export default MainLayout;

const DEFAULT_APP_HEADER = {
  title:
    "Memoravel.vn | Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển Làng nghề truyền thống.",
  description:
    "Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển Làng nghề truyền thống.",
  url: AppConstant.LANDING_URL,
  ogImage: "/images/favicon.ico",
};
