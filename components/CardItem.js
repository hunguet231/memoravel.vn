import React from "react";
import "antd/dist/antd.css";
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
          cover={
            <Image alt="items" className={styles.cardImg} src="/bg-hero.jpg" />
          }
        >
          <div className={styles.cardBody}>
            <p className={styles.cardTitle}>Bình gốm Bát Tràng</p>
            <Row>
              <Col span={18}>
                <Rate disabled defaultValue={5} style={{ fontSize: "80%" }} />
              </Col>
              <Col span={6} sm={24}>
                <small className={styles.sold}>Đã bán: 500</small>
              </Col>
            </Row>
            <small>Chất liệu: Gốm cao cấp</small>
            <br />
            <small>Mệnh phù hơp: Kim, thủy</small>
            <Row justify="end">
              <Col xl={9} lg={11} className={styles.price}>
                Giá: 1.500.000
              </Col>
            </Row>
          </div>
        </Card>
      </Space>
    </div>
  );
}
