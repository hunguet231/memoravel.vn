/* eslint-disable react/react-in-jsx-scope */
import { Col, Row } from "antd";
import styles from "styles/Cart.module.scss";
import CardCode from "./CardCode";
import OrderedList from "./OrderedList";
import TotalItemCard from "./TotalItemCard";

export default function Cart() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.container}>
          <h1 className="heading heading-section heading-primary">Giỏ hàng</h1>
          <Row gutter={12}>
            <Col xs={24} lg={17}>
              <OrderedList showCheckbox />
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
