import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import logo from "../public/logo-small.png";
import useWindowSize from "../utils/useWindowSize";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";

const Navbar = () => {
  const navRef = useRef(null);
  const size = useWindowSize();
  const [padding, setPadding] = useState("");

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
  }, [padding]);

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
        <Link href="/register" passHref>
          <div className={styles.signUpBtn}>Đăng kí</div>
        </Link>
        <Link href="/login" passHref>
          <div className={styles.loginBtn}>Đăng nhập</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
