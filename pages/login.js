import React from "react";
import Link from "next/link";
import SubscribeForm from "../components/SubscribeForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Login.module.css";

export default function login() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>ĐĂNG NHẬP</h1>
          <small>Đừng lo, Memoravel sẽ bảo vệ thông tin của bạn</small>
          <form>
            <div>
              <input type="email" placeholder="Tài khoản" className={styles.inputField} />
            </div>
            <div className={styles.inputWithBtn}>
              <input type="password" placeholder="Mật khẩu" className={styles.inputField} />
            </div>
            <button type="button" className={styles.reveal}>
              <span>&#128064;</span>
            </button>
            <br />
            <button type="submit" className={styles.loginBtn} style={{ marginTop: "25px" }}>
              ĐĂNG NHẬP
            </button>
            <div>
              <Link href="/register">
                <a style={{ marginRight: "100px" }}>Đăng ký tài khoản</a>
              </Link>
              <Link href="/forget-pass">
                <a style={{ marginLeft: "100px" }}>Quên mật khẩu?</a>
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
