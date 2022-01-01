/* eslint-disable react/prop-types */
import React from "react";
import { Row, Col } from "antd";
import RatingCard from "./RatingCard";

export default function ProductRating({ rating }) {
  return (
    <div className="wrapper" style={{ marginTop: "20px" }}>
      <h1 className="heading heading-section">Đánh giá ({rating.length})</h1>
      {rating.length > 0 ? (
        <>
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <RatingCard />
            </Col>
            <Col sm={24} md={12}>
              <RatingCard />
            </Col>
            <Col sm={24} md={12}>
              <RatingCard />
            </Col>
            <Col sm={24} md={12}>
              <RatingCard />
            </Col>
          </Row>
          {rating.length > 4 && (
            <button className="button button-secondary">
              {rating.length - 4} đánh giá khác
            </button>
          )}
        </>
      ) : (
        <>
          <p>Sản phẩm chưa có đánh giá nào.</p>
        </>
      )}
    </div>
  );
}
