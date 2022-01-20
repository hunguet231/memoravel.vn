import React from "react";
import styles from "../styles/SubscribeForm.module.css";

const SubscribeForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    alert("Submited!");
  };

  return (
    <div className={styles.form}>
      <div className={styles.title}>Memoravel.vn</div>
      <div className={styles.subTitle}>Subscribe Form</div>
      <form onSubmit={onSubmit}>
        <div className={styles.input}>
          <input type="text" placeholder="Email address" />
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscribeForm;
