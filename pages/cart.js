/* eslint-disable react-hooks/rules-of-hooks */
import {
  CaretDownFilled,
  CaretUpFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, InputNumber, List, Row } from "antd";
import Image from "next/image";
import { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import ShippingForm from "../components/ShippingForm";
import SubscribeForm from "../components/SubscribeForm";
import { decrease, deleteItem, increase } from "../store/Actions";
import { DataContext } from "../store/GlobalState";
import styles from "../styles/Cart.module.css";
import addCommas from "../utils/addCommas";
import { getData } from "../utils/fetchData";
import removeNonNumeric from "../utils/removeNonNumeric";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const data = cart.map((item) => {
    return {
      title: item.title,
      images: item.images[0],
      price: item.price,
      _id: item._id,
      in_stock: item.in_stock,
      quantity: item.quantity,
    };
  });

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("cart_item"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`products/${item._id}`);
          const { _id, title, price, images, in_stock } = res.product;
          if (in_stock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              in_stock,
              quantity: item.quantity > in_stock ? 1 : item.quantity,
            });
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };
      updateCart();
    }
  }, []);

  return cart.length === 0 ? (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <h1 style={{ fontSize: "18px", margin: "5px 5px 0", color: "#fff" }}>
            Giỏ hàng của bạn trống!
          </h1>
        </div>
      </div>
      <div>
        <SubscribeForm />
        <Footer />
      </div>
    </>
  ) : (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <Row gutter={20}>
            <Col
              span={14}
              style={{ backgroundColor: "#fff", borderRadius: "12px" }}
            >
              <h1 style={{ fontSize: "18px", margin: "5px 5px 0" }}>
                Giỏ hàng của bạn
              </h1>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Image
                          src={item.images}
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
                          <p>Còn lại: {item.in_stock} sản phẩm</p>
                          <p>Đơn giá: {item.price} ₫</p>
                          <div className={styles.quantity}>
                            <p style={{ marginRight: "5px" }}>
                              Chọn số lượng mua:
                            </p>
                            <div className={styles.quantityBtn}>
                              <Button
                                disabled={item.quantity === 1 ? true : false}
                                type="primary"
                                size="small"
                                icon={<CaretDownFilled />}
                                onClick={() =>
                                  dispatch(decrease(cart, item._id))
                                }
                              />
                              <InputNumber
                                value={item.quantity}
                                readOnly
                                height="24"
                                size="small"
                              />
                              <Button
                                disabled={
                                  item.quantity === item.in_stock ? true : false
                                }
                                type="primary"
                                size="small"
                                icon={<CaretUpFilled />}
                                onClick={() =>
                                  dispatch(increase(cart, item._id))
                                }
                              />
                            </div>
                            <Button
                              type="primary"
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={() =>
                                dispatch(deleteItem(cart, item._id, "ADD_CART"))
                              }
                            />
                          </div>
                          <p>
                            Thành tiền:{" "}
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
            <Col span={10}>
              <ShippingForm />
            </Col>
          </Row>
        </div>
      </div>
      <div>
        <SubscribeForm />
        <Footer />
      </div>
    </>
  );
};

export default Cart;
