import React from "react";
import { Row, Col, Rate } from "antd";
import { RightCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import styles from "styles/ProductDetails.module.scss";

const Details = () => (
  <div>
    <p className={styles.headingDetails}>Chi tiết sản phẩm</p>
    <div className="flex justify-start">
      <p className={styles.label}>Chất liệu:</p>
      <p>Gốm sứ cao cấp</p>
    </div>
    <div className="flex justify-start">
      <p className={styles.label}>Kích thước:</p>
      <p>Cao: 60 cm | Dài: 60 cm | Rộng: 60 cm</p>
    </div>
    <div className="flex justify-start">
      <p className={styles.label}>Khối lượng:</p>
      <p>4kg</p>
    </div>
    <div className="flex justify-start">
      <p className={styles.label}>Hợp mệnh:</p>
      <p>Hỏa, Thổ, Kim</p>
    </div>
    <div className="flex justify-start">
      <p className={styles.label}>Nơi sản xuất:</p>
      <p>Làng gốm Bát Tràng</p>
    </div>
    <button className="button" style={{ marginLeft: "0" }}>
      <div className="flex justify-between items-center">
        <span className={styles.textAR}>Trải nghiệm hình ảnh sản phẩm thực tế</span>
        <RightCircleOutlined style={{ fontSize: "45px" }} />
      </div>
    </button>
  </div>
);

export default function ProductDetails() {
  return (
    <div className="wrapper">
      <Row>
        <Col span={24} lg={12}>
          <div className={styles.wrapImg}>
            <img src="images/binh-hoa-tai-loc.png" className={styles.img} />
          </div>
          <br />
          <div className="flex justify-between gap-1">
            <div className={styles.wrapImg}>
              <img src="images/binh-hoa-tai-loc.png" className={styles.subImg} />
            </div>
            <div className={styles.wrapImg}>
              <img src="images/binh-hoa-tai-loc.png" className={styles.subImg} />
            </div>
            <div className={styles.wrapMoreImg}>
              <img src="images/binh-hoa-tai-loc.png" className={styles.moreImg} />
              <p className={styles.textOverlay}>5+</p>
            </div>
          </div>
        </Col>
        <Col span={24} lg={10} offset={2}>
          <h1 className="heading heading-primary" style={{ fontSize: "45px", margin: "0" }}>
            Bình sứ Vạn Phúc
          </h1>
          <h3 className={styles.subHeading}>Mệnh hỏa, mệnh thổ</h3>
          <div className="flex justify-start items-center" style={{ marginBottom: "40px" }}>
            <span className={styles.rating}>
              4.5 &nbsp;
              <Rate disabled allowHalf defaultValue={4.5} style={{ color: "#F3692E" }} />
            </span>
            <div className={styles.divider} />
            <span className={styles.info}>15 Đánh giá </span>
            <div className={styles.divider} />
            <span className={styles.info}>350 Đã bán</span>
          </div>
          <h1 className="heading heading-section heading-primary">3.000.000.000 vnd</h1>
          <Details />
          <div style={{ marginTop: "20px" }}>
            <span>Số lượng:</span>
            <button className={styles.btnAmount}>+</button>
            <input type="tel" className={styles.inputAmount} />
            <button className={styles.btnAmount}>-</button>
          </div>
          <div className="flex justify-between gap-1">
            <button className={`button button-outline ${styles.buyBtn}`}>
              Thêm vào giỏ hàng <ShoppingCartOutlined />
            </button>
            <button className={`button ${styles.buyBtn}`}>Mua Ngay</button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
