import { Form, Radio, Space } from "antd";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useState } from "react";
import { productOrigins } from "utils/productOrigins";
import { productTypes } from "utils/productTypes";
import { changeFilter } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";
import styles from "../../styles/HomeFilter.module.scss";

const HomeFilter = () => {
  const { state, dispatch } = useContext(DataContext);
  const { filter } = state;

  const router = useRouter();

  const [value, setValue] = useState({
    price: "",
    made_in: "",
    type: "",
  });

  const onFinish = () => {
    const price = value.price.split("-");
    dispatch(
      changeFilter({
        ...filter,
        type: value.type,
        made_in: value.made_in,
        price,
      })
    );
    router.push(`/shop`);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.triangle}></div>
      <Form onFinish={onFinish}>
        <div className={styles.row}>
          <div className={styles.divider}></div>
          <div className={styles.col}>
            <div className={styles.heading}>Giá tiền</div>
            <br />
            <Form.Item name="price">
              <Radio.Group
                value={value.price}
                onChange={(e) => {
                  setValue({ ...value, price: e.target.value });
                }}
                defaultValue={value.price}
              >
                <Space direction="vertical">
                  <Radio value={""}>
                    <p className={styles.checkbox}>Tất cả</p>
                  </Radio>
                  <Radio value={"0-100000"}>
                    <p className={styles.checkbox}>0 - 100.000đ</p>
                  </Radio>
                  <Radio value={"100000-500000"}>
                    <p className={styles.checkbox}>100.000đ - 500.000đ</p>
                  </Radio>
                  <Radio value={"500000-1000000"}>
                    <p className={styles.checkbox}>500.000đ - 1.000.000đ</p>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className={styles.col}>
            <div className={styles.heading}>Loại sản phẩm</div>
            <br />
            <Form.Item name="type">
              <Radio.Group
                value={value.type}
                onChange={(e) => {
                  setValue({ ...value, type: e.target.value });
                }}
                defaultValue={value.type}
              >
                <Space direction="vertical">
                  <Radio value={""}>
                    <p className={styles.checkbox}>Tất cả</p>
                  </Radio>
                  {productTypes.map((type) => (
                    <Radio key={type.id} value={type.name}>
                      <p className={styles.checkbox}>{type.name}</p>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className={styles.col}>
            <div className={styles.heading}>Nơi sản xuất</div>
            <br />
            <Form.Item name="made_in">
              <Radio.Group
                value={value.made_in}
                onChange={(e) => {
                  setValue({
                    ...value,
                    made_in: e.target.value === "Tất cả" ? "" : e.target.value,
                  });
                }}
                defaultValue={value.made_in}
              >
                <Space direction="vertical">
                  {productOrigins.map((type) => (
                    <Radio key={type.id} value={type.name}>
                      <p className={styles.checkbox}>{type.name}</p>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <button
                className={`${styles.button} button button-white`}
                type="submit"
              >
                Tìm kiếm
              </button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default HomeFilter;
