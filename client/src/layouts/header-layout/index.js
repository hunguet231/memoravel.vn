import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { Button } from "components/admin";
import { useStyles } from "./styles";

const HeaderLayout = ({ title }) => {
  const defaultClasses = useStyles();

  return (
    <Box className={defaultClasses.root}>
      <Typography className={defaultClasses.title}>{title || ""}</Typography>
      <Button>Tạo mới</Button>
    </Box>
  );
};

HeaderLayout.propTypes = {
  title: PropTypes.string,
};

HeaderLayout.defaultProps = {};

export default HeaderLayout;
