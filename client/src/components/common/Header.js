import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import HomeFilter from "components/home/HomeFilter";
import React from "react";
import styles from "../../styles/Header.module.scss";
import { Menu, Dropdown, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { PathConstant } from "const";

const productList = (
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
  const router = useRouter();
  return (
    <div className="wrapper">
      <div className={styles.headerWrapper}>
        <div className="container">
          <div className="flex justify-between">
            <Link href="/" />
            <div className="flex items-center cursor-pointer">
              <img src="/images/logo-dark.svg" width={40} height={40} />
              <span className={styles.logoText}>MEMORAVEL</span>
            </div>
            <div className="flex">
              <div className={styles.btnRegister}>
                <div className="button button-transparent text-center">
                  <UserOutlined /> Đăng ký
                </div>
              </div>

              <div
                className="button text-center"
                onClick={() => router.push(PathConstant.MANAGE_LOGIN)}
              >
                <UserOutlined /> Đăng nhập
              </div>
            </div>
          </div>
        </div>
        <div className={styles.menuWrapper}>
          <div className="container">
            <ul className="flex justify-between">
              <li>
                <Dropdown overlay={productList}>
                  <a
                    className={styles.dropdownButton}
                    onClick={(e) => e.preventDefault()}
                  >
                    Danh mục sản phẩm &nbsp;&nbsp;
                    <DownOutlined />
                  </a>
                </Dropdown>
              </li>
              <li className={styles.active}>Trang chủ</li>
              <li>Cửa hàng</li>
              <li>Tin tức</li>
              <li>Liên hệ</li>
              <li>
                <Input
                  className={styles.input}
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
