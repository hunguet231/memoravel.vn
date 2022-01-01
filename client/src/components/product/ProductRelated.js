/* eslint-disable react/prop-types */
import React from "react";
import { Row, Col } from "antd";
import ProductCard from "components/common/ProductCard";

export default function ProductRelated({ products }) {
  return (
    <div className="wrapper" style={{ marginTop: "20px" }}>
      <h1 className="heading heading-section">Sản phẩm tương tự</h1>
      <Row gutter={10}>
        {products.map((product) => (
          <Col xs={12} sm={12} md={8} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
