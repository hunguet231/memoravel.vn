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
import { Pagination } from "@material-ui/lab";

export default function Shop() {
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const fetchProducts = async (page, search = "", shop_id = null) => {
    let url = ApiConstant.GET_PRODUCT + `?page=${page}&size=${10}&search=${search}`;

    if (shop_id) {
      url += `&shop_id=${shop_id}`;
    }

    const response = await fetchData(url, ApiConstant.METHOD.get);

    if (response?.status === AppConstant.STATUS_OK) {
      setProducts(response.data);
      setTotal(response.total);
    }
  };

  React.useEffect(() => {
    const initPage = 1;
    fetchProducts(initPage);
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChangePage = (page, pageSize) => {
    setPage(page);
    fetchProducts(page, search);

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
                  Sản phẩm chất lượng cao, đa dạng, ứng dụng công nghệ AR cho trải nghiệm mua hàng
                  tuyệt vời
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
            <Filter fetchProducts={fetchProducts} setSearch={setSearch} setPage={setPage} />
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
              <Filter fetchProducts={fetchProducts} setSearch={setSearch} setPage={setPage} />
            </Drawer>

            <Row gutter={10}>
              {products.map((product) => (
                <Col xs={12} sm={12} md={8} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>

            <Pagination
              page={page}
              count={parseInt((total - 1) / 10) + 1}
              onChange={(_, page) => onChangePage(page)}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
