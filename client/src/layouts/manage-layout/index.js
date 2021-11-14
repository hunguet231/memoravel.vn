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
import { ApiConstant, PathConstant } from "const";
import { fetchData } from "api";
import { useRouter } from "next/router";

const MainLayout = ({ children }) => {
  const defaultClasses = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(900));
  const router = useRouter();

  const [isCloseWithMobile, setIsCloseWithMobile] = useState(isMobile);
  const [isOpenSidebar, setIsOpenSidebar] = useState(!isMobile);
  const [profile, setProfile] = useState();

  const fetchProfile = async () => {
    const response = await fetchData(ApiConstant.PROFILE);
    if (response?.status === AppConstant.STATUS_OK) {
      setProfile(response.data);
    } else {
      router.push(PathConstant.MANAGE_LOGIN);
    }
  };

  useEffect(() => {
    setIsCloseWithMobile(isMobile);
    setIsOpenSidebar(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <NoSsr>
      <CssBaseline />
      <AppHead {...DEFAULT_APP_HEADER} />
      <Header
        profile={profile}
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
