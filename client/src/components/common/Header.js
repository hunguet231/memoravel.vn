import React from "react";
import styles from "../../styles/Header.module.scss";
import { Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";
const Header = () => {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className={styles.headerWrapper}>
            <div className="flex justify-between">
              <div className="flex items-center">
                <Image src="/images/favicon.ico" width={50} height={50} className={styles.logo} />
                <span className={styles.logoText}>MEMORAVEL</span>
              </div>
              <div>
                <Button size="large" icon={<UserOutlined />} ghost className={styles.btnRegister}>
                  Đăng ký
                </Button>
                <Button size="large" icon={<UserOutlined />} className={styles.btnLogin}>
                  Đăng nhập
                </Button>
              </div>
            </div>
            <div style={{ backgroundColor: "green" }}>
              <ul className="flex justify-between">
                <li>Danh mục sản phẩm</li>
                <li>Trang chủ</li>
                <li>Cửa hàng</li>
                <li>Tin tức</li>
                <li>Liên hệ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
