/* eslint-disable react/prop-types */
import { ShoppingCartOutlined } from "@ant-design/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { Card, Image, Rate } from "antd";
import React from "react";
import Link from "next/link";
import styles from "../../styles/ProductCard.module.scss";

export default function ProductCard({ product }) {
  const { alias, images, name, price, sold, summary, vectary_link } = product;
  return (
    <Link href={`/product/${alias}`}>
      <Card
        className={styles.cardWrapper}
        cover={
          <Image
            className={styles.cardImg}
            style={{ borderRadius: "6px" }}
            src={images[0].image}
            preview={false}
          />
        }
      >
        <div className={styles.overlayAR}>
          <div className="flex justify-end">
            <div className={styles.buttonAR}>{vectary_link && "AR"}</div>
          </div>
        </div>
        <h2 className={styles.productName}>{name}</h2>
        <p className={styles.description}>{summary}</p>
        <div className="flex justify-between">
          <Rate disabled value={5} className={styles.rate} />
          <p className={styles.sold}>{sold} đã bán</p>
        </div>
        <div
          className={`flex justify-between items-center ${styles.cardFooter}`}
        >
          <div className={styles.cartButton}>
            <Tooltip title="Thêm vào giỏ hàng">
              <IconButton aria-label="add-to-cart">
                <ShoppingCartOutlined className={styles.cartIcon} />
              </IconButton>
            </Tooltip>
          </div>
          <h1 className={styles.price}>{price}đ</h1>
        </div>
      </Card>
    </Link>
  );
}
