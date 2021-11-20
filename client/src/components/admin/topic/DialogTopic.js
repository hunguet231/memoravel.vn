import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  DialogTitle,
  IconButton,
  OutlinedInput,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { AppConstant } from "const";
import { Button, SelectItem } from "components/admin";

const DialogTopic = ({ isShow, onClose, onSubmit, data }) => {
  const classes = useStyles();

  const [dataInput, setDataInput] = useState({
    title: "",
    description: "",
    status: AppConstant.STATUS.draft,
  });

  const onTypingData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!!data) {
      setDataInput(data);
    }
  }, [!!data]);

  return (
    <Dialog
      open={isShow}
      onClose={onClose}
      classes={{ paperScrollPaper: classes.dialogContainer }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography classes={{ body1: classes.textDialogTitle }}>
          {data?.id ? "Cập nhật chủ đề bài viết" : "Tạo mới chủ đề bài viết"}
        </Typography>
        <IconButton
          className={classes.closeButton}
          onClick={() => onClose(dataInput)}
        >
          <Close className={classes.closeIcon} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography className={classes.typographyContent}>Tiêu đề *</Typography>
        <OutlinedInput
          placeholder="Nhập tiêu đề"
          classes={{
            root: classes.contentLineEdit,
            input: classes.inputEdit,
            disabled: classes.disabled,
          }}
          required
          inputProps={{
            name: "title",
          }}
          value={dataInput?.title || ""}
          onChange={onTypingData}
        />
        <Typography className={classes.typographyContent}>Mô tả</Typography>
        <OutlinedInput
          placeholder="Nhập mô tả"
          classes={{
            root: classes.contentLineEdit,
            input: classes.inputEdit,
            disabled: classes.disabled,
          }}
          required
          inputProps={{
            name: "description",
          }}
          value={dataInput?.description || ""}
          onChange={onTypingData}
        />
        <Typography className={classes.typographyContent}>
          Trạng thái
        </Typography>
        <SelectItem
          value={dataInput?.status || AppConstant.STATUS.draft}
          data={AppConstant.ARRAY_STATUS}
          onChangeInput={(e) =>
            setDataInput({ ...dataInput, status: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="outlined" onClick={() => onClose(dataInput)}>
          Hủy
        </Button>
        <Button onClick={() => onSubmit(dataInput)}>
          {dataInput?.id ? "Cập nhật" : "Tạo mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogTopic.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    desciption: PropTypes.string,
    status: PropTypes.number,
  }),
};
DialogTopic.defaultProps = {};

export default DialogTopic;

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    width: 450,
    objectFit: "contain",
    boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: theme.palette.common.white,
    borderRadius: 5,
    "@media only screen and (max-width: 515px)": {
      width: "100%",
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      height: "100%",
      marginBottom: 0,
      maxHeight: "none",
    },
  },
  dialogTitle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    position: "fixed",
    width: 450,
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    height: 40,
    padding: "8px 10px 8px 24px",
    zIndex: 100,
    "@media only screen and (max-width: 515px)": {
      width: "100%",
    },
  },
  textDialogTitle: {
    color: theme.palette.common.white,
    fontSize: 18,
    lineHeight: 1.6,
    fontWeight: 600,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    color: theme.palette.grey[500],
    height: 24,
    width: 24,
    padding: 0,
  },
  closeIcon: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  dialogContent: {
    marginTop: 40,
    padding: "16px 24px",
    display: "flex",
    flexDirection: "column",
    "&:first-child": {
      paddingTop: 26,
      "@media only screen and (max-width: 515px)": {
        padding: "26px 10px 20px",
        borderBottom: "none",
      },
    },
  },
  typographyContent: {
    marginBottom: 4,
    fontSize: 15,
    fontWeight: 600,
    color: "#3e4045",
    lineHeight: "22px",
  },
  contentLineEdit: {
    width: "100%",
    height: 40,
    fontSize: 14,
    padding: "9px 16px",
    marginBottom: 16,
    "&$disabled": {
      backgroundColor: "#d4d5d8",
      opacity: 0.3,
      color: "#565c6a",
      border: "none",
      cursor: "no-drop",
    },
  },
  disabled: {
    backgroundColor: "#d4d5d8",
    opacity: 0.3,
    border: "none",
    cursor: "no-drop",
  },
  inputEdit: {
    padding: 0,
  },
  dialogActions: {
    display: "block",
    textAlign: "right",
    padding: "16px 24px",
  },
}));
