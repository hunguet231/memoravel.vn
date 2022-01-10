/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Radio, Slider, Space } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import styles from "styles/ShopFilter.module.scss";
import numberWithDots from "utils/addDotsNumber";
import { productTypes } from "utils/productTypes";

const Filter = ({ fetchProducts, setSearch, setPage }) => {
  const [value, setValue] = useState("");

  const onDataChange = (e) => {
    return setValue(e.target.value);
  };

  const onSearchText = () => {
    setSearch(value);
    setPage(1);
    fetchProducts(1, value);
  };

  React.useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
        setSearch(value);
        setPage(1);
        fetchProducts(1, value);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

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
        <button
          className="button"
          style={{ width: "100%" }}
          onClick={onSearchText}
        >
          Tìm kiếm
        </button>
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
