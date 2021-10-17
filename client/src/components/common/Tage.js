/* eslint-disable react/prop-types */
import React from "react";
import styles from "../../styles/Tag.module.scss";

const Tag = ({ text }) => {
  return <span className={styles.tag}>{text}</span>;
};

export default Tag;
