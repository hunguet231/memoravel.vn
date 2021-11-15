import React from "react";
import styles from "../../styles/BlogThumbnail.module.scss";

export default function BlogThumbnail() {
  return (
    <div className="wrapper">
      <div className={styles.container}>
        <img src="/images/blog_thumbnail.png" className={styles.imgThumb} />
        <button className="button-tag">Du lịch</button>
        <h2 className={styles.titleThumb}>
          What Traveling Greece For 2 Weeks Taught Me About Life
        </h2>
        <div>
          <p className={styles.description}>Jun 21, 2021 • 11 min read</p>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis lectus vitae nulla
            malesuada amet purus sed. A condimentum tempus a egestas sodales diam cras.
          </p>
        </div>
      </div>
    </div>
  );
}
