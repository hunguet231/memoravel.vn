import React from "react";
import { Row, Col, Avatar, Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "styles/RatingCard.module.scss";

export default function RatingCard() {
  return (
    <div className="wrapper">
      <div className={styles.wrapCard}>
        <div className="flex justify-start">
          <div>
            <Avatar size={48} icon={<UserOutlined />} />
          </div>
          <div className={styles.wrapInfo}>
            <div className="flex justify-between">
              <span className={styles.customerName}>Trần Thị Bích Phượng</span>
              <Rate disabled allowHalf defaultValue={4.5} style={{ color: "#F3692E" }} />
            </div>
            <p className={styles.dateRating}>2 tháng 10 năm 2021 at 06.30 pm</p>
            <div className={styles.wrapImg}>
              <div>
                <img src="images/binh-hoa-tai-loc.png" className={styles.img} />
              </div>
              <div>
                <img src="images/binh-hoa-tai-loc.png" className={styles.img} />
              </div>
              <div>
                <img src="images/binh-hoa-tai-loc.png" className={styles.img} />
              </div>
              <div>
                <img src="images/binh-hoa-tai-loc.png" className={styles.img} />
              </div>
            </div>
            <p className={styles.comment}>
              Sản phẩm rất tuyệt, vợ tôi cực kì thích nó, từ khi mua nó thì chúng tôi đã kiếm được
              rất nhiều tiền, tôi sẽ mua tặng cho bạn bè, cảm ơn shop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
