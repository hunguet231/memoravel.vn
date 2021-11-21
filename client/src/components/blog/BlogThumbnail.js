import React from "react";
import PropTypes from "prop-types";
import readingTime from "utils/readingTime";
import Link from "next/link";
import styles from "../../styles/BlogThumbnail.module.scss";

export default function BlogThumbnail({
  post: {
    alias,
    topics,
    title,
    description,
    content,
    background,
    created,
    number_view,
    modified,
  },
}) {
  return (
    <div className="wrapper">
      <div className={styles.container}>
        <Link href={`/blogs/${alias}`}>
          <div
            className={styles.imgThumb}
            style={{ backgroundImage: `url(${background})` }}
          ></div>
        </Link>
        <button className="button-tag">{topics[0].title}</button>

        <h2 className={styles.titleThumb}>
          <Link href={`/blogs/${alias}`}>{title}</Link>
        </h2>

        <div>
          <p className={styles.description}>
            {modified
              ? new Date(modified).toLocaleDateString()
              : new Date(created).toLocaleDateString()}{" "}
            • {readingTime(content)} phút đọc • {number_view} lượt xem
          </p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}

BlogThumbnail.propTypes = {
  post: PropTypes.array,
};
