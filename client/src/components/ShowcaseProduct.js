import React from "react";
import styles from "../styles/ShowcaseProduct.module.scss";

const ShowcaseProduct = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.showcase}>
          <h1 className="heading text-center">Sản phẩm làng nghề</h1>
          <ul className="flex justify-between">
            <li className={styles.showcaseItem}>Tất cả</li>
            <li className={styles.showcaseItem}>Bình</li>
            <li className={styles.showcaseItem}>Ấm chén</li>
            <li className={styles.showcaseItem}>Đĩa</li>
            <li className={styles.showcaseItem}>Tranh</li>
            <li className={styles.showcaseItem}>Quần áo</li>
            <li className={styles.showcaseItem}>Nội thất</li>
            <li className={styles.showcaseItem}>Trang trí</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseProduct;
