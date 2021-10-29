import React from "react";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import styles from "../../styles/TopProduct.module.scss";

const TopProduct = () => {
  const flickityOptions = {
    wrapAround: true,
    autoPlay: true,
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
          <Flickity options={flickityOptions}>
            <div
              style={{
                height: "436px",
                width: "100%",
                marginRight: "10px",
                background: "#7a0b1b",
              }}
            >
              <h3>1</h3>
            </div>
            <div
              style={{
                height: "436px",
                width: "100%",
                marginRight: "10px",
                background: "#7a0b1b",
              }}
            >
              <h3>2</h3>
            </div>
            <div
              style={{
                height: "436px",
                width: "100%",
                marginRight: "10px",
                background: "#7a0b1b",
              }}
            >
              <h3>3</h3>
            </div>
            <div
              style={{
                height: "436px",
                width: "100%",
                marginRight: "10px",
                background: "#7a0b1b",
              }}
            >
              <h3>4</h3>
            </div>
          </Flickity>
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
