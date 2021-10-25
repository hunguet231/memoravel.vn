import React from "react";
import { NoSsr, CssBaseline, Box } from "@material-ui/core";
import { AppHead } from "components";
import { AppConstant } from "const";
import { Header } from "./components";
import { useStyles } from "./style";

const MainLayout = ({ children }) => {
  const defaultClasses = useStyles();

  return (
    <NoSsr>
      <CssBaseline />
      <AppHead {...DEFAULT_APP_HEADER} />
      <Header />
      <Box className={defaultClasses.root}>
        <main className={defaultClasses.main}>{children}</main>
      </Box>
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
