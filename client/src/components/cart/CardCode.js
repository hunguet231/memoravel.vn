import React from "react";
import Button from "components/common/Button";
import styles from "styles/CardCode.module.scss";
import { message } from "antd";

const CardCode = () => {
  const handleCodeCheck = () => {
    return message.error("Bạn chưa có phiếu giảm giá nào!");
  };

  return (
    <div className={styles.cardCode}>
      <h3 className={styles.headingCard}>Bạn có phiếu giảm giá ?</h3>
      <input type="text" placeholder="Nhập email" className={styles.input} />
      <div className="flex justify-between">
        <div>
          <div className="text-start">Giảm</div>
          <p className={styles.priceSale}>20%</p>
        </div>
        <div className="text-start">
          <Button type="secondary" color="#F86338" onClick={handleCodeCheck}>
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardCode;
