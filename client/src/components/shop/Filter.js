import React from "react";
import { Slider } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import numberWithDots from "utils/addDotsNumber";
import styles from "styles/ShopFilter.module.scss";

const Filter = () => {
  return (
    <div className={styles.filter}>
      <div className="flex justify-between items-center">
        <div className={styles.heading}>Chọn giá sản phẩm</div>
        <div style={styles.icon}>
          <FilterOutlined />
        </div>
      </div>
      <Slider
        tipFormatter={(value) => `${numberWithDots(value)}đ`}
        range
        min={100000}
        max={500000}
        defaultValue={[100000, 500000]}
        step={10000}
      />
    </div>
  );
};

export default Filter;
