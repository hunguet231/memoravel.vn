import { Col, Row } from "antd";
import { fetchData } from "api";
import ProductCard from "components/common/ProductCard";
import { ApiConstant, AppConstant } from "const";
import React from "react";
import styles from "../../styles/Blogs.module.scss";

export default function Shop() {
  const [products, setProducts] = React.useState([]);

  const fetchProducts = async () => {
    const url = ApiConstant.GET_PRODUCT;
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setProducts(response.data);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="wrapper">
      <div className={styles.imgOverlay}>
        <div className={styles.contentOverlay}>
          <div className="container">
            <h1 className={styles.title}>Shop</h1>
            <Row justify="space-between">
              <Col sm={24} md={10}>
                <p className={styles.subTitle}>
                  Sản phẩm chất lượng cao, đa dạng, ứng dụng công nghệ AR cho
                  trải nghiệm mua hàng tuyệt vời
                </p>
              </Col>

              <Col sm={24} md={10}></Col>
            </Row>
          </div>
        </div>
        <img src="/images/bg_shop-min.png" className={styles.img} />
      </div>

      <br />
      <div className="container">
        <Row gutter={30}>
          {products.map((product) => (
            <Col key={product.id} sm={24} md={12}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
