import React from "react";
import { Card, Image, Row, Col, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "../styles/ProductCard.module.scss";

export default function ProductCard() {
  return (
    <>
      {/* <Row gutter={8}>
        <Col span={6} />
        <Col span={6}> */}
      <Card
        className={styles.cardWrapper}
        cover={
          <Image
            style={{ borderRadius: "10px" }}
            src="/images/gom-bat-trang.png"
            preview={false}
            width="100%"
          />
        }
      >
        <div className={styles.overlayAR}>
          <div className="flex justify-end">
            <div className={styles.buttonAR}>AR</div>
          </div>
        </div>
        <h2 className={styles.productName}>Bình sứ Vạn Phúc</h2>
        <p className={styles.description}>Mệnh hỏa, mệnh thổ</p>
        <div className="flex justify-between">
          <Rate disabled value={5} className={styles.rate} />
          <p className={styles.sold}>12.4K đã bán</p>
        </div>
        <div className="flex justify-between">
          <div className={styles.cartButton}>
            <ShoppingCartOutlined />
          </div>
          <h1 className={styles.price}>300.000đ</h1>
        </div>
      </Card>
      {/* </Col>
        <Col span={6} />
        <Col span={6} />
      </Row> */}
    </>
  );
}
