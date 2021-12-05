import { Rate } from "antd";
import Button from "components/common/Button";
import "flickity/css/flickity.css";
import React from "react";
import Flickity from "react-flickity-component";
import useWindowSize from "utils/useWindowSize";
import styles from "../../styles/Feedback.module.scss";
import feedbacks from "../../utils/pageFeedbacks";

const Feedback = () => {
  const size = useWindowSize();

  const flickityOptions = {
    wrapAround: true,
    autoPlay: true,
  };

  return (
    <div className="wrapper">
      <div className={styles.feedback}>
        <div className="container">
          <h1 className="heading heading-section text-center">
            Người dùng nói gì về chúng tôi
          </h1>
          {size.width > 480 ? (
            <div className={styles.cards}>
              {feedbacks.map((feedback, index) => (
                <div key={index} className={styles.card}>
                  <div
                    className={styles.img}
                    // style={{ backgroundImage: `url(${feedback.img})` }}
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
          ) : (
            <Flickity options={flickityOptions}>
              {feedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className={`${styles.card} ${styles.cardSlider}`}
                >
                  <div className={styles.userBox}>
                    <div
                      className={styles.img}
                      // style={{ backgroundImage: `url(${feedback.img})` }}
                    ></div>
                    <div className="">
                      <div className={styles.author}>{feedback.author}</div>
                      <Rate
                        className={styles.rate}
                        disabled
                        defaultValue={feedback.rating}
                      />
                    </div>
                  </div>

                  <div className={styles.text}>
                    <div className={styles.title}>{feedback.title}</div>
                    <div className={styles.content}>{feedback.content}</div>
                  </div>
                </div>
              ))}
            </Flickity>
          )}
          <div className={styles.button}>
            <Button type="secondary">Xem thêm</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
