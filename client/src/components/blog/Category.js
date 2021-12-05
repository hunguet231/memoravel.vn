import React from "react";
import PropTypes from "prop-types";
import styles from "../../styles/CatBlog.module.scss";

export default function Category({ topics }) {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.catWrapper}>
          <h1 className="heading heading-section text-center">
            CHỌN CHỦ ĐỀ QUAN TÂM
          </h1>
          <div className="flex flex-wrap">
            {topics.map((topic) => (
              <div className={styles.catItem} key={topic.id}>
                <div className={styles.catImg}></div>
                <div className={styles.catText}>{topic.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Category.propTypes = {
  topics: PropTypes.array,
};

Category.defaultProps = {
  topics: [],
};
