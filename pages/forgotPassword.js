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
          <h1 className={styles.title}>QUÊN MẬT KHẨU</h1>
          <small>Đừng lo, Memoravel sẽ bảo vệ thông tin của bạn</small>
          <form style={{ marginTop: "12px" }}>
            <div className={styles.inputWithBtn}>
              <input type="text" placeholder="Mật khẩu" className={styles.inputField} />
            </div>
            <button type="button" className={styles.takeCode}>
              <span>Gửi mã</span>
            </button>
            <div>
              <input type="text" placeholder="Nhập mã" className={styles.inputField} />
            </div>
            <br />
            <button type="submit" className={styles.loginBtn}>
              LẤY LẠI MẬT KHẨU
            </button>
            <div>
              <Link href="/register">
                <a style={{ marginRight: "120px" }}>Đăng kí tài khoản</a>
              </Link>
              <Link href="/forget-pass">
                <a style={{ marginLeft: "120px" }}>Đăng nhập</a>
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
