/* eslint-disable react/react-in-jsx-scope */
import { Col, Row } from "antd";
import { useContext } from "react";
import styles from "styles/Cart.module.scss";
import { DataContext } from "../../../store/GlobalState";
import CardCode from "./CardCode";
import OrderedList from "./OrderedList";
import TotalItemCard from "./TotalItemCard";
import CartEmpty from "./CartEmpty";

export default function Cart() {
  const { state } = useContext(DataContext);
  const { cart } = state;

  const structedCart = cart.reduce((acc, cartItem) => {
    acc[cartItem.shop.name] = acc[cartItem.shop.name] || [];
    acc[cartItem.shop.name].push(cartItem);
    return acc;
  }, {});

  return (
    <div className="wrapper">
      <div className="container">
        {cart.length > 0 ? (
          <div className={styles.container}>
            <h1 className="heading heading-section heading-primary">
              Giỏ hàng
            </h1>
            <Row gutter={12}>
              <Col xs={24} lg={17}>
                <OrderedList showCheckbox structedCart={structedCart} />
              </Col>
              <Col xs={24} lg={7}>
                <CardCode />
                <TotalItemCard />
              </Col>
            </Row>
          </div>
        ) : (
          <CartEmpty />
        )}
      </div>
    </div>
  );
}
