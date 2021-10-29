import { Col, Image, Row } from "antd";
import React from "react";
import styles from "../../styles/MemoStory.module.scss";

export default function MemoStory() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.storyWrapper}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className="heading heading-section">
                Câu chuyện của <br /> Memoravel
              </div>
              <p className={styles.storyDescription}>
                Develop a website by finding a product identity that has value
                and branding to become a characteristic of a company. We will
                also facilitate the business marketing of these products with
                our SEO experts so that they become a ready-to-use website and
                help sell a product from the company Develop a website by
                finding a product identity that has value and branding to become
                a characteristic of a company. We will also facilitate the
                business marketing of these products with our SEO experts so
                that they become a ready-to-use website and help sell a product
                from the company...
              </p>
              <a href="#" className={styles.storyLink}>
                Đọc tất cả câu chuyện
              </a>
            </div>
            <div className={styles.col}>
              <div className={`${styles.img} flex justify-center`}>
                <img src="/images/story.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
