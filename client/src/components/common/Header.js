import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import HomeFilter from "components/home/HomeFilter";
import React from "react";
import styles from "../../styles/Header.module.scss";

const Header = () => {
  return (
    <div className="wrapper">
      <div className={styles.headerWrapper}>
        <div className="container">
          <div className="flex justify-between">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src="/images/logo-dark.svg" width={40} height={40} />
                <span className={styles.logoText}>MEMORAVEL</span>
              </div>
            </Link>
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
              <li>
                <Link href="/">Trang chủ</Link>
              </li>
              <li>
                <Link href="/shop">Cửa hàng</Link>
              </li>
              <li>
                <Link href="/blog">Tin tức</Link>
              </li>
              <li>
                <Link href="/contact">Liên hệ</Link>
              </li>
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
