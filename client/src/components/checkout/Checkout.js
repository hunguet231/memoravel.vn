import {
  CaretDownFilled,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Col, Dropdown, Menu, message, Modal, Row } from "antd";
import OrderedList from "components/cart/OrderedList";
import TotalItemCart from "components/cart/TotalItemCard";
import React, { useContext, useEffect, useState } from "react";
import styles from "styles/Checkout.module.scss";
import { DataContext } from "../../../store/GlobalState";
import CheckoutForm from "./CheckoutForm";
import Payments from "./Payments";

export default function Order() {
  const [savedAddress, setSavedAddress] = useState([]);
  const { state } = useContext(DataContext);
  const [currAddress, setCurrAddress] = useState("");
  const { shipping_address, cart, shipments } = state;
  const [visible, setVisible] = useState(false);

  // const structedCart = cart.reduce((acc, cartItem) => {
  //   acc[cartItem.shop.name] = acc[cartItem.shop.name] || [];
  //   acc[cartItem.shop.name].push(cartItem);
  //   return acc;
  // }, {});

  useEffect(() => {
    const savedAdd = localStorage.getItem("memoravel_saved_address");
    if (savedAdd) {
      setSavedAddress(JSON.parse(savedAdd));
    }
    // change shipments
    // Object.entries(structedCart).map(([key, value]) => {
    //   const pick_province = value[0].shop.city;
    //   const pick_district = value[0].shop.district;
    //   const weight = 1000;
    //   const deliver_option = "none";
    //   const fee =
    //     currAddress &&
    //     fetchShipment(
    //       "Hà Nội",
    //       "Quận Cầu Giấy",
    //       currAddress.city,
    //       currAddress.district,
    //       weight,
    //       deliver_option
    //     );
    //   console.log(shipments, fee, delivers);
    // });
  }, [currAddress]);

  const onCheckoutButtonClick = (isClick) => {
    if (isClick) {
      // const orders = Object.entries(structedCart).map(([key, value]) => ({
      // }))
      alert("OK");
    }
  };

  const handleOk = () => {
    if (
      !shipping_address.full_name ||
      !shipping_address.phone ||
      !shipping_address.city ||
      !shipping_address.district ||
      !shipping_address.ward ||
      !shipping_address.address_details
    ) {
      return message.error("Hãy nhập đủ thông tin!");
    } else {
      setCurrAddress(shipping_address);
      localStorage.setItem(
        "memoravel_saved_address",
        JSON.stringify([...savedAddress, shipping_address])
      );
      setVisible(false);
    }
  };

  const handleMenuClick = (item) => {
    setCurrAddress(JSON.parse(item.key));
  };

  const handleDeleteAdd = (e, indexVal) => {
    e.stopPropagation();
    const newAddress = savedAddress.filter(
      (address, index) => index !== indexVal
    );
    setSavedAddress(newAddress);
    localStorage.setItem("memoravel_saved_address", JSON.stringify(newAddress));
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {savedAddress.length > 0 ? (
        savedAddress.map((address, index) => (
          <Menu.Item key={JSON.stringify(address)}>
            <p className={styles.addAdressBtn}>
              {`${address.full_name}, ${address.phone}`}
              <br />
              {`${address.address_details}, ${address.ward}, ${address.district}, ${address.city}`}
            </p>
            <p
              className={styles.addAdressBtn}
              style={{ color: "red" }}
              onClick={(e) => handleDeleteAdd(e, index)}
            >
              <DeleteOutlined /> Xoá địa chỉ
            </p>
          </Menu.Item>
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

              {currAddress && (
                <p className={styles.addAdressBtn}>
                  {`${currAddress.full_name}, ${currAddress.phone}`}
                  <br />
                  {`${currAddress.address_details}, ${currAddress.ward}, ${currAddress.district}, ${currAddress.city}`}
                </p>
              )}

              <p
                className={styles.addAdressBtn}
                onClick={() => setVisible(true)}
              >
                {" "}
                <PlusCircleOutlined style={{ marginRight: "5px" }} />
                Thêm địa chỉ mới
              </p>
              <Modal
                title="Thêm địa chỉ nhận hàng"
                centered
                visible={visible}
                onOk={handleOk}
                onCancel={() => setVisible(false)}
                width={1000}
              >
                <CheckoutForm />
              </Modal>
              <div className={styles.section}>
                2. Chọn phương thức thanh toán
              </div>
              <br />
              <Payments />
              <div style={{ marginTop: "20px" }}>
                <OrderedList />
              </div>
            </Col>
            <Col xs={24} lg={7}>
              <TotalItemCart
                disabled={
                  !currAddress || cart.length === 0 || shipments.length === 0
                }
                onCheckoutButtonClick={onCheckoutButtonClick}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
