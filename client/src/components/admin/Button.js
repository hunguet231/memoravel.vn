import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Button } from "@material-ui/core";

const ButtonAdmin = ({ children, ...otherProps }) => {
  const defaultClasses = useStyles();

  return (
    <Button
      size="medium"
      variant="contained"
      className={defaultClasses.root}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

ButtonAdmin.propTypes = {
  children: PropTypes.any,
};
ButtonAdmin.defaultProps = {};

export default ButtonAdmin;

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#5f1e03",
    color: theme.palette.common.white,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#913006",
    },
  },
}));
