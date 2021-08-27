/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Col, Image, Row } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Sell/Menu";
import ProductManagement from "../components/Sell/ProductManagement/ProductManagement";
import UpdateShop from "../components/Sell/UpdateShop";
import SubscribeForm from "../components/SubscribeForm";
import { DataContext } from "../store/GlobalState";
import styles from "../styles/Sell.module.css";
import useWindowSize from "../utils/useWindowSize";

const Sell = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [menu, setMenu] = useState("-1");
  const size = useWindowSize();

  useEffect(() => {
    if (Object.keys(auth).length === 0) router.push("/login");
    return;
  }, [auth]);

  const getClickedMenu = (e) => {
    setMenu(e);
  };

  return (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div
          className={styles.inner}
          style={{
            width: "100%",
            maxWidth: "1200px",
            padding: "300px 15px 10px",
          }}
        >
          <Row gutter={16}>
            <Col
              xs={24}
              md={4}
              style={{
                background: "#e0bf74",
                color: "#fff",
                padding: "0 !important",
              }}
            >
              <Menu getClickedMenu={getClickedMenu} />
            </Col>
            <Col
              xs={24}
              md={20}
              style={{
                background: "#0e1212",
                minHeight: "100vh",
              }}
            >
              <br />
              {menu == "-1" && (
                <div>
                  <h1 className="title">MEMORAVEL - Kênh người bán</h1>
                  <h2 className="sub-title">
                    Quản lý gian hàng của bạn một cách dễ dàng! <br /> Chọn danh
                    mục menu để tuỳ chỉnh cài đặt shop.
                  </h2>
                  <Image
                    preview={false}
                    src="/empty-menu.svg"
                    alt="Empty menu"
                    style={{
                      width: size.width <= 380 ? "85%" : "50%",
                      margin: "20px auto",
                    }}
                  />
                </div>
              )}
              {menu == "0" && <UpdateShop />}
              {menu == "1" && <ProductManagement />}
            </Col>
          </Row>
        </div>
        <div>
          <SubscribeForm />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Sell;
