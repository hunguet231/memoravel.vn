import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import readingTime from "utils/readingTime";
import styles from "../../styles/BlogThumbnail.module.scss";

export default function SmallBlog({
  post: { alias, title, content, background, created, number_view, modified },
}) {
  return (
    <div className="wrapper">
      <div className={styles.containerSmall}>
        <Link href={`/blogs/${alias}`}>
          <div className={styles.imgThumbSmall}>
            <img src={background} alt="" />
          </div>
        </Link>
        <div className={styles.text}>
          <h2 className={styles.titleThumbSmall}>
            <Link href={`/blogs/${alias}`}>{title}</Link>
          </h2>

          <div>
            <p className={styles.description}>
              {modified
                ? new Date(modified).toLocaleDateString()
                : new Date(created).toLocaleDateString()}{" "}
              • {readingTime(content)} phút đọc • {number_view} lượt xem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

SmallBlog.propTypes = {
  post: PropTypes.array,
};
