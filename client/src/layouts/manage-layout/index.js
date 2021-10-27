import React, { useState, useEffect } from "react";
import {
  NoSsr,
  CssBaseline,
  Box,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { AppHead } from "components";
import { AppConstant } from "const";
import { Header, Sidebar } from "./components";
import { useStyles } from "./styles";

const MainLayout = ({ children }) => {
  const defaultClasses = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(900));

  const [isCloseWithMobile, setIsCloseWithMobile] = useState(isMobile);
  const [isOpenSidebar, setIsOpenSidebar] = useState(!isMobile);

  useEffect(() => {
    setIsCloseWithMobile(isMobile);
    setIsOpenSidebar(!isMobile);
  }, [isMobile]);

  return (
    <NoSsr>
      <CssBaseline />
      <AppHead {...DEFAULT_APP_HEADER} />
      <Header
        isCloseWithMobile={isCloseWithMobile}
        onOpenSidebar={() => setIsOpenSidebar((currentData) => !currentData)}
      />
      <Box className={defaultClasses.root}>
        {isOpenSidebar && <Sidebar />}
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
