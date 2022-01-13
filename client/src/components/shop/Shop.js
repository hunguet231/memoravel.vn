/* eslint-disable no-unused-vars */
import { FileSearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Pagination } from "@material-ui/lab";
import { Col, Drawer, Row } from "antd";
import { fetchData } from "api";
import ProductCard from "components/common/ProductCard";
import { ApiConstant, AppConstant } from "const";
import React, { useContext, useState } from "react";
import { DataContext } from "../../../store/GlobalState";
import styles from "../../styles/Blogs.module.scss";
import Filter from "./Filter";

export default function Shop() {
  const { state, dispatch } = useContext(DataContext);
  const { filter } = state;

  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const [productsHot, setProductsHot] = useState([]);

  const fetchProducts = async (page, filter) => {
    let url =
      ApiConstant.GET_PRODUCT +
      `?page=${page}&size=${12}&search=${filter.search}&price_min=${
        filter.price[0]
      }&price_max=${filter.price[1]}&made_in=${filter.made_in}&type=${
        filter.type
      }`;

    const response = await fetchData(url, ApiConstant.METHOD.get);

    if (response?.status === AppConstant.STATUS_OK) {
      setProducts(response.data);
      setTotal(response.total);
    }
  };

  const fetchProductsHot = async () => {
    let url = ApiConstant.GET_PRODUCT_HOT + `?size=${5}`;

    const response = await fetchData(url, ApiConstant.METHOD.get);

    if (response?.status === AppConstant.STATUS_OK) {
      setProductsHot(response.data);
    }
  };

  React.useEffect(() => {
    fetchProducts(page, filter);
    fetchProductsHot();
  }, [filter]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChangePage = (page, pageSize) => {
    setPage(page);
    fetchProducts(page, filter);

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
            <Filter
              fetchProducts={fetchProducts}
              productsHot={productsHot}
              setVisible={setVisible}
            />
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
              <Filter
                fetchProducts={fetchProducts}
                productsHot={productsHot}
                setVisible={setVisible}
              />
            </Drawer>

            {filter.search && (
              <p style={{ wordBreak: "break-word" }}>
                <FileSearchOutlined /> Có {products.length} kết quả tìm kiếm cho
                từ khoá &ldquo;
                {filter.search}
                &rdquo;
              </p>
            )}
            <Row gutter={10}>
              {products.map((product) => (
                <Col xs={12} sm={12} md={8} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>

            <Pagination
              style={{ marginBottom: "20px" }}
              page={page}
              count={parseInt((total - 1) / 12) + 1}
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
