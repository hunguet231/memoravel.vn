/* eslint-disable react/prop-types */
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { Button, SelectItem } from "components/admin";
import { AppConstant } from "const";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { productOrigins } from "utils/productOrigins";
import { productTypes } from "utils/productTypes";
import addDotsNumber from "utils/addDotsNumber";
import removeNonNumeric from "utils/removeNonNumeric";

const DialogProduct = ({ isShow, onClose, onSubmit, data, loading, shops }) => {
  const classes = useStyles();

  const [dataInput, setDataInput] = useState({
    name: "",
    summary: "",
    desciption: "",
    story: "",
    images: [],
    price: "",
    type: "Khác",
    made_in: "Khác",
    vectary_link: "",
    sold: 0,
    details: {
      weight: "",
      len: "",
      width: "",
      height: "",
    },
    in_stock: 0,
    shop_id: "",
    status: AppConstant.STATUS.draft,
  });

  const [imgFileList, setImgFileList] = useState([]);

  const onTypingData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "price") {
      setDataInput({
        ...dataInput,
        [name]: addDotsNumber(removeNonNumeric(value)),
      });
    } else {
      setDataInput({
        ...dataInput,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (!!data) {
      setDataInput(data);
    }
  }, [!!data]);

  const handleImgFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const size = file.size;
      const indexImg = e.target.dataset.imgIndex;

      if (size > 1024 * 1024) {
        alert("File vượt quá 2MB");
      } else {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const cloneImgList = imgFileList.map(
            ({ fileName, file, preview }) => ({
              fileName,
              file: new File([file], file.name),
              preview,
            })
          );

          cloneImgList[indexImg] = {
            fileName: file.name,
            file,
            preview: reader.result,
          };

          setImgFileList(cloneImgList);
          setDataInput({
            ...dataInput,
            images: cloneImgList.map(({ preview }) => ({
              image: preview,
            })),
          });
        });
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Dialog
      open={isShow}
      onClose={onClose}
      classes={{ paperScrollPaper: classes.dialogContainer }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography classes={{ body1: classes.textDialogTitle }}>
          {data?.id ? "Cập nhật sản phẩm" : "Tạo sản phẩm mới"}
        </Typography>
        <IconButton
          className={classes.closeButton}
          onClick={() => onClose(dataInput)}
        >
          <Close className={classes.closeIcon} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.typographyContent}>
                Thông tin cơ bản
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <div className={classes.label}>* Hình ảnh sản phẩm </div>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <div className={classes.inputImageContainer}>
                    <div className={classes.inputImageItem}>
                      <div className={classes.img}>
                        <input
                          className={classes.imgFile}
                          type="file"
                          accept="image/*"
                          data-img-index="0"
                          onChange={handleImgFileChange}
                          title=" "
                          name=""
                        />
                        <div className={classes.labelFile}>
                          <AddAPhotoOutlinedIcon />
                        </div>
                        <div className={classes.previewContainer}>
                          <img
                            className={classes.previewImg}
                            src={
                              imgFileList[0]?.preview ||
                              dataInput.images[0]?.image
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      <div className={classes.caption}>* Ảnh bìa</div>
                    </div>
                    {new Array(8).fill(1).map((value, index) => (
                      <div key={index + 1} className={classes.inputImageItem}>
                        <div className={classes.img}>
                          <input
                            className={classes.imgFile}
                            type="file"
                            accept="image/*"
                            data-img-index={index + 1}
                            onChange={handleImgFileChange}
                            title=" "
                            name=""
                          />
                          <div className={classes.labelFile}>
                            <AddAPhotoOutlinedIcon />
                          </div>
                          <div className={classes.previewContainer}>
                            <img
                              className={classes.previewImg}
                              src={
                                imgFileList[index + 1]?.preview ||
                                dataInput.images[index + 1]?.image
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div className={classes.caption}>
                          Hình ảnh {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <div className={classes.label}>* Tên sản phẩm</div>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <OutlinedInput
                    classes={{
                      root: classes.contentLineEdit,
                      input: classes.inputEdit,
                      disabled: classes.disabled,
                    }}
                    required
                    inputProps={{
                      name: "name",
                    }}
                    value={dataInput?.name || ""}
                    onChange={onTypingData}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <div className={classes.label}>Tóm tắt sản phẩm</div>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <OutlinedInput
                    classes={{
                      root: classes.contentLineEdit,
                      input: classes.inputEdit,
                      disabled: classes.disabled,
                    }}
                    required
                    inputProps={{
                      name: "summary",
                    }}
                    value={dataInput?.summary || ""}
                    onChange={onTypingData}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <div className={classes.label}>* Mô tả sản phẩm</div>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <OutlinedInput
                    id="standard-multiline-flexible"
                    multiline
                    rows={10}
                    variant="outlined"
                    className={classes.inputArea}
                    required
                    inputProps={{
                      name: "description",
                    }}
                    value={dataInput?.description || ""}
                    onChange={onTypingData}
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <div className={classes.label}>* Loại sản phẩm</div>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <SelectItem
                    value={dataInput?.type || "Khác"}
                    data={productTypes}
                    onChangeInput={(e) =>
                      setDataInput({ ...dataInput, type: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Typography className={classes.typographyContent}>
                Thông chi tiết
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <div className={classes.label}>* Xuất xứ</div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <SelectItem
                        value={dataInput?.made_in || "Khác"}
                        data={productOrigins}
                        onChangeInput={(e) =>
                          setDataInput({
                            ...dataInput,
                            made_in: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <div className={classes.label}>* Số lượng</div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <OutlinedInput
                        classes={{
                          root: classes.contentLineEdit,
                          input: classes.inputEdit,
                          disabled: classes.disabled,
                        }}
                        required
                        inputProps={{
                          name: "in_stock",
                        }}
                        value={dataInput?.in_stock || ""}
                        onChange={onTypingData}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <div className={classes.label}> Link Vectary</div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <OutlinedInput
                        classes={{
                          root: classes.contentLineEdit,
                          input: classes.inputEdit,
                          disabled: classes.disabled,
                        }}
                        inputProps={{
                          name: "vectary_link",
                        }}
                        value={dataInput?.vectary_link || ""}
                        onChange={onTypingData}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <div className={classes.label}>* Giá</div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <OutlinedInput
                        classes={{
                          root: classes.contentLineEdit,
                          input: classes.inputEdit,
                          disabled: classes.disabled,
                        }}
                        endAdornment={
                          <InputAdornment position="end">vnđ</InputAdornment>
                        }
                        required
                        inputProps={{
                          name: "price",
                        }}
                        value={dataInput?.price || ""}
                        onChange={onTypingData}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Typography className={classes.typographyContent}>
                Thông tin vận chuyển
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <div className={classes.label}>
                        * Cân nặng (sau khi đóng gói)
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <OutlinedInput
                        classes={{
                          root: classes.contentLineEdit,
                          input: classes.inputEdit,
                          disabled: classes.disabled,
                        }}
                        required
                        value={dataInput?.details?.weight || ""}
                        endAdornment={
                          <InputAdornment position="end">gr</InputAdornment>
                        }
                        onChange={(e) =>
                          setDataInput({
                            ...dataInput,
                            details: {
                              ...dataInput.details,
                              weight: e.target.value,
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <div className={classes.label}>
                        Kích thước đóng gói (Phí vận chuyển thực tế sẽ thay đổi
                        nếu nhập sai kích thước)
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <div className={classes.flex}>
                        <FormControl variant="filled">
                          <FormHelperText>Rộng</FormHelperText>
                          <OutlinedInput
                            classes={{
                              root: classes.contentLineEdit,
                              input: classes.inputEdit,
                              disabled: classes.disabled,
                            }}
                            required
                            inputProps={{
                              name: "width",
                            }}
                            value={dataInput?.details?.width || ""}
                            onChange={(e) =>
                              setDataInput({
                                ...dataInput,
                                details: {
                                  ...dataInput.details,
                                  width: e.target.value,
                                },
                              })
                            }
                            endAdornment={
                              <InputAdornment position="end">cm</InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl variant="filled">
                          <FormHelperText>Dài</FormHelperText>
                          <OutlinedInput
                            classes={{
                              root: classes.contentLineEdit,
                              input: classes.inputEdit,
                              disabled: classes.disabled,
                            }}
                            required
                            inputProps={{
                              name: "len",
                            }}
                            value={dataInput?.details?.len || ""}
                            onChange={(e) =>
                              setDataInput({
                                ...dataInput,
                                details: {
                                  ...dataInput.details,
                                  len: e.target.value,
                                },
                              })
                            }
                            endAdornment={
                              <InputAdornment position="end">cm</InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl variant="filled">
                          <FormHelperText>Cao</FormHelperText>
                          <OutlinedInput
                            classes={{
                              root: classes.contentLineEdit,
                              input: classes.inputEdit,
                              disabled: classes.disabled,
                            }}
                            required
                            inputProps={{
                              name: "height",
                            }}
                            value={dataInput?.details?.height || ""}
                            onChange={(e) =>
                              setDataInput({
                                ...dataInput,
                                details: {
                                  ...dataInput.details,
                                  height: e.target.value,
                                },
                              })
                            }
                            endAdornment={
                              <InputAdornment position="end">cm</InputAdornment>
                            }
                          />
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Typography className={classes.typographyContent}>
                Thông tin khác
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <div className={classes.label}>Câu chuyện sản phẩm</div>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    id="standard-multiline-flexible"
                    multiline
                    rows={10}
                    variant="outlined"
                    className={classes.inputArea}
                    inputProps={{
                      name: "story",
                    }}
                    value={dataInput?.story || ""}
                    onChange={onTypingData}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Typography className={classes.typographyContent}>
                Cấu hình
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <div className={classes.label}>Trạng thái</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <SelectItem
                        value={dataInput?.status || AppConstant.STATUS.draft}
                        data={AppConstant.ARRAY_STATUS}
                        onChangeInput={(e) =>
                          setDataInput({ ...dataInput, status: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <div className={classes.label}>*Sản phẩm thuộc shop</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <SelectItem
                        inputProps={{
                          required: true,
                        }}
                        value={dataInput?.shop_id || ""}
                        data={shops}
                        onChangeInput={(e) =>
                          setDataInput({
                            ...dataInput,
                            shop_id: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="outlined" onClick={() => onClose(dataInput)}>
          Hủy
        </Button>
        <Button onClick={() => onSubmit(dataInput)}>
          {loading && (
            <CircularProgress size={20} className={classes.circular} />
          )}
          {dataInput?.id ? "Cập nhật" : "Tạo mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogProduct.propTypes = {
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
DialogProduct.defaultProps = {};

export default DialogProduct;

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    flexWrap: "wrap",
  },
  inputImageContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  inputImageItem: {
    textAlign: "center",
  },
  img: {
    width: 90,
    height: 90,
    margin: "10px",
    position: "relative",
    // border: "1px dashed #5f1e03",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s all ease-in-out",
    cursor: "pointer",
    "&:hover": {
      background: "#f2f2f2",
    },
  },
  imgFile: {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: 90,
    height: 90,
    opacity: 0,
    cursor: "pointer",
    zIndex: "2",
  },
  labelFile: {
    color: "#5f1e03",
  },
  previewContainer: {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: 90,
    height: 90,
  },
  previewImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  label: {
    textAlign: "right",
    "@media only screen and (max-width: 600px)": {
      textAlign: "left",
    },
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: 20,
  },
  circular: {
    color: "#fff",
    marginRight: 5,
  },
  dialogContainer: {
    width: "auto",
    maxWidth: 1200,
    height: "auto",
    objectFit: "contain",
    boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f6f6f6",
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
    marginBottom: 6,
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
  inputArea: {
    width: "100%",
    fontSize: 14,
    lineHeight: "1.875rem",
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
