/* eslint-disable react/prop-types */
import { Col, Row } from "antd";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";
import { useRouter } from "next/router";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import readingTime from "utils/readingTime";
import styles from "../../styles/BlogContent.module.scss";
import BlogThumbnail from "./BlogThumbnail";
import SmallBlog from "./SmallBlog";
import { FacebookProvider, Like, Comments } from "react-facebook";

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
  const router = useRouter();

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
          <div
            className="container"
            style={{
              boxShadow: "0 0 50px 0 rgb(0 0 0 / 10%)",
              border: "1px #e9eef3 solid",
              padding: "20px",
            }}
          >
            <Row gutter={30}>
              <Col xs={24} md={16}>
                <div className={styles.blogContent}>
                  <div className={styles.topic}>
                    {topics.map((topic) => (
                      <span key={topic.id} className="button-tag">
                        {topic.title}
                      </span>
                    ))}
                  </div>
                  <h1 className="heading heading-section">{title}</h1>
                  <p
                    style={{
                      borderBottom: "1px solid #e7e7e7",
                      paddingBottom: "10px",
                    }}
                  >
                    {" "}
                    {modified
                      ? new Date(modified).toLocaleDateString()
                      : new Date(created).toLocaleDateString()}{" "}
                    • {readingTime(content)} phút đọc • {number_view} lượt xem
                  </p>
                  <FacebookProvider appId={AppConstant.FACEBOOK_APP_ID}>
                    <Like
                      href={`${AppConstant.LANDING_URL}${router.pathname}`}
                      colorScheme="dark"
                      showFaces
                      share
                    />
                  </FacebookProvider>
                  <i className={styles.description}>
                    {ReactHtmlParser(description)}
                  </i>
                  <div className={styles.content}>
                    {ReactHtmlParser(content)}
                  </div>
                  <div className={styles.credit}>MEMORAVEL.VN</div>

                  <div style={{ marginTop: "20px" }}>
                    <FacebookProvider appId={AppConstant.FACEBOOK_APP_ID}>
                      <Comments
                        href={`${AppConstant.LANDING_URL}${router.pathname}`}
                      />
                    </FacebookProvider>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <Row gutter={0} style={{ position: "sticky", top: "150px" }}>
                  <p className={styles.titleSmall}>Tin tức khác</p>
                  {posts.slice(0, 5).map((post) => (
                    <Col key={post.id} xm={24}>
                      <SmallBlog post={post} />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
        </div>

        <div className="container">
          <h1 className="heading heading-section">Tin liên quan</h1>
          <Row gutter={30}>
            {posts.map((post) => (
              <Col key={post.id} xs={24} md={8}>
                <BlogThumbnail post={post} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
