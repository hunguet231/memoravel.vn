import { Button, Form, Input, Radio, Space, message } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobalState";
import addCommas from "../utils/addCommas";
import removeNonNumeric from "../utils/removeNonNumeric";
import styles from "../styles/ShippingForm.module.css";
import { postData } from "../utils/fetchData";

export default function ShippingForm() {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const [total, setTotal] = useState(0);
  const [method, setMethod] = useState("");

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((acc, cur) => {
        return acc + cur.quantity * parseInt(removeNonNumeric(cur.price));
      }, 0);
      setTotal(addCommas(res));
    };
    getTotal();
  }, [cart]);

  const onFinish = async (values) => {
    const { fullname, address, phone, method } = values;

    const res = await postData(
      "orders",
      { fullname, address, phone, cart, method, total },
      auth.token
    );

    if (res.err) return message.error(res.err);

    dispatch({ type: "ADD_CART", payload: [] });

    return message.success(res.msg);
  };

  return (
    <div className={styles.shippingForm}>
      <Form name="basic" onFinish={onFinish} autoComplete="on">
        <h1 style={{ fontSize: "18px" }}>Thông tin giao hàng</h1>
        <Form.Item
          name="fullname"
          rules={[
            {
              required: true,
              message: "Hãy nhập Họ & Tên!",
            },
          ]}
        >
          <Input placeholder="Họ & Tên" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Hãy nhập SĐT!",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Hãy nhập địa chỉ!",
            },
          ]}
        >
          <Input placeholder="Địa chỉ nhận hàng" />
        </Form.Item>

        <h1 style={{ fontSize: "18px" }}>Phương thức thanh toán</h1>

        <Form.Item
          name="method"
          rules={[
            {
              required: true,
              message: "Hãy chọn phương thức thanh toán!",
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => setMethod(e.target.value)}
            value={method}
          >
            <Space direction="vertical">
              <Radio value={"cash"}>Thanh toán khi giao hàng (COD)</Radio>
              <Radio value={"card"}>
                Thanh toán thẻ (ATM nội địa, Visa, MasterCard)
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <p>Phí ship: 0 ₫</p>

        <h3>Tổng thanh toán: {total} ₫</h3>

        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Hoàn tất đơn hàng
        </Button>
      </Form>
    </div>
  );
}
