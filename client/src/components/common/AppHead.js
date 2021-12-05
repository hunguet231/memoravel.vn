import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";
import { getAbsolutePath } from "utils";

const AppHead = (props) => {
  const { title, description, url, ogImage } = props;
  let primaryUrl = getAbsolutePath(url);

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" sizes="192x192" href={ICON_PATH} />
      <link rel="apple-touch-icon" href={ICON_PATH} />
      <link rel="icon" href={ICON_PATH} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />

      <meta property="og:url" content={primaryUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:site" content={primaryUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
    </NextHead>
  );
};

const ICON_PATH = "/images/favicon.ico";

export default AppHead;

AppHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  ogImage: PropTypes.string,
};
