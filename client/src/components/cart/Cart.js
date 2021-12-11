/* eslint-disable react/react-in-jsx-scope */
import { Checkbox, Col, Row } from "antd";
import styles from "styles/Cart.module.scss";
import CartItem from "./CartItem";
import TotalItemCard from "./TotalItemCard";

export default function Cart() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.container}>
          <h1 className="heading heading-primary">Giỏ hàng</h1>
          <Row gutter={12}>
            <Col xs={24} lg={17}>
              <div className={styles.wrapperCheckbox}>
                <Checkbox>&nbsp; Chọn tất cả</Checkbox>
              </div>
              <div className={styles.card}>
                <CartItem />
              </div>
              <div className={styles.card}>
                <CartItem />
              </div>
              <div className={styles.card}>
                <CartItem />
              </div>
              <div className={styles.card}>
                <CartItem />
              </div>
            </Col>
            <Col xs={24} lg={7}>
              <div className={styles.cardCode}>
                <h3 className={styles.headingCard}>Bạn có phiếu giảm giá ?</h3>
                <input
                  type="text"
                  placeholder="Nhập email"
                  className={styles.input}
                />
                <div className="flex justify-between">
                  <div>
                    <div className="text-start">Giảm</div>
                    <p className={styles.priceSale}>1.000.000 vnđ</p>
                  </div>
                  <div className="text-start">
                    <button className="button button-apply">Áp dụng</button>
                  </div>
                </div>
              </div>
              <TotalItemCard />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
