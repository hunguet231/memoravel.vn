/* eslint-disable no-unused-vars */
import { FilterOutlined } from "@ant-design/icons";
import { Col, Drawer, Row } from "antd";
import { fetchData } from "api";
import ProductCard from "components/common/ProductCard";
import { ApiConstant, AppConstant } from "const";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/Blogs.module.scss";
import Filter from "./Filter";

export default function Shop() {
  const [products, setProducts] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const router = useRouter();

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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChangePage = (page, pageSize) => {
    router.push({
      pathname: "/shop",
      query: { p: page },
    });
  };

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
        <Row justify="space-between">
          <Col sm={24} md={24} lg={5} className={styles.filter}>
            <Filter />
          </Col>

          <Col sm={24} md={24} lg={18}>
            <div className={styles.filterBtn} onClick={showDrawer}>
              <FilterOutlined />
              <p>Bộ lọc</p>
            </div>

            <Drawer
              title="Bộ lọc"
              placement="left"
              closable={false}
              onClose={onClose}
              visible={visible}
              key="left"
            >
              <Filter />
            </Drawer>

            <Row gutter={10}>
              {products.map((product) => (
                <Col xs={12} sm={12} md={8} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
