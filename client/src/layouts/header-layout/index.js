import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { Button } from "components/admin";
import { useStyles } from "./styles";

const HeaderLayout = ({ title, onCreateNew }) => {
  const defaultClasses = useStyles();

  return (
    <Box className={defaultClasses.root}>
      <Typography className={defaultClasses.title}>{title || ""}</Typography>
      <Button onClick={onCreateNew}>Tạo mới</Button>
    </Box>
  );
};

HeaderLayout.propTypes = {
  title: PropTypes.string,
  onCreateNew: PropTypes.func,
};

HeaderLayout.defaultProps = {
  onCreateNew: () => {},
};

export default HeaderLayout;
