import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import React from "react";
import styles from "../../styles/Blogs.module.scss";
import BlogThumbnail from "./BlogThumbnail";
import Category from "./Category";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";

export default function Blogs() {
  const [topics, setTopics] = React.useState([]);

  const fetchTopics = async () => {
    const url = ApiConstant.GET_TOPIC;
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setTopics(response.data);
    }
  };

  React.useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="wrapper">
      <div className={styles.imgOverlay}>
        <div className={styles.contentOverlay}>
          <div className="container">
            <h1 className={styles.title}>Tin tức</h1>
            <Row justify="space-between">
              <Col sm={24} md={10}>
                <p className={styles.subTitle}>
                  Cập nhật những thông tin mới nhất về du lịch hỏi đáp và chia
                  sẻ những kiến thức về làng nghề
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
      <Category topics={topics} />
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
