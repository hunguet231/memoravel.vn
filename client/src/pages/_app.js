import React, { useEffect } from "react";
import PropTypes from "prop-types";
import App from "next/app";
import NextNprogress from "nextjs-progressbar";
import "../styles/_common.scss";
import "../styles/variables.less";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../../public/material";

import "language";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { AppConstant, LangConstant } from "const";
import { DataProvider } from "../../store/GlobalState";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleRouteChange = (url) => {
    window.gtag("config", "G-62EGTF7EBX", {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    let selectedLang =
      router.query.lang ||
      Cookies.get(AppConstant.KEY_LANG) ||
      LangConstant.DEFAULT_LANG;
    i18n.changeLanguage(selectedLang);
    Cookies.set(AppConstant.KEY_LANG, selectedLang);
  }, []);

  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NextNprogress
          color="#d35400"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </DataProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
