import React from "react";
import { Row, Col } from "antd";
import RatingCard from "./RatingCard";

export default function ProductRating() {
  return (
    <div className="wrapper">
      <h1 className="heading heading-section">Đánh giá (15)</h1>
      <Row>
        <Col span={12}>
          <RatingCard />
        </Col>
        <Col span={12}>
          <RatingCard />
        </Col>
        <Col span={12}>
          <RatingCard />
        </Col>
        <Col span={12}>
          <RatingCard />
        </Col>
      </Row>
      <button className="button button-secondary">11 đánh giá khác</button>
    </div>
  );
}
