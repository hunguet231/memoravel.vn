import React from "react";
import { Checkbox, Row, Col } from "antd";
import styles from "styles/CartItem.module.scss";
import { DeleteFilled } from "@ant-design/icons";

export default function CartItem() {
  return (
    <div className="wrapper">
      <div className={styles.wrapInfo}>
        <Checkbox />
        <img src="/images/gom-bat-trang.png" className={styles.img} />
        <Row style={{ width: "100%" }}>
          <Col xs={24} xl={8}>
            <p className={styles.nameProduct}>Bình sứ Vạn Phúc</p>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <div className={styles.wrapAmount}>
              <button className={styles.changeAmountBtn}>-</button>
              <input className={styles.inputAmount} type="number" />
              <button className={styles.changeAmountBtn}>+</button>
            </div>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <p className={styles.price}>300.000.000 vnđ</p>
          </Col>
        </Row>
        <button className={styles.deleteItem}>
          <DeleteFilled />
        </button>
      </div>
    </div>
  );
}
