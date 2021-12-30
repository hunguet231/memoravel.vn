/* eslint-disable react/prop-types */
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import { Close, CloudUpload as CloudUploadIcon } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { Col, Row } from "antd";
import axios from "axios";
import { Button, SelectItem } from "components/admin";
import { AppConstant } from "const";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const DialogShop = ({ isShow, onClose, onSubmit, data, loading }) => {
  const classes = useStyles();

  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");
  const [dataInput, setDataInput] = useState({
    name: "",
    avatar: "",
    cover: "",
    desciption: "",
    address: {
      country: "Việt Nam",
      city: "",
      district: "",
      ward: "",
      address_details: "",
    },
    status: AppConstant.STATUS.draft,
  });

  const [dataAddress, setDataAddress] = useState([]);
  const [address, setAddress] = useState({
    cities: [],
    districts: [],
    district: {},
    wards: [],
  });

  const fetchAddress = async () => {
    const url = "https://provinces.open-api.vn/api/?depth=3";
    const { data } = await axios.get(url);
    setDataAddress(data);
    setAddress({
      ...address,
      cities: data.map((obj) => ({ value: obj.name })),
    });
  };

  useEffect(() => {
    setAvatar(data?.avatar);
    setCover(data?.cover);
    fetchAddress();
  }, []);

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

  const handleAvtChange = (e) => {
    if (e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setAvatar(reader.result);
        setDataInput({
          ...dataInput,
          avatar: reader.result,
        });
      };
    }
  };

  const handleCvChange = (e) => {
    if (e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setCover(reader.result);
        setDataInput({
          ...dataInput,
          cover: reader.result,
        });
      };
    }
  };

  const onCityChange = (event, newValue) => {
    setDataInput({
      ...dataInput,
      address: {
        ...dataInput.address,
        city: newValue.value,
      },
    });

    const districts = dataAddress.find(
      (obj) => obj.name === newValue.value
    ).districts;
    setAddress({
      ...address,
      districts: districts.map((district) => ({
        value: district.name,
      })),
    });
  };

  const onDistrictChange = (event, newValue) => {
    setDataInput({
      ...dataInput,
      address: {
        ...dataInput.address,
        district: newValue.value,
      },
    });
    const city = dataAddress.find((obj) => obj.name === dataInput.address.city);
    const wards = city.districts.find(
      (obj) => obj.name === newValue.value
    ).wards;
    setAddress({
      ...address,
      wards: wards.map((ward) => ({ value: ward.name })),
    });
  };

  const onWardChange = (event, newValue) => {
    setDataInput({
      ...dataInput,
      address: {
        ...dataInput.address,
        ward: newValue.value,
      },
    });
  };

  return (
    <Dialog
      open={isShow}
      onClose={onClose}
      classes={{ paperScrollPaper: classes.dialogContainer }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography classes={{ body1: classes.textDialogTitle }}>
          {data?.id ? "Cập nhật shop" : "Tạo shop mới"}
        </Typography>
        <IconButton
          className={classes.closeButton}
          onClick={() => onClose(dataInput)}
        >
          <Close className={classes.closeIcon} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography className={classes.typographyContent}>Tên shop</Typography>
        <OutlinedInput
          placeholder="Nhập tên shop"
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
        <Typography className={classes.typographyContent}>
          Mô tả shop
        </Typography>
        <OutlinedInput
          id="standard-multiline-flexible"
          multiline
          rows={10}
          variant="outlined"
          style={{ width: "100%" }}
          required
          inputProps={{
            name: "description",
          }}
          value={dataInput?.description || ""}
          onChange={onTypingData}
        />

        <Typography className={classes.typographyContent}>
          Ảnh đại diện
        </Typography>
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
            onChange={handleAvtChange}
          />
        </Button>
        {avatar && (
          <div className={classes.boxImg}>
            <img className={classes.previewAvatar} src={avatar} alt="Avatar" />
          </div>
        )}
        <br />
        <Typography className={classes.typographyContent}>Ảnh bìa</Typography>
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
            onChange={handleCvChange}
          />
        </Button>
        {cover && (
          <img className={classes.previewCover} src={cover} alt="Cover" />
        )}

        <br />
        <Typography className={classes.typographyContent}>Địa chỉ</Typography>
        <Row gutter={10}>
          <Col xs={24} lg={8}>
            <Autocomplete
              disableClearable
              onChange={onCityChange}
              id="combo-box-demo"
              options={address.cities}
              defaultValue={{ value: dataInput?.address?.city }}
              getOptionLabel={(option) => option.value}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  defaultValue={dataInput?.address?.city || ""}
                  value={dataInput?.address?.city || ""}
                  label="Tỉnh/Thành phố"
                  variant="outlined"
                  style={{ marginBottom: "15px" }}
                />
              )}
            />
          </Col>
          <Col xs={24} lg={8}>
            <Autocomplete
              disableClearable
              onChange={onDistrictChange}
              id="combo-box-demo"
              options={address.districts}
              defaultValue={{ value: dataInput?.address?.district }}
              getOptionLabel={(option) => option.value}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  defaultValue={dataInput?.address?.district || ""}
                  value={dataInput?.address?.district || ""}
                  label="Quận/Huyện"
                  variant="outlined"
                  style={{ marginBottom: "15px" }}
                />
              )}
            />
          </Col>
          <Col xs={24} lg={8}>
            <Autocomplete
              disableClearable
              onChange={onWardChange}
              id="combo-box-demo"
              options={address.wards}
              defaultValue={{ value: dataInput?.address?.ward }}
              getOptionLabel={(option) => option.value}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  defaultValue={dataInput?.address?.ward || ""}
                  value={dataInput?.address?.ward || ""}
                  label="Phường/Xã"
                  variant="outlined"
                  style={{ marginBottom: "15px" }}
                />
              )}
            />
          </Col>
        </Row>

        <Typography className={classes.typographyContent}>
          Địa chỉ cụ thể
        </Typography>
        <OutlinedInput
          placeholder="Tên đường, Toà nhà, Số nhà..."
          classes={{
            root: classes.contentLineEdit,
            input: classes.inputEdit,
            disabled: classes.disabled,
          }}
          required
          value={dataInput?.address?.address_details || ""}
          onChange={(e) =>
            setDataInput({
              ...dataInput,
              address: {
                ...dataInput.address,
                address_details: e.target.value,
              },
            })
          }
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
          {loading && (
            <CircularProgress size={20} className={classes.circular} />
          )}
          {dataInput?.id ? "Cập nhật" : "Tạo mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogShop.propTypes = {
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
DialogShop.defaultProps = {};

export default DialogShop;

const useStyles = makeStyles((theme) => ({
  circular: {
    color: "#fff",
    marginRight: 5,
  },
  boxImg: {
    display: "flex",
    justifyContent: "center",
  },
  previewAvatar: {
    objectFit: "cover",
    margin: "10px auto 0",
    width: "150px",
    height: "150px",
    borderRadius: "150px",
  },
  previewCover: {
    marginTop: "10px",
    height: 250,
    objectFit: "cover",
  },
  dialogContainer: {
    width: "100%",
    maxWidth: 800,
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
