import React from "react";
import { Image, Input, Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import BlogThumbnail from "./BlogThumbnail";
import styles from "../../styles/Blogs.module.scss";

export default function Blogs() {
  return (
    <div className="wrapper">
      <div className={styles.imgOverlay}>
        <div className={styles.contentOverlay}>
          <div className="container">
            <h1 className={styles.title}>Tin tức</h1>
            <Row justify="space-between">
              <Col sm={24} md={10}>
                <p className={styles.subTitle}>
                  Cập nhật những thông tin mới nhất về du lịch hỏi đáp và chia sẻ những kiến thức về
                  làng nghề
                </p>
              </Col>

              <Col sm={24} md={10}>
                <Input
                  className={styles.input}
                  placeholder="Tìm kiểm chủ đề"
                  suffix={<SearchOutlined />}
                />
              </Col>
            </Row>
          </div>
        </div>
        <img src="/images/bg_blogs.png" className={styles.img} />
      </div>

      <br />
      <div className="container">
        <Row gutter={30}>
          <Col sm={24} md={12}>
            <BlogThumbnail />
          </Col>
          <Col sm={24} md={12}>
            <BlogThumbnail />
          </Col>
          <Col sm={24} md={12}>
            <BlogThumbnail />
          </Col>
          <Col sm={24} md={12}>
            <BlogThumbnail />
          </Col>
        </Row>
      </div>
    </div>
  );
}
