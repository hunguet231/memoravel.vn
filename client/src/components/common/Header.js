import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Input, Menu } from "antd";
import React from "react";
import styles from "../../styles/Header.module.scss";

const categoriesList = (
  <Menu style={{ padding: "20px" }}>
    <Menu.Item>
      <a style={{ fontSize: "22px" }}>1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a style={{ fontSize: "22px" }}>2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a style={{ fontSize: "22px" }}>3rd menu item</a>
    </Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <div className="wrapper">
      <div className={styles.headerWrapper}>
        <div className="container">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img src="/images/logo-dark.svg" width={40} height={40} />
              <span className={styles.logoText}>MEMORAVEL</span>
            </div>
            <div className="flex items-center">
              <div
                className={`${styles.btn} button button-outline text-center`}
              >
                <UserOutlined /> Đăng ký
              </div>
              <div className={`${styles.btn} button text-center`}>
                <UserOutlined /> Đăng nhập
              </div>
            </div>
          </div>
        </div>
        <div className={styles.menuWrapper}>
          <div className="container">
            <ul className="flex justify-between">
              <li className={styles.navLink}>
                <Dropdown overlay={categoriesList}>
                  <a
                    className={styles.dropdownButton}
                    onClick={(e) => e.preventDefault()}
                  >
                    Danh mục sản phẩm &nbsp;&nbsp;
                    <DownOutlined />
                  </a>
                </Dropdown>
              </li>
              <li className={styles.navLink}>Trang chủ</li>
              <li className={styles.navLink}>Cửa hàng</li>
              <li className={styles.navLink}>Tin tức</li>
              <li className={styles.navLink}>Liên hệ</li>
              <li className={styles.navLink}>
                <Input
                  className={styles.searchBox}
                  placeholder="Tìm kiếm sản phẩm"
                  suffix={<SearchOutlined />}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
