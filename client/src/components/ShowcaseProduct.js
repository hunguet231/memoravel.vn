import { ArrowRightOutlined } from "@ant-design/icons";
import React from "react";
import styles from "../styles/ShowcaseProduct.module.scss";

const ShowcaseProduct = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.showcase}>
          <h1 className="heading text-center">Sản phẩm làng nghề</h1>
          <ul className="flex justify-between">
            <li>Tất cả</li>
            <li>Bình</li>
            <li>Ấm chén</li>
            <li>Đĩa</li>
            <li>Tranh</li>
            <li>Quần áo</li>
            <li>Nội thất</li>
            <li>Trang trí</li>
          </ul>
          <div className={styles.images}>
            <div className={styles.bg1}>
              <div className={styles.overlay}>
                <div className={styles.text}>
                  <div className={styles.subHeading}>MEMORAVEL.VN</div>
                  <h2 className="heading heading-white">
                    Làng mây tre đan <br /> Phú Vinh
                  </h2>
                  <div className={styles.iconBtn}>
                    <ArrowRightOutlined />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bg2}>
              <div className={styles.overlay}>
                <div className={styles.text}>
                  <div className={styles.subHeading}>MEMORAVEL.VN</div>
                  <h2 className="heading heading-white">Làng tranh Đông Hồ</h2>
                  <div className={styles.iconBtn}>
                    <ArrowRightOutlined />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bg3}>
              <div className={styles.overlay}>
                <div className={styles.text}>
                  <div className={styles.subHeading}>MEMORAVEL.VN</div>
                  <h2 className="heading heading-white">
                    Làng lụa <br /> Vạn Phúc
                  </h2>
                  <div className={styles.iconBtn}>
                    <ArrowRightOutlined />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bg4}>
              <div className={styles.overlay}>
                <div className={styles.text}>
                  <div className={styles.subHeading}>MEMORAVEL.VN</div>
                  <h2 className="heading heading-white">
                    Làng gốm <br /> Bát Tràng
                  </h2>
                  <div className={styles.iconBtn}>
                    <ArrowRightOutlined />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <div className="button button-secondary align-center text-center">
              Xem tất cả
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseProduct;
