import React from "react";
import { Row, Col, Button, Rate, Card } from "antd";
import ReactHtmlParser from "react-html-parser";
import styles from "../styles/ShopDetails.module.css";
import { useState } from "react";

export default function CardProduct({ product, toggleViewAR }) {
  const [viewAR, setViewAR] = useState(true);

  const toggleAR = () => {
    setViewAR(!viewAR);
    toggleViewAR(viewAR);
  };
  return (
    <>
      <Card className={styles.productCard}>
        <h1>{product.title}</h1>
        <Rate disabled defaultValue={5} className={styles.rateStar} />
        <p>{ReactHtmlParser(product.details)}</p>
        <div className={styles.productPrice}>
          <h1 style={{ marginBottom: "-10px" }}>Giá: {product.price}</h1>
          <small>Đã bao gồm phí vat</small>
        </div>
        <Row gutter={6}>
          <Col span={24} sm={8}>
            <Button
              onClick={toggleAR}
              block={true}
              size="large"
              type="primary"
              className={styles.viewAR}
            >
              Trải nghiệm
              <span className={styles.ARtext}>AR</span>
            </Button>
          </Col>
          <Col span={24} sm={8}>
            <Button
              block={true}
              size="large"
              type="primary"
              className={styles.addToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </Col>
          <Col span={24} sm={8}>
            <Button
              block={true}
              size="large"
              type="primary"
              className={styles.buyNow}
            >
              Mua ngay
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
