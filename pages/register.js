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
          <h1 className={styles.title}>ĐĂNG KÍ</h1>
          <p className={styles.subTitle}>
            Đừng lo, Memoravel sẽ bảo vệ thông tin của bạn
          </p>
          <form>
            <div>
              <input
                type="text"
                name="fullname"
                placeholder="Họ & tên"
                className={styles.inputField}
              />
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ"
                className={styles.inputField}
              />
            </div>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Tài khoản: Nhập email hoặc SĐT"
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
            <div>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className={styles.inputField}
              />
            </div>
            <div className={styles.policy}>
              (*) Khi bấm vào đăng ký tài khoản, bạn chắc chắn đã đọc và đồng ý
              với Chính sách bảo mật, Điều khoản dịch vụ và chính sách tư vấn
              của MEMORAVEL.
            </div>
            <button type="submit" className={styles.submitBtn}>
              ĐĂNG KÝ
            </button>
            <div className={styles.footerLinks}>
              <Link href="/login">Đăng nhập</Link>
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
