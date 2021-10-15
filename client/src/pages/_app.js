import React, { useEffect } from "react";
import PropTypes from "prop-types";
import App from "next/app";
import "antd/dist/antd.css";
import "../../public/styles/index.scss";

import "language";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { AppConstant, LangConstant } from "const";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  useEffect(() => {
    let selectedLang =
      router.query.lang ||
      Cookies.get(AppConstant.KEY_LANG) ||
      LangConstant.DEFAULT_LANG;
    i18n.changeLanguage(selectedLang);
    Cookies.set(AppConstant.KEY_LANG, selectedLang);
  }, []);

  return <Component {...pageProps} />;
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
