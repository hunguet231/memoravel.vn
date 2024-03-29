import React, { useState, useEffect } from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { MainLayout } from "layouts";
import { Button, AppAlert } from "components/admin";
import Header from "components/common/Header";
import ContactForm from "components/common/ContactForm";
import { ApiConstant, AppConstant, PathConstant } from "const";
import { fetchData } from "api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [message, setMessage] = useState("");

  const onChangeData = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const onSubmit = async () => {
    const response = await fetchData(
      ApiConstant.LOGIN,
      ApiConstant.METHOD.post,
      {
        username: values.username,
        password: values.password,
      }
    );
    if (response?.data?.token) {
      Cookies.set(AppConstant.APP_TOKEN, response?.data?.token);
      const userData = { ...response?.data };
      delete userData["token"];
      Cookies.set(AppConstant.USER_DATA, userData);
      router.push(PathConstant.MANAGE_TOPIC);
    } else {
      setMessage(
        response?.message !== "OK" ? response?.message : "Có lỗi xảy ra!"
      );
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const response = await fetchData(ApiConstant.PROFILE);
      if (response?.status === AppConstant.STATUS_OK) {
        router.push(PathConstant.MANAGE_TOPIC);
      }
    };
    checkToken();
  }, []);

  return (
    <MainLayout>
      <Header />
      <div className={classes.border}>
        <p className={classes.header}>Đăng nhập</p>
        <FormControl variant="outlined" className={classes.formInput}>
          <InputLabel>Tài khoản</InputLabel>
          <OutlinedInput
            type="text"
            value={values.username}
            onChange={onChangeData("username")}
            labelWidth={75}
          />
        </FormControl>
        <FormControl variant="outlined" className={classes.formInput}>
          <InputLabel>Mật khẩu</InputLabel>
          <OutlinedInput
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={onChangeData("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={onClickShowPassword} edge="end">
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Button
          disabled={!values.username || !values.password}
          className={classes.button}
          onClick={onSubmit}
        >
          Đăng nhập
        </Button>
      </div>
      <ContactForm />
      {message && (
        <AppAlert
          isOpen={!!message}
          onClose={() => setMessage("")}
          severity="error"
        >
          {message}
        </AppAlert>
      )}
    </MainLayout>
  );
};

export default Login;

const useStyles = makeStyles((theme) => ({
  border: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "24px 0px",
    marginTop: 120,
    [theme.breakpoints.down(830)]: {
      marginTop: 60,
    },
  },
  header: {
    marginTop: "120px",
    "@media only screen and (max-width: 830px)": {
      marginTop: "60px",
      fontSize: 30,
      fontWeight: 600,
    },
    fontSize: 46,
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  formInput: {
    width: "100%",
    maxWidth: "450px",
    marginBottom: 32,
    [theme.breakpoints.down(830)]: {
      width: "calc(100% - 32px)",
      margin: "0px 16px 32px",
    },
  },
  button: {
    width: "100%",
    maxWidth: "450px",
    height: 45,
    marginBottom: 32,
    fontSize: 20,
    [theme.breakpoints.down(830)]: {
      width: "calc(100% - 32px)",
      margin: "0px 16px 32px",
    },
  },
}));
