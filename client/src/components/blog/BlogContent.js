/* eslint-disable react/prop-types */
import { Col, Row } from "antd";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import readingTime from "utils/readingTime";
import styles from "../../styles/BlogContent.module.scss";
import BlogThumbnail from "./BlogThumbnail";

export default function BlogContent({
  post: {
    id,
    title,
    description,
    content,
    number_view,
    background,
    created,
    modified,
    topics,
  },
}) {
  const [posts, setPosts] = React.useState([]);

  const fetchPosts = async () => {
    const url = ApiConstant.GET_POST;
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setPosts(response.data.filter((post) => post.id !== id).slice(0, 11));
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="wrapper ">
        <div className={styles.contentWrapper}>
          <div
            className={styles.img}
            style={{ backgroundImage: `url(${background})` }}
          ></div>
          <div className="container">
            <div className={styles.blogContent}>
              <div className={styles.topic}>
                {topics.map((topic) => (
                  <span key={topic.id} className="button-tag">
                    {topic.title}
                  </span>
                ))}
              </div>
              <h1 className="heading heading-section">{title}</h1>
              <p>
                {" "}
                {modified
                  ? new Date(modified).toLocaleDateString()
                  : new Date(created).toLocaleDateString()}{" "}
                • {readingTime(content)} phút đọc • {number_view} lượt xem
              </p>
              <hr />
              <i className={styles.description}>
                {ReactHtmlParser(description)}
              </i>
              <div className={styles.content}>{ReactHtmlParser(content)}</div>
              <div className={styles.credit}>MEMORAVEL.VN</div>
            </div>
          </div>
        </div>
        <div className="container">
          <h1 className="heading heading-section">Tin tức khác</h1>
          <Row gutter={30}>
            {posts.map((post) => (
              <Col key={post.id} sm={24} md={12}>
                <BlogThumbnail post={post} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
