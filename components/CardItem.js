import { Card, Col, Image, Rate, Row } from "antd";
import React from "react";
import styles from "../styles/CardItem.module.css";

export default function CardItem() {
  return (
    <div>
      <Card
        className={styles.card}
        hoverable
        bordered={false}
        cover={
          <>
            <div className={styles.cardImg}>
              <Image preview={false} alt="items" src="/bg-hero.jpg" />
              <div className={styles.ar}>AR</div>
            </div>
          </>
        }
      >
        <div className={styles.cardBody}>
          <p className={styles.cardTitle}>Bình gốm Bát Tràng</p>
          <Row justify="space-between">
            <Col>
              <Rate disabled defaultValue={5} style={{ fontSize: "95%" }} />
            </Col>
            <Col>
              <small className={styles.sold}>Đã bán: 500</small>
            </Col>
          </Row>
          <div className={styles.summary}>
            <small>Chất liệu: Gốm cao cấp</small>
            <br />
            <small>Mệnh phù hơp: Kim, thủy</small>
          </div>
          <Row justify="end">
            <Col className={styles.price}>Giá: 1.500.000</Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}
