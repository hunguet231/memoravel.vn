import { CaretDownFilled } from "@ant-design/icons";
import { Col, Dropdown, Menu, Row } from "antd";
import TotalItemCart from "components/cart/TotalItemCard";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "styles/Checkout.module.scss";
import CheckoutForm from "./CheckoutForm";
import Payments from "./Payments";

export default function Order() {
  const [savedAddress, setSavedAddress] = useState([]);
  useEffect(() => {
    setSavedAddress(JSON.parse(localStorage.getItem("shipping_address")) || []);
  }, []);

  const onCheckoutButtonClick = (isClick) => {
    if (isClick) {
      alert("OK");
    }
  };

  const menu = (
    <Menu>
      {savedAddress.length > 0 ? (
        savedAddress.map((address) => (
          <Menu.Item key={address.id}>{address.address}</Menu.Item>
        ))
      ) : (
        <Menu.Item key="0">Bạn chưa lưu địa chỉ nào</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.container}>
          <h1 className="heading heading-section heading-primary">
            Thanh toán & đặt hàng
          </h1>
          <Row gutter={10}>
            <Col xs={24} lg={17}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <div className={styles.section}>
                  <p>1. Địa chỉ giao hàng</p>
                  <p className={styles.subSection}>
                    Chọn địa chỉ đã lưu &nbsp;
                    <CaretDownFilled />
                  </p>
                </div>
              </Dropdown>
              <CheckoutForm />
              <div className={styles.section}>
                2. Chọn phương thức thanh toán
              </div>
              <br />
              <Payments />
            </Col>
            <Col xs={24} lg={7}>
              <TotalItemCart onCheckoutButtonClick={onCheckoutButtonClick} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
