import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Button } from "components/admin";
import { useStyles } from "./styles";

const HeaderLayout = ({ title, onCreateNew, hideCreateBtn }) => {
  const defaultClasses = useStyles();

  return (
    <Box className={defaultClasses.root}>
      <Typography className={defaultClasses.title}>{title || ""}</Typography>
      {!hideCreateBtn && (
        <Button startIcon={<PostAddIcon />} onClick={onCreateNew}>
          Tạo mới
        </Button>
      )}
    </Box>
  );
};

HeaderLayout.propTypes = {
  title: PropTypes.string,
  onCreateNew: PropTypes.func,
  hideCreateBtn: PropTypes.bool,
};

HeaderLayout.defaultProps = {
  onCreateNew: () => {},
};

export default HeaderLayout;
