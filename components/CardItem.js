import { Card, Col, Image, Rate, Row } from "antd";
import React from "react";
import styles from "../styles/CardItem.module.css";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

export default function CardItem({ product }) {
  return (
    <div>
      <Link href={`/products/${product && product._id}`} passHref>
        <Card
          className={styles.card}
          hoverable
          bordered={false}
          cover={
            <>
              <div className={styles.cardImg}>
                <Image
                  preview={false}
                  alt="items"
                  src={product && product.images && product.images[0]}
                />
                <div className={styles.ar}>AR</div>
              </div>
            </>
          }
        >
          <div className={styles.cardBody}>
            <p className={styles.cardTitle}>{product && product.title}</p>
            <Row justify="space-between">
              <Col>
                <Rate disabled defaultValue={5} style={{ fontSize: "95%" }} />
              </Col>
              <Col>
                <small className={styles.sold}>
                  Đã bán: {product && product.sold}
                </small>
              </Col>
            </Row>
            <div className={styles.summary}>
              <small>{ReactHtmlParser(product && product.summary)}</small>
            </div>
            <Row justify="end">
              <Col className={styles.price}>
                Giá: {product && product.price}
              </Col>
            </Row>
          </div>
        </Card>
      </Link>
    </div>
  );
}