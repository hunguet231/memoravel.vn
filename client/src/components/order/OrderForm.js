import React from "react";
import styles from "styles/OrderForm.module.scss";
import { Dropdown, Menu, Checkbox, Row, Col } from "antd";
import { CaretDownFilled } from "@ant-design/icons";

const province = (
  <Menu>
    <Menu.Item key="0">Hà Nội</Menu.Item>
    <Menu.Item key="1">Hòa Bình</Menu.Item>
    <Menu.Item key="2">Hải Dương</Menu.Item>
    <Menu.Item key="3">Thanh Hóa</Menu.Item>
  </Menu>
);

const city = (
  <Menu>
    <Menu.Item key="0">City 1</Menu.Item>
    <Menu.Item key="1">City 2</Menu.Item>
    <Menu.Item key="2">City 3</Menu.Item>
    <Menu.Item key="3">City 4</Menu.Item>
  </Menu>
);

const village = (
  <Menu>
    <Menu.Item key="0">Village 1</Menu.Item>
    <Menu.Item key="1">Village 2</Menu.Item>
    <Menu.Item key="2">Village 3</Menu.Item>
    <Menu.Item key="3">Village 4</Menu.Item>
  </Menu>
);

export default function OrderForm() {
  return (
    <div className="wrapper">
      <div className={styles.container}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <div className={styles.wrapField}>
              <p>
                Họ và tên <span style={{ color: "red" }}>&#128952;</span>
              </p>
              <input type="text" required className={styles.input} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className={styles.wrapField}>
              <p>
                Số điện thoại <span style={{ color: "red" }}>&#128952;</span>
              </p>
              <input type="number" required className={styles.input} />
            </div>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} lg={8}>
            <div className={styles.wrapField}>
              <p>
                Tỉnh/Thành phố <span style={{ color: "red" }}>&#128952;</span>
              </p>
              <Dropdown overlay={province} trigger={["click"]}>
                <div>
                  <input type="text" required className={styles.input} />
                  <CaretDownFilled className={styles.iconDropdown} />
                </div>
              </Dropdown>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div className={styles.wrapField}>
              <p>
                Quận/Huyện <span style={{ color: "red" }}>&#128952;</span>
              </p>
              <Dropdown overlay={city} trigger={["click"]}>
                <div>
                  <input type="text" required className={styles.input} />
                  <CaretDownFilled className={styles.iconDropdown} />
                </div>
              </Dropdown>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div className={styles.wrapField}>
              <p>
                Phường/Xã <span style={{ color: "red" }}>&#128952;</span>
              </p>
              <Dropdown overlay={village} trigger={["click"]}>
                <div>
                  <input type="text" required className={styles.input} />
                  <CaretDownFilled className={styles.iconDropdown} />
                </div>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <div className={styles.wrapField}>
          <p>
            Địa chỉ <span style={{ color: "red" }}>&#128952;</span>
          </p>
          <textarea type="text" required className={styles.inputTextarea} />
        </div>
        <Checkbox>Lưu địa chỉ thanh toán</Checkbox>
      </div>
    </div>
  );
}
