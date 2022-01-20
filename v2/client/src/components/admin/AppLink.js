import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Link as MuiLink } from "@material-ui/core";

const AppLink = (props) => {
  const { to, as, children, ...otherProps } = props;
  let nextRouter = to || "/#";
  let urlOnBrowser = as;
  return (
    <Link href={nextRouter} as={urlOnBrowser} passHref={true}>
      <MuiLink color="inherit" underline="none" {...otherProps}>
        {children || ""}
      </MuiLink>
    </Link>
  );
};

AppLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  as: PropTypes.string,
  className: PropTypes.string,
};
AppLink.defaultProps = {};

export default AppLink;
