import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "../../styles/ContactForm.module.scss";

const ContactForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="wrapper">
      <div className={styles.contact}>
        <div className="container">
          <h1 className="heading heading-section text-center">
            Nhận tin tức mỗi ngày
          </h1>
          <div className={styles.subHeading}>
            Leverage agile frameworks to provide a robust synopsis for high
            level overviews. <br /> Iterative approaches to corporate strategy
            foster
          </div>
          <form onSubmit={onSubmit}>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="Nhập email của bạn" />
              <div className={styles.iconBtn}>
                <div className={styles.circle}>
                  <ArrowRightOutlined />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
