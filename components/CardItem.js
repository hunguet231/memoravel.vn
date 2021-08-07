import React from "react";
import { Space, Card, Row, Col, Rate, Image } from "antd";
import styles from "../styles/CardItem.module.css";

export default function CardItem() {
  return (
    <div>
      <Space direction="vertical">
        <Card
          className={styles.card}
          hoverable
          bordered={false}
          cover={<Image alt="items" className={styles.cardImg} src="/bg-hero.jpg" />}
        >
          <div className={styles.cardBody}>
            <p className={styles.cardTitle}>Bình gốm Bát Tràng</p>
            <Row>
              <Col span={24} sm={16} md={18}>
                <Rate disabled defaultValue={5} style={{ fontSize: "80%" }} />
              </Col>
              <Col span={24} sm={8} md={6}>
                <small className={styles.sold}>Đã bán: 500</small>
              </Col>
            </Row>
            <small>Chất liệu: Gốm cao cấp</small>
            <br />
            <small>Mệnh phù hơp: Kim, thủy</small>
            <Row justify="end">
              <Col sm={11} md={8} lg={9} className={styles.price}>
                Giá: 1.500.000
              </Col>
            </Row>
          </div>
        </Card>
      </Space>
    </div>
  );
}
