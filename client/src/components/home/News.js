import BoxImage from "components/common/BoxImage";
import Button from "components/common/Button";
import Tag from "components/common/Tage";
import React from "react";
import styles from "../../styles/NewsHome.module.scss";

const News = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.news}>
          <div className="flex items-center justify-between">
            <h1 className="heading heading-section">Tin tức mới nhất</h1>
            <p className={styles.more}>Xem thêm</p>
          </div>
          <div className={styles.boxes}>
            <BoxImage
              className={styles.box1}
              imgUrl={"/images/new1.png"}
              subHeading={
                <>
                  <Tag text="TIPS" /> <span>15/10/2021</span>{" "}
                </>
              }
              heading={<>5 bước trang trí nhà hợp phong thủy</>}
              textMore={"Đọc thêm"}
            />
            <BoxImage
              className={styles.box2}
              imgUrl={"/images/new2.png"}
              subHeading={
                <>
                  <Tag text="TIPS" /> <span>14/10/2021</span>{" "}
                </>
              }
              heading={<>Lối sống tối giản của người Nhật</>}
              textMore={"Đọc thêm"}
            />
            <BoxImage
              className={styles.box3}
              imgUrl={"/images/new3.png"}
              subHeading={
                <>
                  <Tag text="HOT" /> <span>12/10/2021</span>{" "}
                </>
              }
              heading={
                <>Bình gốm Việt Nam đang được đấu giá lên đến 20000 đô</>
              }
              textMore={"Đọc thêm"}
            />
            <BoxImage
              className={styles.box4}
              imgUrl={"/images/new4.png"}
              subHeading={
                <>
                  <Tag text="TIPS" /> <span>8/10/2021</span>{" "}
                </>
              }
              heading={<>Những thú vui khi về hưu (phần 1)</>}
              textMore={"Đọc thêm"}
            />
          </div>
          <div className={styles.button}>
            <Button type="secondary">Xem tất cả</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
