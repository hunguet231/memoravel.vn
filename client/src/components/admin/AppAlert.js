import React, { memo } from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const AppAlert = (props) => {
  const {
    isOpen,
    duration,
    onClose,
    anchorOrigin,
    classesSnackbar,
    severity,
    children,
    ...otherProps
  } = props;
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      classes={classesSnackbar}
    >
      <Alert onClose={onClose} severity={severity} {...otherProps}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export const ALERT_TYPE = {
  info: "info",
  error: "error",
  warning: "warning",
  success: "success",
};

AppAlert.propTypes = {
  isOpen: PropTypes.bool,
  duration: PropTypes.number,
  anchorOrigin: PropTypes.object,
  onClose: PropTypes.func,
  classesSnackbar: PropTypes.object,
  severity: PropTypes.string,
  children: PropTypes.any,
};

AppAlert.defaultProps = {
  severity: ALERT_TYPE.info,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
};

export default memo(AppAlert);
