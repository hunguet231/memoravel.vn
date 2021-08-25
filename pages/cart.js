import Head from "next/head";
import { useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { increase, decrease } from "../store/Actions";
import { List, Avatar, Button, InputNumber, Row, Col } from "antd";
import { CaretUpFilled, CaretDownFilled, DeleteOutlined } from "@ant-design/icons";
import ShippingForm from "../components/ShippingForm";
import styles from "../styles/Cart.module.css";
import { getData } from "../utils/fetchData";

const cart = () => {
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
          <h1 style={{ color: "#fff" }}>Giỏ hàng trống</h1>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <Row gutter={8}>
            <Col span={12} style={{ backgroundColor: "#fff" }}>
              <h1>Cart, giỏ hàng</h1>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.images} />}
                      title={<a href={`/products/${item._id}`}>{item.title}</a>}
                      description={
                        <>
                          <h3>Số lượng hàng trên kệ: {item.in_stock}</h3>
                          <h3>Thành tiền: {item.quantity * item.price}</h3>
                          <div>
                            Số lượng hàng trong giỏ:
                            <Button
                              disabled={item.quantity === 1 ? true : false}
                              type="primary"
                              size="small"
                              icon={<CaretDownFilled />}
                              onClick={() => dispatch(decrease(cart, item._id))}
                            />
                            <InputNumber value={item.quantity} readOnly size="small" />
                            <Button
                              disabled={item.quantity === item.in_stock ? true : false}
                              type="primary"
                              size="small"
                              icon={<CaretUpFilled />}
                              onClick={() => dispatch(increase(cart, item._id))}
                            />{" "}
                            <Button type="primary" size="small" icon={<DeleteOutlined />} />
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <ShippingForm />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default cart;
