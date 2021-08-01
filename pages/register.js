import React from "react";
import Link from "next/link";
import SubscribeForm from "../components/SubscribeForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Login.module.css";

export default function login() {
  return (
    <>
      <div className={styles.container}>
        <h1>Navbar</h1>
        <div>
          <h1 className={styles.title}>ĐĂNG KÍ</h1>
          <small>Đừng lo, Memoravel sẽ bảo vệ thông tin của bạn</small>
          <form style={{ marginTop: "12px" }}>
            <div>
              <input
                type="email"
                placeholder="Tài khoản: Nhập email hoặc SĐT"
                className={styles.inputField}
              />
            </div>
            <div>
              <input type="password" placeholder="Mật khẩu" className={styles.inputField} />
            </div>
            <div>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className={styles.inputField}
              />
            </div>
            <br />
            <button type="submit" className={styles.loginBtn}>
              ĐĂNG KÝ
            </button>
            <div>
              <Link href="/register">
                <a style={{ marginRight: "120px" }}>Đăng nhập</a>
              </Link>
              <Link href="/forget-pass">
                <a style={{ marginLeft: "120px" }}>Quên mật khẩu?</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </>
  );
}
