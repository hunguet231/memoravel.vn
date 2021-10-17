import React from "react";
import { AppHead } from "components";
import { AppConstant } from "const";
import Footer from "components/common/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <AppHead {...DEFAULT_APP_HEADER} />
      <main>{children}</main>
      <Footer />
    </>
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
