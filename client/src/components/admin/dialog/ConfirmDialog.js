import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Button } from "components/admin";

const ConfirmDialog = ({ isShow, title, message, onSubmit, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isShow}
      classes={{ root: classes.dialogRoot, paper: classes.dialogPaper }}
    >
      <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography classes={{ body1: classes.textContent }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onSubmit}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  isShow: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ConfirmDialog.defaultProps = {
  title: "",
  message: "",
};

export default ConfirmDialog;

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    "& > div:first-child": { backgroundColor: "rgba(0, 0, 0, 0.25)" },
  },
  dialogPaper: {
    width: 470,
    borderRadius: 0,
    margin: 0,
  },
  dialogTitle: {
    paddingTop: 24,
    alignItems: "flex-start",
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.grey[600],
  },
  dialogContent: {
    padding: "0 24px 24px 24px",

    color: theme.palette.grey[500],
    borderBottom: "1px solid" + theme.palette.grey[200],
  },
  textContent: {
    color: "inherit",
    fontSize: 13,
    fontWeight: 500,
  },
  dialogAction: {
    padding: " 10px 27px 10px 0px",
  },
}));
