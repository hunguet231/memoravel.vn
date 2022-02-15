/* eslint-disable react/prop-types */
import { Card, Skeleton } from "antd";
import React from "react";
import styles from "../../styles/ProductCard.module.scss";

export default function SkeletonProductCard() {
  return (
    <Card
      className={styles.cardWrapper}
      cover={
        <div
          style={{
            width: "100%",
            height: "100px",
            background: "#f2f2f2",
            marginBottom: "20px",
          }}
        ></div>
      }
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Skeleton.Avatar active style={{ marginRight: "10px" }} />
        <Skeleton active block />
      </div>
    </Card>
  );
}
