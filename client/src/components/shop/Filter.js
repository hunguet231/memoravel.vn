/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Radio, Slider, Space } from "antd";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styles from "styles/ShopFilter.module.scss";
import numberWithDots from "utils/addDotsNumber";
import { productOrigins } from "utils/productOrigins";
import { productTypes } from "utils/productTypes";
import { changeFilter, search } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";

const Filter = ({ productsHot, setVisible }) => {
  const { state, dispatch } = useContext(DataContext);
  const { filter } = state;
  const [value, setValue] = useState({
    search: "",
    price: [0, 1000000],
    made_in: "",
    type: "",
  });

  const onSearchText = (e) => {
    e.preventDefault();
    dispatch(changeFilter({ ...filter, search: value.search }));
    setVisible(false);
  };

  const handleOriginChange = (value) => {
    dispatch(changeFilter({ ...filter, made_in: value }));
    setVisible(false);
  };

  const onChangePrice = () => {
    dispatch(changeFilter({ ...filter, price: value.price }));
    setVisible(false);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.section}>
        <form onSubmit={onSearchText}>
          <Input
            className={styles.input}
            name="search"
            value={value.search}
            onChange={(e) => setValue({ ...value, search: e.target.value })}
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
        </form>
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
          defaultValue={[0, 1000000]}
          min={0}
          value={value.price}
          onChange={(value) => setValue({ ...value, price: value })}
          max={1000000}
          step={10000}
        />
        <div className="flex justify-between items-center">
          <p>Khoảng</p>
          <p>
            {numberWithDots(value.price[0])}đ - {numberWithDots(value.price[1])}
            đ
          </p>
        </div>
        <button
          className="button"
          style={{ width: "100%" }}
          onClick={onChangePrice}
        >
          Áp dụng
        </button>
      </div>

      <div className={styles.section}>
        <div className={styles.heading}>Nơi sản xuất</div>
        <AutoComplete
          style={{ width: "100%" }}
          onSelect={handleOriginChange}
          options={productOrigins}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input
            className={styles.input}
            name="made_in"
            onChange={(value) => setValue({ ...value, made_in: value })}
            placeholder="Tìm nơi sản xuất"
            suffix={<SearchOutlined />}
          />
        </AutoComplete>
      </div>

      <div className={styles.section}>
        <div className={styles.heading}>Loại sản phẩm</div>
        <Radio.Group
          onChange={(e) =>
            dispatch(changeFilter({ ...filter, type: e.target.value }))
          }
          defaultValue={filter.type}
        >
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
        {productsHot.map((product) => (
          <Link href={`/product/${product.alias}`} key={product.id}>
            <div className={styles.productWrap}>
              <div className={styles.img}>
                <img src={product.images[0].image} alt={product.name} />
              </div>

              <div className={styles.info}>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productPrice}>{product.price}đ</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Filter;
