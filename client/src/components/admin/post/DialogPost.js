/* eslint-disable react/prop-types */
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Close, CloudUpload as CloudUploadIcon } from "@material-ui/icons";
import { CKEditorComponent } from "components";
import Button from "components/common/Button";
import { AppConstant } from "const";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const overrideStrings = {
  allItemsAreSelected: "Tất cả chủ đề được chọn.",
  clearSearch: "Xoá tìm kiếm",
  clearSelected: "Xoá đã chọn",
  search: "Tìm kiếm",
  selectAll: "Chọn tất cả",
  selectAllFiltered: "Chọn tất cả (Đã lọc)",
  selectSomeItems: "Chọn chủ đề...",
};

const DialogPost = ({ isShow, onClose, onSubmit, data, topics, loading }) => {
  const classes = useStyles();
  const [dataInput, setDataInput] = useState({
    title: "",
    description: "",
    content: "",
    status: AppConstant.STATUS.draft,
    background: "",
    topic_ids: [],
  });
  const [selected, setSelected] = useState([]);
  const [img, setImg] = useState("");

  useEffect(() => {
    if (data) {
      setImg(data.background);
      setSelected(
        data.topics.map(({ id, title }) => ({
          id,
          label: title.vi,
          value: title.vi,
        }))
      );
    }
  }, []);

  useEffect(() => {
    const ids = selected.map(({ id }) => ({ id }));
    setDataInput({ ...dataInput, topic_ids: ids });
  }, [selected]);

  const onTypingData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  const onCKChange = (data) => {
    setDataInput({
      ...dataInput,
      content: data,
    });
  };

  const onDescChange = (data) => {
    setDataInput({
      ...dataInput,
      description: data,
    });
  };

  useEffect(() => {
    if (!!data) {
      setDataInput(data);
    }
  }, [!!data]);

  const handleImgChange = (e) => {
    if (e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setImg(reader.result);
        setDataInput({
          ...dataInput,
          background: reader.result,
        });
      };
    }
  };

  return (
    <Dialog
      disableEnforceFocus
      open={isShow}
      onClose={onClose}
      classes={{ paperScrollPaper: classes.dialogContainer }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography classes={{ body1: classes.textDialogTitle }}>
          {data?.id ? "Cập nhật bài viết" : "Tạo mới bài viết"}
        </Typography>
        <IconButton
          className={classes.closeButton}
          onClick={() => onClose(dataInput)}
        >
          <Close className={classes.closeIcon} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography className={classes.typographyContent}>
          Tiêu đề (*)
        </Typography>
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
        <CKEditorComponent
          name="content"
          onChange={onDescChange}
          data={dataInput?.description || ""}
        />
        {/* <OutlinedInput
          placeholder="Nhập mô tả"
          multiline
          classes={{
            root: classes.textAreaInput,
            disabled: classes.disabled,
          }}
          required
          inputProps={{
            name: "description",
          }}
          value={dataInput?.description || ""}
          onChange={onTypingData}
        /> */}
        <Typography className={classes.typographyContent}>Ảnh cover</Typography>

        <Button
          startIcon={<CloudUploadIcon />}
          type="outline"
          component="label"
        >
          Chọn ảnh{" "}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImgChange}
          />
        </Button>

        {img && (
          <img className={classes.previewImg} src={img} alt="background" />
        )}

        <Typography className={classes.typographyContent}>Nội dung</Typography>
        <Alert severity="warning">
          <AlertTitle>Chú ý</AlertTitle>
          Chèn link ảnh từ <mark>Google Drive:</mark>
          <br /> Với link ảnh &quot;https://drive.google.com/file/d/
          <mark>1DYHYl8mPcA_C_EONLG3sAXBOUJhM-xyg</mark>/...&quot; thì FILE_ID
          sẽ là <mark>1DYHYl8mPcA_C_EONLG3sAXBOUJhM-xyg</mark>
          <br /> Thay FILE_ID trên vào
          &quot;https://drive.google.com/uc?id=FILE_ID&quot; sẽ được link ảnh
          đúng
          <br /> &quot;https://drive.google.com/uc?id=
          <mark>1DYHYl8mPcA_C_EONLG3sAXBOUJhM-xyg</mark>&quot;
        </Alert>
        <CKEditorComponent
          name="content"
          onChange={onCKChange}
          data={dataInput?.content || ""}
        />
        <br />
        <Typography className={classes.typographyContent}>
          Chủ đề (*)
        </Typography>
        <MultiSelect
          options={topics}
          value={selected}
          onChange={setSelected}
          labelledBy="Chọn chủ đề"
          overrideStrings={overrideStrings}
        />
        <br />
        <Typography className={classes.typographyContent}>
          Trạng thái
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="status"
            name="status1"
            value={`${dataInput?.status}` || AppConstant.ARRAY_STATUS.draft}
            onChange={(e) =>
              setDataInput({ ...dataInput, status: e.target.value })
            }
          >
            {AppConstant.ARRAY_STATUS.map((status) => (
              <FormControlLabel
                key={status.value}
                value={`${status.value}`}
                control={<Radio />}
                label={status.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button type="outline" onClick={() => onClose(dataInput)}>
          Hủy
        </Button>
        <Button type="primary" onClick={() => onSubmit(dataInput)}>
          {loading && (
            <CircularProgress size={20} className={classes.circular} />
          )}
          {dataInput?.id ? "Cập nhật" : "Tạo mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogPost.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    desciption: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.number,
  }),
  topics: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    desciption: PropTypes.string,
    status: PropTypes.number,
  }),
};
DialogPost.defaultProps = {};

export default DialogPost;

const useStyles = makeStyles((theme) => ({
  circular: {
    color: "#fff",
    marginRight: 5,
  },
  previewImg: {
    height: "auto",
    objectFit: "contain",
  },
  dialogContainer: {
    width: "auto",
    maxWidth: 1200,
    height: "auto",
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
    width: "100%",
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
    marginTop: 4,
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
  // textAreaInput: {
  //   fontSize: 14,
  //   padding: "9px 16px",
  //   marginBottom: 16,
  //   "&$disabled": {
  //     backgroundColor: "#d4d5d8",
  //     opacity: 0.3,
  //     color: "#565c6a",
  //     border: "none",
  //     cursor: "no-drop",
  //   },
  // },
}));
