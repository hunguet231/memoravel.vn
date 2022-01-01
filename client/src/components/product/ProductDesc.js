/* eslint-disable react/prop-types */
import React from "react";
import styles from "styles/ProductDesc.module.scss";

const ProductDesc = ({ description }) => {
  return (
    <div className={styles.container}>
      <h1 className="heading heading-section">Mô tả sản phẩm</h1>
      <div className={styles.content}>{description}</div>
    </div>
  );
};

export default ProductDesc;
