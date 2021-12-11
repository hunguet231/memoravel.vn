import React from "react";
import PropTypes from "prop-types";
import styles from "styles/TotalItemCard.module.scss";
import Button from "components/common/Button";
import Link from "next/link";
import { Checkbox } from "antd";

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
              <Checkbox defaultChecked={true} />
            </div>
            <div className="flex justify-between">
              <p className={styles.itemCheck}>
                <span className={styles.label}>X2 &nbsp; &nbsp;</span>
                Nón lá
              </p>
              <Checkbox defaultChecked={true} />
            </div>
            <div className="flex justify-between">
              <p className={styles.itemCheck}>
                <span className={styles.label}>X2 &nbsp; &nbsp;</span>
                Vải
              </p>
              <Checkbox defaultChecked={true} />
            </div>
            <div className="flex justify-between">
              <p className={styles.itemCheck}>
                <span className={styles.label}>X2 &nbsp; &nbsp;</span>
                Chén
              </p>
              <Checkbox defaultChecked={true} />
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
        <Button type="primary" style={{ width: "100%" }}>
          THANH TOÁN
        </Button>
        <div style={{ textAlign: "center" }}>
          <Link href="/shop">Quay lại mua sắm</Link>
        </div>
      </div>
    </div>
  );
}

TotalItemCard.propTypes = {
  order: PropTypes.object,
};

TotalItemCard.defaultProps = {
  order: {},
};
