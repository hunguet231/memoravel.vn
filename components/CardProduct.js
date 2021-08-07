import React from "react";
import { Row, Col, Button, Rate, Card } from "antd";
import styles from "../styles/ShopDetails.module.css";

export default function CardProduct() {
  return (
    <>
      <Card className={styles.productCard}>
        <h1>Bình gốm Bát tràng</h1>
        <h3 style={{ marginTop: "-10px" }}>Tinh hoa làng gốm</h3>
        <Rate disabled defaultValue={5} className={styles.rateStar} />
        <p>
          gốm Bát Tràng nhiều kiểu dáng và rất dễ cắm hoa. Men gốm màu sắc trang nhã sẽ cho bạn chọn
          lựa. Ngoài cắm hoa, bình hoa gốm sứ còn như một món đồ gốm trang trí cho không gian phòng
          khách thêm sang trọng, ấm cúng.
        </p>
        <div>
          <small>Màu sắc: Xanh ngọc</small>
          <br />
          <small>Kích thước: 50cm * 40cm * 40cm</small>
          <br />
          <small>Khối lượng: 1.5kg</small>
          <br />
          <small>Chất liệu: Gốm cao cấp</small>
          <br />
        </div>
        <div className={styles.productPrice}>
          <h1 style={{ marginBottom: "-10px" }}>Giá: 1.500.000</h1>
          <small>Đã bao gồm phí vat</small>
        </div>
        <Row gutter={6}>
          <Col span={24} sm={8}>
            <Button block={true} size="large" type="primary" className={styles.viewAR}>
              Trải nghiệm
              <span className={styles.ARtext}>AR</span>
            </Button>
          </Col>
          <Col span={24} sm={8}>
            <Button block={true} size="large" type="primary" className={styles.addToCart}>
              Thêm vào giỏ hàng
            </Button>
          </Col>
          <Col span={24} sm={8}>
            <Button block={true} size="large" type="primary" className={styles.buyNow}>
              Mua ngay
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
