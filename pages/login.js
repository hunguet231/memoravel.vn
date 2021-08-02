/* eslint-disable react-hooks/rules-of-hooks */
import { message, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";
import { postData } from "../utils/fetchData";
import validateLogin from "../utils/validateLogin";
import styles from "../styles/Form.module.css";
import Cookie from "js-cookie";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { useEffect } from "react";

export default function login() {
  const router = useRouter();
  const initalState = { username: "", password: "" };
  const [userData, setUserData] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const { username, password } = userData;
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errMsg = validateLogin(username, password);

    if (!errMsg) {
      setLoading(true);
      const res = await postData("auth/login", userData);

      if (res.err) {
        message.error(res.err);
        setLoading(false);
      } else {
        message.success(res.msg);
        setLoading(false);

        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });

        Cookie.set("refreshToken", res.refresh_token, {
          path: "api/auth/accessToken",
          expires: 7,
        });

        localStorage.setItem("firstLogin", true);
        router.push("/");
      }
    } else {
      message.error(errMsg);
    }
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <h1 className={styles.title}>ĐĂNG NHẬP</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Tài khoản"
                className={styles.inputField}
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className={styles.inputField}
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              {loading && <Spin />} ĐĂNG NHẬP
            </button>
            <div className={styles.footerLinks}>
              <Link href="/register">Đăng ký tài khoản</Link>
              <Link href="/forgot-pass">Quên mật khẩu?</Link>
            </div>
          </form>
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </>
  );
}
