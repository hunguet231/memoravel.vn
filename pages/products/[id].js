/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { getData } from "../../utils/fetchData";
import Image from "next/image";
import { Row, Col, Card, Avatar, Button } from "antd";
import { UserOutlined, MessageFilled, ShoppingFilled } from "@ant-design/icons";
import styles from "../../styles/ShopDetails.module.css";
import SubscribeForm from "../../components/SubscribeForm";
import Footer from "../../components/Footer";
import CardItem from "../../components/CardItem";
import CardProduct from "../../components/CardProduct";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import VectaryIframe from "../../components/VectaryIframe";

const product = ({ product }) => {
  const [viewAR, setViewAR] = useState(false);
  const toggleViewAR = (viewAR) => {
    setViewAR(viewAR);
  };
  return (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <div className={styles.subContainer}>
            <Row gutter={16} justify="center">
              <Col
                span={24}
                sm={18}
                md={16}
                lg={12}
                className={styles.parentProductImg}
              >
                {viewAR ? (
                  <VectaryIframe
                    id="4af2ad3b-80bd-45ab-9eb2-d0e10e00565e"
                    src="https://www.vectary.com/viewer/v1/?model=4af2ad3b-80bd-45ab-9eb2-d0e10e00565e&env=studio3&turntable=-12"
                  />
                ) : (
                  <Image
                    src={product.images[0]}
                    alt="product-details"
                    layout="fill"
                    objectFit="cover"
                    className={styles.productImg}
                  />
                )}
              </Col>
              <Col span={24} lg={12}>
                <CardProduct product={product} toggleViewAR={toggleViewAR} />
              </Col>
            </Row>
            <Card className={styles.cardShopInfo}>
              <Row style={{ marginBottom: "-18px" }}>
                <Col span={8} sm={6} md={3}>
                  <Avatar
                    size={{ xl: 70, lg: 68, md: 58, sm: 70, xs: 70 }}
                    icon={<UserOutlined />}
                  />
                </Col>
                <Col span={16} sm={18} md={9}>
                  <Card bordered={false} className={styles.cardUserInfo}>
                    <h2 style={{ marginBottom: "-5px" }}>MEMORAVEL</h2>
                    <small style={{ color: "#00000099" }}>
                      online 5 phút trước
                    </small>
                    <Row gutter={10} style={{ margin: "15px 0 0 -10px" }}>
                      <Col span={24} sm={12}>
                        <Button
                          block={true}
                          type="primary"
                          className={styles.chatShop}
                        >
                          <MessageFilled />
                          Trò chuyện
                        </Button>
                      </Col>
                      <Col span={24} sm={12}>
                        <Button
                          block={true}
                          type="primary"
                          className={styles.watchShop}
                        >
                          <ShoppingFilled />
                          Xem shop
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={24} md={12} className={styles.statisticWrap}>
                  <Row style={{ textAlign: "start" }}>
                    <Col span={12} className={styles.statisticShop}>
                      Đánh giá : 44k
                    </Col>
                    <Col span={12} className={styles.statisticShop}>
                      Theo dõi : 2000
                    </Col>
                    <Col span={12}>Sản phẩm : 500</Col>
                    <Col span={12}>Đã tham gia : 22 tháng trước</Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Row gutter={8} className={styles.cardProductDescription}>
              <Col span={24} style={{ marginBottom: "10px" }}>
                <Card style={{ borderRadius: "10px" }}>
                  <h1>Mô tả sản phẩm</h1>
                  <hr />
                  <p>{ReactHtmlParser(product.details)}</p>
                </Card>
              </Col>
              {/* <Col span={24} lg={6}>
                <Card>
                  <h3>Sản phẩm liên quan</h3>
                  <hr />
                  <CardItem product={product} />
                  <CardItem product={product} />
                </Card>
              </Col> */}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default product;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`products/${id}`);
  return {
    props: { product: res.product },
  };
}