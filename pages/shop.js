import React, { useState, useCallback, useEffect } from "react";
import CardItem from "../components/CardItem";
import styles from "../styles/Shop.module.css";
import "antd/dist/antd.css";
import { Row, Col, List, Collapse } from "antd";

export default function shop() {
  const data = ["Top bán chạy", "Gốm Bát Tràng", "Vải", "Chiếu cói", "Nón"];
  const { Panel } = Collapse;

  return (
    <div style={{ backgroundColor: "#2c2c2c" }}>
      <h1>Navbar</h1>
      <div className={styles.container}>
        <Row gutter={8}>
          <Col sm={5}>{/*Make responsive */}</Col>
          <Col sm={19}>
            <h1 className={styles.brandName}>MEMORAVEL</h1>
            <h1 className={styles.shopTitle}>SHOP</h1>
            <h2 className={styles.subTitle}>Trải nghiệm mua sắm cùng Memoravel</h2>
          </Col>
          <Col sm={5} xs={24}>
            <Collapse defaultActiveKey={1} ghost>
              <Panel key="1" header={<span className={styles.headerList}>Danh mục</span>}>
                <List
                  size="large"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item style={{ border: "none", padding: "16px 0" }}>
                      <a href="*">{item}</a>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          </Col>
          <Col sm={19}>
            <Row justify="space-between" className={styles.cardContainer}>
              <Col xl={8} md={12} className={styles.item}>
                <CardItem />
              </Col>
              <Col xl={8} md={12} className={styles.item}>
                <CardItem />
              </Col>
              <Col xl={8} md={12} className={styles.item}>
                <CardItem />
              </Col>
              <Col xl={8} md={12} className={styles.item}>
                <CardItem />
              </Col>
              <Col xl={8} md={12} className={styles.item}>
                <CardItem />
              </Col>
              <Col xl={8} md={12} className={styles.item}>
                <CardItem />
              </Col>
              <Col xl={8} md={12} className={styles.item}>
                <CardItem />
              </Col>
              <Col xl={8} md={12} className={styles.item}>
                <CardItem />
              </Col>
              <Col xl={8} md={12} className={styles.item}>
                <CardItem />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
