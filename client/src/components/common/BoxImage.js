/* eslint-disable react/prop-types */
import React from "react";
import styles from "../../styles/BoxImage.module.scss";

const BoxImage = ({
  className,
  imgUrl,
  subHeading,
  heading,
  iconMore,
  textMore,
}) => {
  return (
    <div
      className={`${className} ${styles.image}`}
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.text}>
          <div className={styles.subHeading}>{subHeading}</div>
          <h2 className="heading heading-white">{heading}</h2>
          {iconMore && <div className={styles.iconMore}>{iconMore}</div>}
          {textMore && <div className={styles.textMore}>{textMore}</div>}
        </div>
      </div>
    </div>
  );
};

export default BoxImage;
