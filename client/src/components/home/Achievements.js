import { Card, Image } from "antd";
import React from "react";
import styles from "../../styles/Achievements.module.scss";

export default function Achievements() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.achieveWrapper}>
          <div className="heading heading-section text-center">
            Thành tựu của chúng tôi
          </div>
          <div className="flex justify-center text-center ">
            <p className={styles.subHeading}>
              Develop a website by finding a product identity that has value and
              branding to become a characteristic of a company. We will also
              facilitate the business marketing of these products with our SEO
              experts so that they become a ready-to-use website and help sell a
              product from the company.
            </p>
          </div>
          <div className={styles.cards}>
            <Card className={styles.achieveCard}>
              <Image
                src="/images/achieve1.png"
                preview={false}
                className={styles.achieveImg}
              />
              <div className={styles.achieveName}>Brand of The Year - 2019</div>
            </Card>
            <Card className={styles.achieveCard}>
              <Image
                src="/images/achieve2.png"
                preview={false}
                className={styles.achieveImg}
              />
              <div className={styles.achieveName}>
                Most Valuable Brand - 2020
              </div>
            </Card>
            <Card className={styles.achieveCard}>
              <Image
                src="/images/achieve3.png"
                preview={false}
                className={styles.achieveImg}
              />
              <div className={styles.achieveName}>Top of Brand - 2020</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
