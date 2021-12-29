import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";
import React from "react";
import styles from "../../styles/Blogs.module.scss";
import BlogThumbnail from "./BlogThumbnail";

export default function Blogs() {
  // const [topics, setTopics] = React.useState([]);
  const [posts, setPosts] = React.useState([]);

  // const fetchTopics = async () => {
  //   const url = ApiConstant.GET_TOPIC;
  //   const response = await fetchData(url, ApiConstant.METHOD.get);
  //   if (response?.status === AppConstant.STATUS_OK) {
  //     setTopics(response.data);
  //   }
  // };
  const fetchPosts = async () => {
    const url = ApiConstant.GET_POST;
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setPosts(response.data);
    }
  };

  React.useEffect(() => {
    // fetchTopics();
    fetchPosts();
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
        <img src="/images/bg_blogs-min.png" className={styles.img} />
      </div>

      <br />
      {/* <Category topics={topics} /> */}
      <div className="container">
        <Row gutter={30}>
          {posts.map((post) => (
            <Col key={post.id} sm={24} md={12}>
              <BlogThumbnail post={post} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
