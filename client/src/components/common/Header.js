import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Input } from "antd";
import HomeFilter from "components/HomeFilter";
import React from "react";
import styles from "../../styles/Header.module.scss";

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
              <li>
                Danh mục sản phẩm &nbsp;
                <DownOutlined />
                <div className={styles.filter}>{<HomeFilter />}</div>
              </li>
              <li>Trang chủ</li>
              <li>Cửa hàng</li>
              <li>Tin tức</li>
              <li>Liên hệ</li>
              <li>
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
