import React from "react";
import { Rate } from "antd";
import feedbacks from "../utils/pageFeedbacks";
import styles from "../styles/Feedback.module.scss";

const Feedback = () => {
  return (
    <div className="wrapper">
      <div className={styles.feedback}>
        <div className="container">
          <h1 className="heading heading-section text-center">
            Người dùng nói gì về chúng tôi
          </h1>
          <div className={styles.cards}>
            {feedbacks.map((feedback, index) => (
              <div key={index} className={styles.card}>
                <div
                  className={styles.img}
                  style={{ backgroundImage: `url(${feedback.img})` }}
                ></div>
                <div className={styles.text}>
                  <Rate
                    className={styles.rate}
                    disabled
                    defaultValue={feedback.rating}
                  />
                  <div className={styles.title}>{feedback.title}</div>
                  <div className={styles.content}>{feedback.content}</div>
                  <div className={styles.author}>{feedback.author}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.button}>
            <div className="button button-secondary align-center text-center">
              Xem thêm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
