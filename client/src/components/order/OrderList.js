/* eslint-disable react/react-in-jsx-scope */
import axios from "axios";
import { ApiConstant } from "const";
import { useEffect, useState } from "react";
import OrderEmpty from "./OrderEmpty";
import styles from "styles/Cart.module.scss";
import numberWithDots from "utils/addDotsNumber";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

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
      orderedList.map(async (orderId) => {
        const orderResponse = await fetchOrderData(orderId);
        orders.push(orderResponse);
        return orderResponse;
      })
    ).then(() => setOrders(orders));
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        {orders.length > 0 ? (
          <div className={styles.container}>
            <h1 className="heading heading-section heading-primary">
              Đơn hàng của tôi ({orders.length})
            </h1>
            {orders.map((order, index) => (
              <div key={index} className={styles.cartWrap}>
                <div className={styles.orderCode}>
                  <p style={{ margin: "0px" }}>Mã vận đơn: {order.label_id}</p>
                  <p style={{ margin: "0px" }}>
                    Mã đơn hàng: {order.partner_id}
                  </p>
                  <p>Trạng thái đơn: {order.status_text}</p>
                </div>
                <p style={{ margin: "0px" }}>Địa chỉ giao hàng:</p>
                <div className={styles.orderInfo} style={{ width: "100%" }}>
                  <div className={styles.orderName}>
                    {`${order.customer_fullname}, ${order.customer_tel}`}
                    <br />
                    {`${order.address}`}
                  </div>
                </div>
                <br />
                <p style={{ margin: "0px" }}>Sản phẩm đã đặt:</p>
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className={styles.orderInfo}
                    style={{ width: "100%" }}
                  >
                    <div className={styles.orderName}>{item.full_name}</div>
                  </div>
                ))}
                <br />
                <div className={styles.orderValue}>
                  TỔNG GIÁ TRỊ: {`${numberWithDots(order.value)} vnđ`}
                </div>
                <div className={styles.shipingInfo}>
                  <div className={styles.shipingDeliver}>
                    <div className="flex items-center ">
                      Đơn bị vận chuyển:{" "}
                      <span className={styles.shipingPartner}>
                        Giao hàng tiết kiệm (Tiêu chuẩn)
                      </span>
                      <span className={styles.fee}>
                        {`Phí ship: ${numberWithDots(order.ship_money)} vnđ`}
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <span className={styles.shipingTime}>
                        Ngày đặt:{" "}
                        {`${new Date(
                          order.created
                        ).toLocaleDateString()}, ${new Date(
                          order.created
                        ).toLocaleTimeString()}`}
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
            ))}
          </div>
        ) : (
          <OrderEmpty />
        )}
      </div>
    </div>
  );
}
