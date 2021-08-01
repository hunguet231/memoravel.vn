import React from "react";
import { ArrowDownOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styles from "../styles/TextBox.module.css";
import Link from "next/link";

const TextBox = ({
  supHeading,
  heading,
  description,
  linkTo,
  arrowDirection,
  hero,
  link,
}) => {
  return (
    <div className={styles.textBox}>
      <div className={styles.supHeading}>{supHeading}</div>
      <div className={`${styles.heading} ${hero ? styles.headingHero : ""}`}>
        {heading}
      </div>
      <div
        className={`${styles.description} ${
          hero ? styles.descriptionHero : ""
        }`}
      >
        {description}
      </div>
      <div className={`${styles.linkTo} ${hero ? styles.linkToHero : ""}`}>
        <p>
          <Link href={link ? link : "/"}>{linkTo}</Link>
        </p>
        <p>
          {arrowDirection === "down" && <ArrowDownOutlined />}
          {arrowDirection === "right" && <ArrowRightOutlined />}
        </p>
      </div>
    </div>
  );
};

export default TextBox;
