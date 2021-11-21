/* eslint-disable react/prop-types */
import React from "react";
import readingTime from "utils/readingTime";
import styles from "../../styles/BlogContent.module.scss";
import ReactHtmlParser from "react-html-parser";
import { AppConstant } from "const";
import { NextSeo } from "next-seo";

export default function BlogContent({
  post: {
    title,
    description,
    content,
    number_view,
    background,
    created,
    modified,
    topics,
    alias,
  },
}) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${AppConstant.LANDING_URL}/${alias}`}
        openGraph={{
          url: `${AppConstant.LANDING_URL}/${alias}`,
          title,
          description,
          images: [
            {
              url: background,
              width: 800,
              height: 600,
              alt: title,
              type: "image/jpeg",
            },
            {
              url: background,
              width: 900,
              height: 800,
              alt: title,
              type: "image/jpeg",
            },
            { url: background },
          ],
          site_name: "Memoravel",
        }}
      />
      <div className="wrapper ">
        <div className={styles.contentWrapper}>
          <div
            className={styles.img}
            style={{ backgroundImage: `url(${background})` }}
          ></div>
          <div className="container">
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
            <i className={styles.description}>{description}</i>
            <div className={styles.content}>{ReactHtmlParser(content)}</div>
            <div className={styles.credit}>MEMORAVEL.VN</div>
          </div>
        </div>
      </div>
    </>
  );
}
