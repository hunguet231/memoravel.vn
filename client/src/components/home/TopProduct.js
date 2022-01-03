import React from "react";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import styles from "../../styles/TopProduct.module.scss";
import { fetchData } from "api";
import ProductCard from "components/common/ProductCard";
import { ApiConstant, AppConstant } from "const";

const TopProduct = () => {
  const [products, setProducts] = React.useState([]);

  const fetchProducts = async () => {
    const url = ApiConstant.GET_PRODUCT_HOT + "?limit=10";
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setProducts(response.data);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

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
          <div className="top-product">
            <Flickity options={flickityOptions}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Flickity>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
