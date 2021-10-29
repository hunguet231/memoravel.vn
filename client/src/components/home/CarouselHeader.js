import React from "react";
import { Image } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import styles from "../../styles/CarouselHeader.module.scss";

export default function CarouselHeader() {
  const flickityOptions = {
    wrapAround: true,
    autoPlay: true,
  };

  return (
    <>
      <div className="wrapper">
        <div className="container-fluid">
          <div className={styles.heroWrapper}>
            <Flickity options={flickityOptions}>
              <div className={styles.banner}>
                <img src="/images/carousel.png" alt="Banner" />
                <div className={styles.text}>
                  <h1 className={styles.heading}>MEMORAVEL</h1>
                  <h2 className={styles.subHeading}>
                    Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển làng
                    nghề truyền thống đầu tiên tại Việt Nam
                  </h2>
                  <div className={`${styles.buyNow} button`}>
                    Mua sắm ngay <RightOutlined />
                  </div>
                </div>
              </div>
              <div className={styles.banner}>
                <img src="/images/carousel.png" alt="Banner" />
                <div className={styles.text}>
                  <h1 className={styles.heading}>MEMORAVEL</h1>
                  <h2 className={styles.subHeading}>
                    Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển làng
                    nghề truyền thống đầu tiên tại Việt Nam
                  </h2>
                  <div className={`${styles.buyNow} button`}>
                    Mua sắm ngay <RightOutlined />
                  </div>
                </div>
              </div>
              <div className={styles.banner}>
                <img src="/images/carousel.png" alt="Banner" />
                <div className={styles.text}>
                  <h1 className={styles.heading}>MEMORAVEL</h1>
                  <h2 className={styles.subHeading}>
                    Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển làng
                    nghề truyền thống đầu tiên tại Việt Nam
                  </h2>
                  <div className={`${styles.buyNow} button`}>
                    Mua sắm ngay <RightOutlined />
                  </div>
                </div>
              </div>
            </Flickity>
          </div>
        </div>
      </div>
    </>
  );
}
