import React from "react";
import { Col, Image, Row } from "antd";
import styles from "../styles/MemoStory.module.scss";

export default function MemoStory() {
  return (
    <div className="wrapper">
      <div className={styles.storyWrapper}>
        <div className="container">
          <Row>
            <Col span={10} className="flex flex-wrap content-center">
              <div className="heading">
                Câu chuyện của <br /> Memoravel
              </div>
              <p className={styles.storyDescription}>
                Develop a website by finding a product identity that has value and branding to
                become a characteristic of a company. We will also facilitate the business marketing
                of these products with our SEO experts so that they become a ready-to-use website
                and help sell a product from the company Develop a website by finding a product
                identity that has value and branding to become a characteristic of a company. We
                will also facilitate the business marketing of these products with our SEO experts
                so that they become a ready-to-use website and help sell a product from the
                company...
              </p>
              <a href="#" className={styles.storyLink}>
                Đọc tất cả câu chuyện
              </a>
            </Col>
            <Col span={14}>
              <div className="flex justify-center">
                <Image src="/images/story.png" preview={false} className={styles.img} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
