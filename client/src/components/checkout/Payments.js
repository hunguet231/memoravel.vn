import { Radio, Space } from "antd";
import React, { useState } from "react";
import styles from "styles/Payments.module.scss";

const Payments = () => {
  const [value, setValue] = useState("cash");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={"cash"} defaultChecked>
            <p className={styles.labelCheckbox}>Thanh toán khi nhận hàng</p>
            <div className="flex items-center">
              {/* <div className={styles.shippingPartner}>Giao hàng tiết kiệm </div> */}
              {/* <div className={styles.shippingPrice}>30.000 vnđ</div> */}
            </div>

            {/* <div className={styles.shippingTime}>
              Nhận hàng vào 15 Th12 - 25 Th12
            </div> */}
          </Radio>
          {/* <Radio value={"momo"} disabled>
            <p className={styles.labelCheckbox}>Thanh toán bằng ví điện tử</p>
          </Radio>
          <Radio value={"credit"} disabled>
            <p className={styles.labelCheckbox}>
              Thanh toán bằng thẻ tín dụng/ghi nợ
            </p>
          </Radio> */}
        </Space>
      </Radio.Group>
    </>
  );
};

export default Payments;
