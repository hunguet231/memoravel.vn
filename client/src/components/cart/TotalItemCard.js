/* eslint-disable react/prop-types */
import React from "react";
import styles from "styles/TotalItemCard.module.scss";
import { Checkbox } from "@material-ui/core";

export default function TotalItemCard({ order }) {
  return (
    <div className="wrapper">
      <div className={styles.card}>
        <h2 className={styles.title}>Tổng số sản phẩm </h2>
        {order && (
          <>
            <div className="flex justify-between">
              <p className={styles.itemCheck}>
                <span className={styles.label}>X2 &nbsp; &nbsp;</span>
                Bình sứ Vạn Phúc
              </p>
              <Checkbox checked={true} />
            </div>
            <div className="flex justify-between">
              <p className={styles.itemCheck}>
                <span className={styles.label}>X2 &nbsp; &nbsp;</span>
                Nón lá
              </p>
              <Checkbox checked={true} />
            </div>
            <div className="flex justify-between">
              <p className={styles.itemCheck}>
                <span className={styles.label}>X2 &nbsp; &nbsp;</span>
                Vải
              </p>
              <Checkbox checked={true} />
            </div>
            <div className="flex justify-between">
              <p className={styles.itemCheck}>
                <span className={styles.label}>X2 &nbsp; &nbsp;</span>
                Chén
              </p>
              <Checkbox checked={true} />
            </div>
            <br />
            <div className={styles.hr} />
          </>
        )}
        <div className="flex justify-between">
          <p className={styles.label}>Tạm tính:</p>
          <p>9.000.000.000 vnđ</p>
        </div>
        <div className="flex justify-between">
          <p className={styles.label}>Phí ship:</p>
          <p>Miễn phí</p>
        </div>
        <div className="flex justify-between">
          <p className={styles.label}>Giảm giá:</p>
          <p>1.000.000 vnđ</p>
        </div>
        <div className={styles.hr} />
        <div className="flex justify-between">
          <p className={styles.label}>Tổng:</p>
          <p className={styles.label}>8.999.000.000 vnđ</p>
        </div>
        <button className="button" style={{ width: "100%" }}>
          THANH TOÁN
        </button>
        <div style={{ textAlign: "center" }}>
          <a href="*">Quay lại mua sắm</a>
        </div>
      </div>
    </div>
  );
}
