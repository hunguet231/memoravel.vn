/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Input, Radio, Space, Alert, Col, Row, List } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import SubscribeForm from "../../components/SubscribeForm";
import { DataContext } from "../../store/GlobalState";
import Image from "next/image";
import styles from "../../styles/Sell.module.css";
import addCommas from "../../utils/addCommas";
import removeNonNumeric from "../../utils/removeNonNumeric";

export default function detailsOrder() {
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  const router = useRouter();

  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setOrderDetails(newArr);
  }, [orders]);

  if (!auth.user) return null;

  return (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div
          className={styles.inner}
          style={{
            width: "100%",
            maxWidth: "1200px",
            padding: "300px 15px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Button
              icon={<DoubleLeftOutlined />}
              type="primary"
              onClick={() => router.back()}
            >
              Quay lại
            </Button>
            {orderDetails.map((order) => (
              <>
                <h2
                  style={{
                    color: "#fff",
                    marginLeft: "20px",
                    marginBottom: "0",
                  }}
                >
                  Đơn hàng #{order._id}
                </h2>
              </>
            ))}
          </div>
          <div
            style={{
              textAlign: "left",
              background: "#fff",
              color: "#000",
              marginTop: "20px",
              padding: "20px 15px",
              borderRadius: "12px",
            }}
          >
            {orderDetails.map((order) => (
              <Row gutter={20} key={order._id}>
                <Col span={10}>
                  <h1 style={{ fontSize: "18px" }}>Thông tin giao hàng</h1>
                  <p>Họ & Tên: {order.fullname}</p>
                  <p>Số điện thoại: {order.phone}</p>
                  <p>Địa chỉ nhận hàng: {order.address}</p>
                  <br />
                  <h1 style={{ fontSize: "18px" }}>Phương thức thanh toán</h1>
                  <p>
                    Phương thức:{" "}
                    {order.method === "cash"
                      ? "Thanh toán khi giao hàng (COD)"
                      : "Thanh toán thẻ (ATM nội địa, Visa, MasterCard)"}
                  </p>
                  <p>Phí ship: 0 ₫</p>

                  <h3>Tổng thanh toán: {order.total} ₫</h3>
                  {order.delivered ? (
                    <Alert message="Đã giao hàng" type="success" showIcon />
                  ) : (
                    <Alert message="Chưa giao hàng" type="warning" showIcon />
                  )}
                </Col>
                <Col span={14}>
                  <h1 style={{ fontSize: "18px" }}>Sản phẩm đã đặt</h1>
                  <List
                    itemLayout="horizontal"
                    dataSource={order.cart}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Image
                              src={item.images && item.images[0]}
                              alt={item.title}
                              width="120"
                              height="120"
                              objectFit="cover"
                            />
                          }
                          title={
                            <a
                              href={`/products/${item._id}`}
                              style={{ fontSize: "16px" }}
                            >
                              {item.title}
                            </a>
                          }
                          description={
                            <div className={styles.description}>
                              <p>Đơn giá: {item.price} ₫</p>
                              <div className={styles.quantity}>
                                <p style={{ marginRight: "5px" }}>
                                  Số lượng mua: {item.quantity}
                                </p>
                              </div>
                              <p>
                                Thành tiền:
                                <span style={{ color: "#000" }}>
                                  {addCommas(
                                    item.quantity *
                                      parseInt(removeNonNumeric(item.price))
                                  )}{" "}
                                  ₫
                                </span>
                              </p>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </div>
      <div>
        <SubscribeForm />
        <Footer />
      </div>
    </>
  );
}
