import React from "react";
import {
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import styles from "../../styles/Footer.module.scss";

const Footer = () => {
  return (
    <div className="wrapper">
      <div className={styles.footer}>
        <div className="container-fluid">
          <div className={styles.infoBox}>
            <div className={styles.logo}>
              <img src="/images/logo-light.svg" alt="Logo Memoravel" />
            </div>
            <div className={styles.socail}>
              <a
                style={{ color: "#fff" }}
                href="https://www.youtube.com/channel/UC8Tl2Owjeap9XWiHHq5ssHA"
                target="_blank"
                rel="noreferrer"
              >
                <YoutubeOutlined />
              </a>
              <a
                style={{ color: "#fff" }}
                href="https://www.facebook.com/memoravel.vn"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookOutlined />
              </a>
              <a href="#" style={{ color: "#fff" }}>
                <TwitterOutlined />
              </a>
              <a href="#" style={{ color: "#fff" }}>
                <InstagramOutlined />
              </a>
            </div>
          </div>
          <div className="container">
            <div className={styles.divider}></div>
            <div className={styles.textBottom}>
              <div className={styles.copyright}>
                &copy;2021 Memoravel. Đã đăng kí bản quyền.
              </div>
              <ul className={styles.links}>
                <li>
                  <Link href="/policies/1">Chính sách bảo mật</Link>
                </li>
                <li>
                  <Link href="/policies">Điều khoản và điều kiện</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
