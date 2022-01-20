import React from "react";
import styles from "../styles/Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className="slogan">
            <div className={styles.title}>MEMORAVEL</div>
            <div className={styles.subTitle}>
              Get out there & discover your next slope, mountain & destination!
            </div>
          </div>
          <div className={styles.copyright}>
            &copy;Copyright 2021 MEMORAVEL, Inc. Terms & Privacy
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.col}>
            <div className={styles.heading}>More on The Blog</div>
            <div className={styles.link}>About MEMORAVEL</div>
            <div className={styles.link}>Contributors & Writers</div>
            <div className={styles.link}>Write For Us</div>
            <div className={styles.link}>Contact Us</div>
            <div className={styles.link}>Privacy Policy</div>
          </div>
          <div className={styles.col}>
            <div className={styles.heading}>More on MEMORAVEL</div>
            <div className={styles.link}>The Team</div>
            <div className={styles.link}>Jobs</div>
            <div className={styles.link}>Press</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
