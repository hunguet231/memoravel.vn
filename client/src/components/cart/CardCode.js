import React from "react";
import Button from "components/common/Button";
import styles from "styles/CardCode.module.scss";

const CardCode = () => {
  return (
    <div className={styles.cardCode}>
      <h3 className={styles.headingCard}>Bạn có phiếu giảm giá ?</h3>
      <input type="text" placeholder="Nhập email" className={styles.input} />
      <div className="flex justify-between">
        <div>
          <div className="text-start">Giảm</div>
          <p className={styles.priceSale}>1.000.000 vnđ</p>
        </div>
        <div className="text-start">
          <Button type="secondary" color="#F86338">
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardCode;
