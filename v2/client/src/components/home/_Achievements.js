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
          {/* <div className="flex justify-center text-center ">
            <p className={styles.subHeading}>
              Với niềm đam mê, nhiệt huyết tuổi trẻ, trang thương mại điện tử
              Memoravel trong quá trình hình thành và phát triển đã đạt được một
              số thành tựu nổi bật. Memoravel.vn đã và đang hợp tác với một số
              nghệ nhân có tên tuổi tại làng gốm Bát Tràng và làng Tranh Đông Hồ
              - đó cũng là một trong những thành tựu to lớn của chúng tôi trong
              quá trình thương mại hoá sản phẩm.
            </p>
          </div> */}
          <div className={styles.cards}>
            <Card className={styles.achieveCard}>
              <Image
                src="/images/achievement_3.png"
                preview={false}
                className={styles.achieveImg}
              />
              <div className={styles.achieveName}>
                Chung kết SV-Startup do Bộ GD&ĐT tổ chức.
              </div>
            </Card>
            <Card className={styles.achieveCard}>
              <Image
                src="/images/achievement_1.png"
                preview={false}
                className={styles.achieveImg}
              />
              <div className={styles.achieveName}>
                Giải nhất của cuộc thi Long- life Creative Learners Bootcamp.
              </div>
            </Card>
            <Card className={styles.achieveCard}>
              <Image
                src="/images/achievement_2.png"
                preview={false}
                className={styles.achieveImg}
              />
              <div className={styles.achieveName}>
                Top 6 cuộc thi ươm tạo khởi nghiệp Neuron.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
