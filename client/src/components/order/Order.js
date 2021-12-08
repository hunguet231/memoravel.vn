import React from "react";
import styles from "styles/Order.module.scss";
import TotalItemCart from "components/cart/TotalItemCard";
import { Checkbox, Row, Col, Dropdown, Menu } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import OrderForm from "./OrderForm";

const menu = (
  <Menu>
    <Menu.Item key="0">Đại học Công nghệ, ĐHQGHN, 144 Xuân Thủy, Hà Nội</Menu.Item>
    <Menu.Item key="1">144 Thanh Xuân, Cầu Giấy, Hà Nội</Menu.Item>
  </Menu>
);

export default function Order() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.container}>
          <h1 className="heading heading-primary">Thanh toán & đặt hàng</h1>
          <Row gutter={12}>
            <Col xs={24} lg={17}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <div className={styles.section}>
                  <span>1. Địa chỉ giao hàng</span>
                  <p className={styles.subSection}>
                    Chọn địa chỉ đã lưu &nbsp;
                    <CaretDownFilled />
                  </p>
                </div>
              </Dropdown>
              <OrderForm />
              <div className={styles.section}>2. Chọn phương thức thanh toán</div>
              <br />
              <div>
                <Checkbox>
                  <h2 className={styles.labelCheckbox}>Thanh toán khi nhận hàng</h2>
                </Checkbox>
              </div>
              <div>
                <Checkbox>
                  <h2 className={styles.labelCheckbox}>Thanh toán bằng thẻ ngân hàng nội địa</h2>
                </Checkbox>
              </div>
              <div>
                <Checkbox>
                  <h2 className={styles.labelCheckbox}>Thanh toán bằng thẻ visa quốc tế</h2>
                </Checkbox>
              </div>
            </Col>
            <Col xs={24} lg={7}>
              <TotalItemCart order={true} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
