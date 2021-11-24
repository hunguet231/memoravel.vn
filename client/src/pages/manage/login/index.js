import React, { useState } from "react";
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
    fontSize: 46,
    fontWeight: 700,
    color: theme.palette.primary.main,
    textShadow:
      "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)",
  },
  formInput: {
    width: 400,
    marginBottom: 32,
    [theme.breakpoints.down(830)]: {
      width: "calc(100% - 32px)",
      margin: "0px 16px 32px",
    },
  },
  button: {
    width: 400,
    height: 45,
    marginBottom: 32,
    fontSize: 20,
    [theme.breakpoints.down(830)]: {
      width: "calc(100% - 32px)",
      margin: "0px 16px 32px",
    },
  },
}));
