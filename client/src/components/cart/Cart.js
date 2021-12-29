/* eslint-disable react/react-in-jsx-scope */
import { Checkbox, Col, Row } from "antd";
import styles from "styles/Cart.module.scss";
import CartItem from "./CartItem";
import CardCode from "./CardCode";
import TotalItemCard from "./TotalItemCard";

export default function Cart() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.container}>
          <h1 className="heading heading-section">Giỏ hàng</h1>
          <Row gutter={12}>
            <Col xs={24} lg={17}>
              <div className={styles.wrapperCheckbox}>
                <Checkbox>&nbsp; Chọn tất cả</Checkbox>
              </div>
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
            </Col>
            <Col xs={24} lg={7}>
              <CardCode />
              <TotalItemCard />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
