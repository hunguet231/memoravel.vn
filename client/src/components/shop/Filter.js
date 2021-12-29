/* eslint-disable no-unused-vars */
import React from "react";
import { Slider, Input, Radio, Space } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import numberWithDots from "utils/addDotsNumber";
import styles from "styles/ShopFilter.module.scss";
import { useState } from "react";
import { productTypes } from "utils/productTypes";
import Image from "next/image";

const Filter = () => {
  const [value, setValue] = useState("");

  const onDataChange = (e) => {};

  return (
    <div className={styles.filter}>
      <div className={styles.section}>
        <Input
          className={styles.input}
          name="name"
          onChange={onDataChange}
          placeholder="Tìm kiếm sản phẩm"
          suffix={<SearchOutlined />}
        />
      </div>

      <div className={styles.section}>
        <div className="flex justify-between items-center">
          <div className={styles.heading}>Chọn giá sản phẩm</div>
          <div className={styles.icon}>
            <FilterOutlined />
          </div>
        </div>
        <Slider
          tipFormatter={(value) => `${numberWithDots(value)}đ`}
          range
          min={0}
          max={500000}
          step={10000}
        />
        <div className="flex justify-between items-center">
          <p>Khoảng</p>
          <p>100.000đ - 500.000đ</p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.heading}>Nơi sản xuất</div>
        <Input
          className={styles.input}
          name="made_in"
          onChange={onDataChange}
          placeholder="Tìm nơi sản xuất"
          suffix={<SearchOutlined />}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.heading}>Loại sản phẩm</div>
        <Radio.Group onChange={onDataChange} defaultValue={value}>
          <Space direction="vertical">
            <Radio value={""}>
              <p className={styles.labelRadio}>Tất cả</p>
            </Radio>
            {productTypes.map((type) => (
              <Radio key={type.id} value={type.name}>
                <p className={styles.labelRadio}>{type.name}</p>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>

      <div className={styles.section}>
        <div className={styles.heading}>Sản phẩm nổi bật</div>
        <div className={styles.productWrap}>
          <Image
            className={styles.img}
            src="/images/gom-bat-trang.png"
            width={80}
            height={80}
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.productName}>Bình sứ Vạn phúc</div>
            <div className={styles.productPrice}>500.000đ</div>
          </div>
        </div>
        <div className={styles.productWrap}>
          <Image
            className={styles.img}
            src="/images/gom-bat-trang.png"
            width={80}
            height={80}
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.productName}>Bình sứ Vạn phúc</div>
            <div className={styles.productPrice}>500.000đ</div>
          </div>
        </div>
        <div className={styles.productWrap}>
          <Image
            className={styles.img}
            src="/images/gom-bat-trang.png"
            width={80}
            height={80}
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.productName}>Bình sứ Vạn phúc</div>
            <div className={styles.productPrice}>500.000đ</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
