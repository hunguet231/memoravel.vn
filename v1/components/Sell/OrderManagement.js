/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { EditOutlined } from "@ant-design/icons";
import { Button, Image, Spin, Table, Tag } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { DataContext } from "../../store/GlobalState";
import styles from "../../styles/BasicContainer.module.css";
import SubscribeForm from "../../components/SubscribeForm";
import Footer from "../../components/Footer";

export default function myOrders() {
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  const [visible, setVisible] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (Object.keys(auth).length === 0) router.push("/login");
  //   return;
  // }, [auth]);

  const columns = [
    {
      title: "SKU",
      dataIndex: "_id",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <>
          <p>{new Date(record.createdAt).toLocaleDateString()}</p>
        </>
      ),
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "total",
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <>
          <p>{record.total} ₫</p>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "delivered",
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <>
          {record.delivered ? (
            <Tag color="cyan">Đã giao</Tag>
          ) : (
            <Tag color="magenta">Chưa giao</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "",
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <>
          <Link href={`/my-orders/${record._id}`}>Chi tiết</Link>
        </>
      ),
    },
  ];

  if (!auth.user) return null;

  return (
    <>
      <div className={styles.container}>
        <h1 className="title">Tất cả đơn hàng</h1>
        {orders && orders.length ? (
          <div className="table">
            <Table
              pagination={{ pageSize: 5 }}
              bordered
              columns={columns}
              dataSource={orders}
              showSorterTooltip={true}
              scroll={{ x: "max-content" }}
            />
          </div>
        ) : (
          <Spin />
        )}
      </div>
    </>
  );
}
