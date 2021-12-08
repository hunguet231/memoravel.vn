/* eslint-disable react/prop-types */
import React from "react";
import Link from "next/link";
import styles from "../../styles/BoxImage.module.scss";

const BoxImage = ({
  className,
  imgUrl,
  subHeading,
  heading,
  iconMore,
  textMore,
  link,
}) => {
  return (
    <Link href={`/blogs/${link}`}>
      <div
        className={`${className} ${styles.image}`}
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.text}>
            <div className={styles.subHeading}>{subHeading}</div>
            <h2 className="heading heading-white">{heading}</h2>
            {iconMore && <div className={styles.iconMore}>{iconMore}</div>}
            {textMore && (
              <div className={styles.textMore}>
                <Link href={`/blogs/${link}`}>{textMore}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoxImage;
