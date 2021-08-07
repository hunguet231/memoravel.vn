import React from "react";
import Image from "next/image";
import { Row, Col, Card, Avatar, Button } from "antd";
import { UserOutlined, MessageFilled, ShoppingFilled } from "@ant-design/icons";
import styles from "../styles/ShopDetails.module.css";
import bgHero from "../public/bg-hero.jpg";
import CardItem from "../components/CardItem";
import CardProduct from "../components/CardProduct";
import SubscribeForm from "../components/SubscribeForm";

export default function shopDetails() {
  return (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <div className={styles.subContainer}>
            <Row gutter={16} justify="center">
              <Col span={24} sm={18} md={16} lg={12} className={styles.parentProductImg}>
                <Image
                  src={bgHero}
                  alt="product-details"
                  layout="fill"
                  className={styles.productImg}
                />
              </Col>
              <Col span={24} lg={12}>
                <CardProduct />
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
                    <h2 style={{ marginBottom: "-5px" }}>TRẦN THANH LÂM</h2>
                    <small style={{ color: "#00000099" }}>online 5 phút trước</small>
                    <Row gutter={10} style={{ margin: "15px 0 0 -10px" }}>
                      <Col span={24} sm={12}>
                        <Button block={true} type="primary" className={styles.chatShop}>
                          <MessageFilled />
                          Trò chuyện
                        </Button>
                      </Col>
                      <Col span={24} sm={12}>
                        <Button block={true} type="primary" className={styles.watchShop}>
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
              <Col span={24} lg={18} style={{ marginBottom: "10px" }}>
                <Card style={{ borderRadius: "10px" }}>
                  <h1>Mô tả sản phẩm</h1>
                  <hr />
                  <p>
                    gốm Bát Tràng nhiều kiểu dáng và rất dễ cắm hoa. Men gốm màu sắc trang nhã sẽ
                    cho bạn chọn lựa. Ngoài cắm hoa, bình hoa gốm sứ còn như một món đồ gốm trang
                    trí cho không gian phòng khách thêm sang trọng, ấm cúng.
                  </p>
                </Card>
              </Col>
              <Col span={24} lg={6}>
                <Card>
                  <h3>Sản phẩm liên quan</h3>
                  <hr />
                  <CardItem />
                  <CardItem />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
