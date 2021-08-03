/* eslint-disable react-hooks/rules-of-hooks */
import { message, Spin } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";
import styles from "../styles/Form.module.css";
import validateRegister from "../utils/validateRegister";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { useEffect } from "react";

export default function login() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const initalState = {
    fullname: "",
    address: "",
    username: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const { fullname, address, username, password, cf_password } = userData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validateRegister(
      fullname,
      address,
      username,
      password,
      cf_password
    );
    if (!errMsg) {
      setLoading(true);

      const res = await postData("auth/register", userData);

      if (res.err) {
        message.error(res.err);
        setLoading(false);
      } else {
        message.success(res.msg);
        setLoading(false);
        router.push("/login");
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
          <h1 className={styles.title}>ĐĂNG KÝ</h1>
          <p className={styles.subTitle}>
            Đừng lo, Memoravel sẽ bảo vệ thông tin của bạn
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="fullname"
                placeholder="Họ & tên"
                className={styles.inputField}
                value={fullname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ"
                className={styles.inputField}
                value={address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Tài khoản: Nhập email hoặc SĐT"
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
            <div>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className={styles.inputField}
                name="cf_password"
                value={cf_password}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.policy}>
              (*) Khi bấm vào đăng ký tài khoản, bạn chắc chắn đã đọc và đồng ý
              với Chính sách bảo mật, Điều khoản dịch vụ và chính sách tư vấn
              của MEMORAVEL.
            </div>
            <button type="submit" className={styles.submitBtn}>
              {loading && <Spin />} ĐĂNG KÝ
            </button>
            <div className={styles.footerLinks}>
              <Link href="/login">Đăng nhập</Link>
              <Link href="/forgot-pass">Quên mật khẩu?</Link>
            </div>
          </form>
        </div>
        <div>
          <SubscribeForm />
          <Footer />
        </div>
      </div>
    </>
  );
}
