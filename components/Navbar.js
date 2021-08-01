import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import logo from "../public/logo-small.png";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const navRef = useRef(null);

  const handleScroll = () => {
    if (window.pageYOffset > 5) {
      navRef.current.style =
        "background-color: #000; padding: 10px 80px; box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;";
    } else {
      navRef.current.style = "background-color: transparent;";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    </div>
  );
};

export default Navbar;
