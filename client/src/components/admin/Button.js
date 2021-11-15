import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Button } from "@material-ui/core";

const ButtonAdmin = ({ children, ...otherProps }) => {
  const defaultClasses = useStyles();

  return (
    <Button
      size="medium"
      variant="contained"
      color="primary"
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

export const useStyles = makeStyles({
  root: {
    textTransform: "initial",
  },
});
