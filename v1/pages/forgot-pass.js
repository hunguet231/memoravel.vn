import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";
import styles from "../styles/Form.module.css";

export default function forgotPass() {
  return (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <h1 className={styles.title}>QUÊN MẬT KHẨU</h1>
          <form>
            <div className={styles.takeCode}>
              <input
                type="text"
                placeholder="Email hoặc SĐT"
                className={styles.inputField}
              />
              <button type="submit" className={styles.insideBtn}>
                Gửi mã
              </button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Nhập mã"
                className={styles.inputField}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              LẤY LẠI MẬT KHẨU
            </button>
            <div className={styles.footerLinks}>
              <Link href="/register">Đăng ký tài khoản</Link>
              <Link href="/login">Đăng nhập</Link>
            </div>
          </form>
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </>
  );
}
