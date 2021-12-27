import React from "react";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import styles from "../../styles/TopProduct.module.scss";
import ProductCard from "components/common/ProductCard";

const TopProduct = () => {
  const flickityOptions = {
    imagesLoaded: true,
    percentPosition: false,
    cellAlign: "center",
    contain: true,
    groupCells: true,
    // wrapAround: true,
    // autoPlay: true,
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
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Flickity>
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
