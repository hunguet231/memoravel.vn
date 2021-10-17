import { Carousel } from "antd";
import React from "react";
import styles from "../../styles/TopProduct.module.scss";

const TopProduct = () => {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="wrapper">
      <div className={styles.top}>
        <div className="container-fluid">
          <h1 className="heading heading-section text-center">Top bán chạy</h1>
          <div className={styles.subHeading}>
            Những sản phẩm ở memoravel luôn được đảm bảo <br /> chất lượng, giá
            cả, hình thức tốt nhất
          </div>
          <Carousel {...settings}>
            <div>
              <h3 style={{ height: "436px", background: "#7a0b1b" }}>1</h3>
            </div>
            <div>
              <h3 style={{ height: "436px", background: "#7a0b1b" }}>2</h3>
            </div>
            <div>
              <h3 style={{ height: "436px", background: "#7a0b1b" }}>3</h3>
            </div>
            <div>
              <h3 style={{ height: "436px", background: "#7a0b1b" }}>4</h3>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
