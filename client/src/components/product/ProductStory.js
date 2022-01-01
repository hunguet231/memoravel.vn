/* eslint-disable react/prop-types */
import React from "react";
import { Row, Col } from "antd";
import styles from "styles/ProductStory.module.scss";

export default function ProductStory({ story, name, images }) {
  return (
    <div className={styles.container}>
      <h1 className="heading heading-section">Câu chuyện về “{name}”</h1>
      <Row gutter={32}>
        <Col sm={24} lg={14}>
          <div className={styles.content}> {story}</div>
        </Col>
        <Col sm={24} lg={10}>
          <img src={images[0].image} className={styles.storyImg} />
        </Col>
      </Row>
    </div>
  );
}
