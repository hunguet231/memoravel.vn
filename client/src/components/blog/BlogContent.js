/* eslint-disable react/prop-types */
import React from "react";
import ReactHtmlParser from "react-html-parser";
import readingTime from "utils/readingTime";
import styles from "../../styles/BlogContent.module.scss";

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
  },
}) {
  return (
    <>
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
            <i className={styles.description}>{ReactHtmlParser(description)}</i>
            <div className={styles.content}>{ReactHtmlParser(content)}</div>
            <div className={styles.credit}>MEMORAVEL.VN</div>
          </div>
        </div>
      </div>
    </>
  );
}
