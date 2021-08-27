import {
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  HomeOutlined,
  CodeSandboxOutlined,
  ShopOutlined,
  FormOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, message, Drawer, Button, Divider } from "antd";
import Cookie from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../public/logo-small.png";
import { DataContext } from "../store/GlobalState";
import styles from "../styles/Navbar.module.css";
import useWindowSize from "../utils/useWindowSize";

const Navbar = () => {
  const navRef = useRef(null);
  const size = useWindowSize();
  const [padding, setPadding] = useState("");
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (size.width <= 1080) {
      setPadding("padding: 10px 15px;");
    } else {
      setPadding("padding: 10px 80px;");
    }
  }, [size.width]);

  const handleScroll = () => {
    if (window.pageYOffset > 5) {
      navRef.current.style = `background-color: #000; ${padding} box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;`;
    } else {
      navRef.current.style = "background-color: transparent;";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [padding]);

  const handleLogout = () => {
    setVisible(false);
    Cookie.remove("refreshToken", { path: "api/auth/accessToken" });

    localStorage.removeItem("firstLogin");

    dispatch({ type: "AUTH", payload: {} });

    message.success("Đã đăng xuất thành công");

    router.push("/");
  };

  const userMenu = () => {
    return (
      <Menu>
        <Menu.Item>{auth.user.fullname}</Menu.Item>
        <Menu.Item danger onClick={handleLogout} icon={<LogoutOutlined />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    );
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const mobileMenu = () => {
    return (
      <>
        <Button
          type="text"
          onClick={showDrawer}
          icon={<MenuOutlined />}
          style={{ color: "#fff", alignSelf: "center", justifySelf: "end" }}
        ></Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Menu>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              {Object.keys(auth).length === 0 ? (
                <div style={{ padding: "0 16px" }}>
                  <Link href="/register" passHref>
                    <div className={styles.signUpBtn} onClick={onClose}>
                      Đăng ký
                    </div>
                  </Link>
                  <Link href="/login" passHref>
                    <div className={styles.loginBtn} onClick={onClose}>
                      Đăng nhập
                    </div>
                  </Link>
                </div>
              ) : (
                <>
                  <p>
                    <UserOutlined
                      style={{
                        cursor: "pointer",
                        padding: "5px",
                        border: "1px solid #e0bf74",
                        borderRadius: "50%",
                        color: "#e0bf74",
                      }}
                    />
                  </p>
                  <p style={{ fontWeight: "500", color: "#e0bf74" }}>
                    {auth.user.fullname}
                  </p>
                </>
              )}
            </div>
            <Divider />
            <Menu.Item onClick={onClose} icon={<ShoppingOutlined />}>
              <Link href="/cart">Giỏ hàng</Link>
            </Menu.Item>
            <Menu.Item onClick={onClose} icon={<HomeOutlined />}>
              <Link href="/">Home</Link>
            </Menu.Item>
            {/* <Menu.Item onClick={onClose} icon={<CodeSandboxOutlined />}>
              <Link href="/meminfo">Meminfo</Link>
            </Menu.Item>
            <Menu.Item onClick={onClose} icon={<CodeSandboxOutlined />}>
              <Link href="/memdraw">Memdraw</Link>
            </Menu.Item>
            <Menu.Item onClick={onClose} icon={<CodeSandboxOutlined />}>
              <Link href="/memoravel">Memoravel</Link>
            </Menu.Item> */}
            <Menu.Item onClick={onClose} icon={<ShoppingCartOutlined />}>
              <Link href="/shop">Shop</Link>
            </Menu.Item>
            <Menu.Item onClick={onClose} icon={<ShopOutlined />}>
              <Link href="/sell">Kênh bán</Link>
            </Menu.Item>
            <Menu.Item onClick={onClose} icon={<FormOutlined />}>
              <Link href="/blog">Blog</Link>
            </Menu.Item>
            {Object.keys(auth).length !== 0 && (
              <Menu.Item
                danger
                onClick={handleLogout}
                icon={<LogoutOutlined />}
              >
                Đăng xuất
              </Menu.Item>
            )}
          </Menu>
        </Drawer>
      </>
    );
  };

  return (
    <div className={styles.navbar} ref={navRef}>
      <Link href="/" passHref>
        <div className={styles.logo}>
          <Image src={logo} alt="Memoravel" />
          <p className={styles.logoText}>Memoravel</p>
        </div>
      </Link>

      <div className={styles.navLinks}>
        <div className={styles.navItem}>
          <Link href="/">Home</Link>
        </div>
        {/* <div className={styles.navItem}>
          <Link href="/meminfo">Meminfo</Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/memdraw">Memdraw</Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/memoravel">Memoravel</Link>
        </div> */}
        <div className={styles.navItem}>
          <Link href="/shop">Shop</Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/sell">Kênh bán</Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/blog">Blog</Link>
        </div>
      </div>

      <div className={styles.userBox}>
        <p>
          <Link href="/cart" passHref>
            <ShoppingOutlined style={{ cursor: "pointer" }} />
          </Link>
        </p>
        {Object.keys(auth).length === 0 ? (
          <>
            <Link href="/register" passHref>
              <div className={styles.signUpBtn}>Đăng ký</div>
            </Link>
            <Link href="/login" passHref>
              <div className={styles.loginBtn}>Đăng nhập</div>
            </Link>
          </>
        ) : (
          <>
            <Dropdown overlay={userMenu()}>
              <UserOutlined
                style={{
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
              />
            </Dropdown>
          </>
        )}
      </div>

      {size.width <= 1190 && mobileMenu()}
    </div>
  );
};

export default Navbar;
