/* eslint-disable no-unused-vars */
import {
  CaretDownFilled,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Col, Dropdown, Menu, message, Modal, Row } from "antd";
import axios from "axios";
import OrderedList from "components/cart/OrderedList";
import TotalItemCart from "components/cart/TotalItemCard";
import { ApiConstant } from "const";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "styles/Checkout.module.scss";
import { DataContext } from "../../../store/GlobalState";
import CheckoutForm from "./CheckoutForm";
import Payments from "./Payments";
import CartEmpty from "components/cart/CartEmpty";
import { emptyCart } from "../../../store/Actions";

export default function Order() {
  const [savedAddress, setSavedAddress] = useState([]);
  const { state, dispatch } = useContext(DataContext);
  const [currAddress, setCurrAddress] = useState("");
  const { shipping_address, cart } = state;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [structedCart, setStructedCart] = useState(() => {
    const structed = cart.reduce((acc, cartItem) => {
      acc[cartItem.shop.name] = acc[cartItem.shop.name] || [];
      acc[cartItem.shop.name].push(cartItem);
      return acc;
    }, {});
    return structed;
  });

  // create order code
  const getOrderCode = () => {
    const now = new Date(Date.now());
    return (
      "M" +
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString() +
      now.getDate().toString() +
      now.getMilliseconds().toString()
    );
  };

  const fetchShipment = async (dataBody) => {
    const url = ApiConstant.BASE_URL + ApiConstant.SHIPMENT_FEE;
    const { data } = await axios.post(url, dataBody);
    return data?.fee?.fee;
  };

  useEffect(() => {
    const savedAdd = localStorage.getItem("memoravel_saved_address");
    if (savedAdd) {
      setSavedAddress(JSON.parse(savedAdd));
    }

    if (currAddress) {
      // cart maybe changes
      const structed = cart.reduce((acc, cartItem) => {
        acc[cartItem.shop.name] = acc[cartItem.shop.name] || [];
        acc[cartItem.shop.name].push(cartItem);
        return acc;
      }, {});

      // calculate ship fee
      Promise.allSettled(
        Object.entries(structed).map(async ([key, val]) => {
          const totalWeight = val.reduce((acc, product) => {
            const weight =
              parseInt(JSON.parse(product.details).weight) * product.quantity;
            return acc + weight;
          }, 0);

          // for fragile product
          const hasTags = val.some((product) => product?.fragile === true);

          const dataBody = {
            pick_province: val[0].shop.shop_address.city,
            pick_district: val[0].shop.shop_address.district,
            province: currAddress.city,
            district: currAddress.district,
            weight: totalWeight,
            deliver_option: "none",
            tags: hasTags ? [1] : "",
          };

          const fee = await fetchShipment(dataBody);
          if (fee) {
            structed[key].fee = fee;
            structed[key].delivery = true;
          } else {
            structed[key].delivery = true;
          }
          return structed;
        })
      ).then(([result]) => {
        setStructedCart(result?.value);
      });
    }
  }, [currAddress, cart]);

  const createOrder = async (dataBody) => {
    const url = ApiConstant.BASE_URL + ApiConstant.SHIPMENT_ORDER;
    const { data } = await axios.post(url, dataBody);
    if (data.success) {
      return { order: data.order };
    } else return data.message;
  };

  // create orders
  const onCheckoutButtonClick = (isClick) => {
    if (isClick) {
      setLoading(true);
      let orderLabels = [];
      Promise.allSettled(
        Object.entries(structedCart).map(async ([key, val]) => {
          if (val.delivery) {
            // for fragile product
            const hasTags = val.some((product) => product?.fragile === true);

            const totalValue = val.reduce((acc, product) => {
              const value =
                parseInt(product.price.replaceAll(".", "")) * product.quantity;
              return acc + value;
            }, 0);

            const dataBody = {
              products: val.map((product) => ({
                name: product.name,
                weight: parseFloat(
                  Math.round(
                    (parseInt(JSON.parse(product.details).weight) / 1000) * 10
                  ) / 10
                ),
                product_code: "",
                quantity: product.quantity,
                price: parseInt(product.price.replaceAll(".", "")),
              })),
              order: {
                id: getOrderCode(),
                pick_name: JSON.parse(val[0].shop.details).owner,
                pick_money: totalValue,
                pick_address: val[0].shop.shop_address.address_details,
                pick_province: val[0].shop.shop_address.city,
                pick_district: val[0].shop.shop_address.district,
                pick_ward: val[0].shop.shop_address.ward,
                pick_tel: JSON.parse(val[0].shop.details).phone,
                name: currAddress.full_name,
                address: currAddress.address_details,
                province: currAddress.city,
                district: currAddress.district,
                ward: currAddress.ward,
                hamlet: "Khác",
                tel: currAddress.phone,
                value: totalValue,
                tags: hasTags ? [1] : "",
                note: "",
              },
            };

            const orderResponse = await createOrder(dataBody);
            orderLabels.push(orderResponse.order.label);
            return orderResponse;
          }
        })
      ).then(([result]) => {
        setLoading(false);
        console.log([result]);
        router.push("/order/thank-you");

        // save orders to localStorage
        const ordersFromLocalStorage =
          JSON.parse(localStorage.getItem("ordered_list")) || [];
        localStorage.setItem(
          "ordered_list",
          JSON.stringify([...ordersFromLocalStorage, ...orderLabels])
        );

        // empty cart
        dispatch(emptyCart());
        localStorage.removeItem("cart_item");
      });
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
              className={styles.deleteAdressBtn}
              style={{
                color: "red",
                background: "#f2f2f2",
                padding: "3px",
                borderRadius: "5px",
                width: "max-content",
              }}
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
        {cart.length > 0 ? (
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
                  <p className={styles.addAdressBtn} style={{ width: "100%" }}>
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
                <div className={styles.section}>2. Phương thức thanh toán</div>
                <br />
                <Payments />
                <div style={{ marginTop: "20px" }}>
                  <OrderedList structedCart={structedCart} />
                </div>
              </Col>
              <Col xs={24} lg={7}>
                <TotalItemCart
                  loading={loading}
                  structedCart={structedCart}
                  disabled={!currAddress || cart.length === 0}
                  onCheckoutButtonClick={onCheckoutButtonClick}
                />
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
