import React from "react";
import {
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import styles from "../../styles/Footer.module.scss";

const Footer = () => {
  return (
    <div className="wrapper">
      <div className={styles.footer}>
        <div className="container-fluid">
          <div className={styles.infoBox}>
            <div className={styles.logo}>
              <img src="/images/logo-1.png" alt="Logo Memoravel" />
            </div>
            <div className={styles.socail}>
              <YoutubeOutlined />
              <FacebookOutlined />
              <TwitterOutlined />
              <InstagramOutlined />
            </div>
          </div>
          <div className="container">
            <div className={styles.divider}></div>
            <div className={styles.textBottom}>
              <div className={styles.copyright}>
                &copy;2021 Memoravel. Đã đăng kí bản quyền.
              </div>
              <ul className={styles.links}>
                <li>Chính sách bảo mật</li>
                <li>Điều khoản và điều kiện</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
