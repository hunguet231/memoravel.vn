import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { Button } from "components/admin";
import { useStyles } from "./styles";

const AuthLayout = ({ title, onCreateNew }) => {
  const defaultClasses = useStyles();

  return (
    <Box className={defaultClasses.root}>
      <Typography className={defaultClasses.title}>{title || ""}</Typography>
      <Button onClick={onCreateNew}>Tạo mới</Button>
    </Box>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string,
  onCreateNew: PropTypes.func,
};

AuthLayout.defaultProps = {
  onCreateNew: () => {},
};

export default AuthLayout;
