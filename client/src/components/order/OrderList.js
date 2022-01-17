/* eslint-disable react/react-in-jsx-scope */
import { EnvironmentOutlined, ReconciliationOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import axios from "axios";
import Empty from "components/common/EmptyContent";
import { ApiConstant } from "const";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "styles/Cart.module.scss";
import numberWithDots from "utils/addDotsNumber";

const { TabPane } = Tabs;

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [ordersAll, setOrdersAll] = useState([]);
  const [title, setTitle] = useState("Đơn hàng của tôi");

  const fetchOrderData = async (orderId) => {
    const url =
      ApiConstant.BASE_URL + ApiConstant.SHIPMENT_ORDER + `/${orderId}`;
    const { data } = await axios.get(url);
    return data.order;
  };

  useEffect(() => {
    const orderedList = JSON.parse(localStorage.getItem("ordered_list")) || [];
    let orders = [];
    Promise.all(
      orderedList.map(async (order) => {
        const orderResponse = await fetchOrderData(order?.label || order);
        orders.push({ order: orderResponse, products: order?.products || [] });
        return orderResponse;
      })
    ).then(() => {
      setOrders(orders);
      setOrdersAll(orders);
      // console.log(orders);
    });
  }, []);

  const callback = (key) => {
    switch (key) {
      case "1":
        setOrders(ordersAll);
        setTitle("Đơn hàng của tôi");
        break;
      case "2":
        setOrders([...ordersAll].filter((order) => order.order.status === 2));
        setTitle("Đã tiếp nhận");
        break;
      case "3":
        setOrders([...ordersAll].filter((order) => order.order.status === 4));
        setTitle("Đang giao");
        break;
      case "4":
        setOrders([...ordersAll].filter((order) => order.order.status === 6));
        setTitle("Đã giao");
        break;
      case "5":
        setOrders([...ordersAll].filter((order) => order.order.status === -1));
        setTitle("Đã huỷ");
        break;
    }
  };

  return (
    <div className="wrapper" style={{ background: "#f5f5f5" }}>
      <div className="container">
        <div className={styles.container}>
          <h1 className="heading heading-section heading-primary">
            {title} ({orders.length})
          </h1>
          <Tabs
            defaultActiveKey="1"
            onChange={callback}
            style={{
              background: "#fff",
              paddingLeft: "15px",
              marginBottom: "15px",
            }}
          >
            <TabPane tab="Tất cả" key="1"></TabPane>
            <TabPane tab="Đã tiếp nhận" key="2"></TabPane>
            <TabPane tab="Đang giao" key="3"></TabPane>
            <TabPane tab="Đã giao" key="4"></TabPane>
            <TabPane tab="Đã huỷ" key="5"></TabPane>
          </Tabs>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={index}
                className={styles.cartWrap}
                style={{ background: "#fff" }}
              >
                <div className={styles.orderCode}>
                  <p style={{ margin: "0px" }}>
                    Mã vận đơn: {order?.order?.label_id || order?.label_id}
                  </p>
                  <p style={{ margin: "0px" }}>
                    Mã đơn hàng: {order?.order?.partner_id || order?.partner_id}
                  </p>
                  <p>
                    Trạng thái đơn:{" "}
                    <b>{order.order.status_text || order?.status_text}</b>
                  </p>
                </div>
                {order.order.message && (
                  <p style={{ margin: "0px 0px 5px" }}>
                    Tin nhắn:{" "}
                    <span style={{ color: "dodgerblue" }}>
                      {order.order.message}
                    </span>
                  </p>
                )}

                <p style={{ margin: "0px" }}>
                  <EnvironmentOutlined /> Địa chỉ giao hàng:
                </p>
                <div
                  className={styles.orderInfo}
                  style={{ margin: "0px 0px 5px", width: "100%" }}
                >
                  <div className={styles.orderName} style={{ fontWeight: 600 }}>
                    {`${
                      order?.order?.customer_fullname ||
                      order?.customer_fullname
                    }, ${order?.order?.customer_tel || order?.customer_tel}`}
                    <br />
                    {`${order?.order?.address || order?.address}`}
                  </div>
                </div>
                <p style={{ margin: "0px" }}>
                  <ReconciliationOutlined /> Sản phẩm đã đặt:
                </p>
                {/* new */}
                {order.products.length > 0
                  ? order.products.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          margin: "0px 0px 5px",
                          width: "100%",
                        }}
                        className={styles.orderInfo}
                      >
                        <Link href={`/product/${item.alias}`}>
                          <>
                            <div className={styles.img}>
                              <img src={item.images[0].image} />
                            </div>

                            <div key={item.id}>
                              <div className={styles.orderName}>
                                {item.name}
                              </div>
                              <div className={styles.itemInfo}>
                                SL: {item.quantity}
                              </div>
                              <div className={styles.itemInfo}>
                                Thành tiền:{" "}
                                {numberWithDots(item.quantity * item.price)} vnđ
                              </div>
                            </div>
                          </>
                        </Link>
                      </div>
                    ))
                  : order.order.products.map((item, index) => (
                      <div
                        key={index}
                        className={styles.orderInfo}
                        style={{ margin: "0px 0px 5px", width: "100%" }}
                      >
                        <div className={styles.img}>
                          <img src="https://via.placeholder.com/100" />
                        </div>

                        <div>
                          <div className={styles.orderName}>
                            {item.full_name}
                          </div>
                        </div>
                      </div>
                    ))}
                <div
                  className={styles.orderValue}
                  style={{ margin: "0px 0px 5px", width: "100%" }}
                >
                  TỔNG ĐƠN HÀNG:{" "}
                  {`${numberWithDots(order?.order?.value || order?.value)} vnđ`}
                </div>
                <div className={styles.shipingInfo}>
                  <div className={styles.shipingDeliver}>
                    <div className="flex items-center ">
                      Đơn bị vận chuyển:{" "}
                      <span className={styles.shipingPartner}>
                        Giao hàng tiết kiệm (Tiêu chuẩn)
                      </span>
                      <span className={styles.fee}>
                        {`Phí ship: ${numberWithDots(
                          order?.order?.ship_money || order?.ship_money
                        )} vnđ`}
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <span className={styles.shipingTime}>
                        Ngày đặt:{" "}
                        {`${order?.order?.created
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")}`}
                        , {`${order?.order?.created.substring(10)}`}
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <span className={styles.shipingTime}>
                        Dự kiến nhận hàng sau 3 - 5 ngày
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}
