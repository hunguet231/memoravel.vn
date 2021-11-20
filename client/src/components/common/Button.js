import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Button as MuiButton } from "@material-ui/core";

const Button = ({ children, type, ...otherProps }) => {
  const classes = useStyles();

  return (
    <MuiButton
      size="medium"
      variant="contained"
      className={`${classes.root} ${classes[type]} `}
      {...otherProps}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
};
Button.defaultProps = {};

export default Button;

export const useStyles = makeStyles({
  root: {
    textTransform: "initial",
    margin: "10px 5px",
    minWidth: "150px",
    borderRadius: "8px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      background: "#913006",
      color: "#fff !important",
      border: "2px solid #913006",
    },
  },
  primary: {
    background: "#5f1e03",
    color: "#fff !important",
    border: "2px solid #5f1e03",
  },
  secondary: {
    color: "#fff",
    background: "#b43a05",
    border: "2px solid #b43a05",
    "&:hover": {
      background: "#da4c10",
      border: "2px solid #da4c10",
    },
  },
  outline: {
    background: "transparent",
    color: "#5f1e03",
    border: "2px solid #5f1e03",
    "&:hover": {
      color: "#fff",
    },
  },
});
