import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
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
        <div className={styles.navItem}>
          <Link href="/meminfo">Meminfo</Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/memdraw">Memdraw</Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/memoravel">Memoravel</Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/shop">Shop</Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/blog">Blog</Link>
        </div>
      </div>

      <div className={styles.userBox}>
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
                  padding: "5px",
                  border: "2px solid #fff",
                  borderRadius: "50%",
                }}
              />
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
