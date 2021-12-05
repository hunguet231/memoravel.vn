import { Checkbox, Form } from "antd";
import React from "react";
import styles from "../../styles/HomeFilter.module.scss";

const HomeFilter = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.triangle}></div>
      <Form onFinish={onFinish}>
        <div className={styles.row}>
          <div className={styles.divider}></div>
          <div className={styles.col}>
            <div className={styles.heading}>Giá tiền</div>
            <Form.Item name="price">
              <Checkbox.Group className={styles.listItems}>
                <Checkbox className={styles.checkbox} value="Tất cả">
                  Tất cả
                </Checkbox>
                <Checkbox className={styles.checkbox} value="0 - 100.000đ">
                  0 - 100.000đ
                </Checkbox>
                <Checkbox
                  className={styles.checkbox}
                  value="100.000đ - 500.000đ"
                >
                  100.000đ - 500.000đ
                </Checkbox>
                <Checkbox
                  className={styles.checkbox}
                  value="500.000đ - 1.000.000đ"
                >
                  500.000đ - 1.000.000đ
                </Checkbox>
                <Checkbox
                  className={styles.checkbox}
                  value="1.000.000đ - 2.000.000đ"
                >
                  1.000.000đ - 2.000.000đ
                </Checkbox>
                <Checkbox
                  className={styles.checkbox}
                  value="2.000.000đ - 4.000.000đ"
                >
                  2.000.000đ - 4.000.000đ
                </Checkbox>
                <Checkbox
                  className={styles.checkbox}
                  value="4.000.000đ - 10.000.000đ"
                >
                  4.000.000đ - 10.000.000đ
                </Checkbox>
                <Checkbox className={styles.checkbox} value="trên 10.000.000đ">
                  Trên 10.000.000đ
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className={styles.col}>
            <div className={styles.heading}>Loại sản phẩm</div>
            <Form.Item name="category">
              <Checkbox.Group className={styles.listItems}>
                <Checkbox className={styles.checkbox} value="Tất cả">
                  Tất cả
                </Checkbox>
                <Checkbox className={styles.checkbox} value="Bình">
                  Bình
                </Checkbox>
                <Checkbox className={styles.checkbox} value="Ấm chén">
                  Ấm chén
                </Checkbox>
                <Checkbox className={styles.checkbox} value="Đĩa">
                  Đĩa
                </Checkbox>
                <Checkbox className={styles.checkbox} value="Tranh">
                  Tranh
                </Checkbox>
                <Checkbox className={styles.checkbox} value="Quần áo">
                  Quần áo
                </Checkbox>
                <Checkbox className={styles.checkbox} value="Nội thất">
                  Nội thất
                </Checkbox>
                <Checkbox className={styles.checkbox} value="Trang trí">
                  Trang trí
                </Checkbox>
                <Checkbox className={styles.checkbox} value="Khác">
                  Khác
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className={styles.col}>
            <div className={styles.heading}>Nơi sản xuất</div>
            <Form.Item name="location">
              <Checkbox.Group className={styles.listItems}>
                <Checkbox
                  className={styles.checkbox}
                  value="Làng gốm Bát Tràng"
                >
                  Làng gốm Bát Tràng
                </Checkbox>
                <Checkbox className={styles.checkbox} value="Làng lụa Vạn Phúc">
                  Làng lụa Vạn Phúc
                </Checkbox>
                <Checkbox
                  className={styles.checkbox}
                  value="Làng tranh Đông Hồ"
                >
                  Làng tranh Đông Hồ
                </Checkbox>
                <Checkbox
                  className={styles.checkbox}
                  value="Làng mây tre đan Phú Vinh"
                >
                  Làng mây tre đan Phú Vinh
                </Checkbox>
              </Checkbox.Group>
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
