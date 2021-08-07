import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Collapse, List, Pagination, Row } from "antd";
import Link from "next/link";
import React from "react";
import CardItem from "../components/CardItem";
import styles from "../styles/Shop.module.css";
import categories from "../utils/categories";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";

const { Panel } = Collapse;

const customExpandIcon = (props) => {
  if (props.isActive) {
    return <MinusOutlined style={{ color: "#fff" }} />;
  } else {
    return <PlusOutlined style={{ color: "#fff" }} />;
  }
};

export default function shop() {
  return (
    <div>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <Row gutter={8} justify="space-between">
            <Col sm={0} md={4}></Col>
            <Col xs={24} sm={20} justify="left">
              <h1 className={styles.brandName}>
                MEMORAVEL
                <br />
                <span className={styles.shopTitle}>SHOP</span>
              </h1>
              <h2 className={styles.subTitle}>
                Trải nghiệm mua sắm cùng Memoravel
              </h2>
            </Col>
            <Col xs={24} sm={24} md={4}>
              <Collapse
                defaultActiveKey={1}
                ghost
                expandIcon={(props) => customExpandIcon(props)}
              >
                <Panel
                  key="1"
                  header={<span className={styles.headerList}>Danh mục</span>}
                >
                  <List
                    size="large"
                    dataSource={categories}
                    renderItem={(category) => (
                      <List.Item
                        key={category.id}
                        style={{
                          fontSize: "15px",
                          border: "none",
                          padding: "16px 0",
                          color: "#fff",
                        }}
                      >
                        <Link href={`/danh-muc/${category.slug}`}>
                          {category.name}
                        </Link>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            </Col>
            <Col xs={24} sm={24} md={20}>
              <Row gutter={16}>
                <Col xs={24} sm={12} lg={8} xl={6} className={styles.item}>
                  <CardItem />
                </Col>
                <Col xs={24} sm={12} lg={8} xl={6} className={styles.item}>
                  <CardItem />
                </Col>
                <Col xs={24} sm={12} lg={8} xl={6} className={styles.item}>
                  <CardItem />
                </Col>
                <Col xs={24} sm={12} lg={8} xl={6} className={styles.item}>
                  <CardItem />
                </Col>
                <Col xs={24} sm={12} lg={8} xl={6} className={styles.item}>
                  <CardItem />
                </Col>
                <Col xs={24} sm={12} md={8} xl={6} className={styles.item}>
                  <CardItem />
                </Col>
                <Col xs={24} sm={12} md={8} xl={6} className={styles.item}>
                  <CardItem />
                </Col>
                <Col xs={24} sm={12} md={8} xl={6} className={styles.item}>
                  <CardItem />
                </Col>
              </Row>
              <Row justify="end" style={{ marginTop: "20px" }}>
                <Pagination defaultCurrent={1} total={50} />
              </Row>
            </Col>
          </Row>
        </div>
        <div>
          <SubscribeForm />
          <Footer />
        </div>
      </div>
    </div>
  );
}
