import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";
import styles from "../styles/Form.module.css";

export default function login() {
  return (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <h1 className={styles.title}>ĐĂNG NHẬP</h1>
          <form>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Tài khoản"
                className={styles.inputField}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className={styles.inputField}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              ĐĂNG NHẬP
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
