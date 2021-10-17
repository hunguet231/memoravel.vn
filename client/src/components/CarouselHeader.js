import React from "react";
//import Image from "next/image";
import { Carousel, Image } from "antd";
import { RightOutlined } from "@ant-design/icons";
import styles from "../styles/CarouselHeader.module.scss";

export default function CarouselHeader() {
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          color: "rgba(225, 225, 225, 0.8)",
          fontSize: "42px",
          lineHeight: "1.5715",
          right: "45px",
          zIndex: 20,
        }}
        onClick={onClick}
      ></div>
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          color: "rgba(225, 225, 225, 0.8)",
          fontSize: "42px",
          lineHeight: "1.5715",
          left: "25px",
          zIndex: 20,
        }}
        onClick={onClick}
      ></div>
    );
  };
  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <div className="wrapper">
        <div className={styles.content}>
          <div className="container">
            <h1 className={styles.brandName}>MEMORAVEL</h1>
            <h2 className={styles.subBrandName}>
              Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển làng nghề truyền thống đầu tiên
              tại Việt Nam
            </h2>
            <div className="button" style={{ margin: "30px 0" }}>
              <div className={styles.buyNow}>
                Mua sắm ngay <RightOutlined />
              </div>
            </div>
          </div>
        </div>
        <Carousel autoplay arrows {...settings}>
          <div className={styles.imgOverlay}>
            <Image preview={false} src="/images/carousel.png" alt="carousel-header" />
          </div>
          <div>
            <Image preview={false} src="/images/carousel.png" alt="carousel-header" />
          </div>
          <div>
            <Image preview={false} src="/images/carousel.png" alt="carousel-header" />
          </div>
          <div>
            <Image preview={false} src="/images/carousel.png" alt="carousel-header" />
          </div>
        </Carousel>
      </div>
    </>
  );
}
