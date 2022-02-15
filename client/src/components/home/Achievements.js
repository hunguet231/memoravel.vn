import React from "react";
import styles from "../../styles/MemoStory.module.scss";

export default function Achievements() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.storyWrapper}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={`${styles.img} flex justify-center`}>
                <img src="/images/memoravel-bg.jpg" />
              </div>
            </div>
            <div className={styles.col}>
              <div className="heading heading-section">
                Thành tựu của chúng tôi
              </div>
              <div className={styles.storyDescription}>
                <ul>
                  <li>
                    <p>
                      - Giải nhất của cuộc thi Long- life Creative Learners
                      Bootcamp do trường Đại học Bách khoa Hà Nội và Global
                      Wales, Công ty Trách nhiệm hữu hạn Đầu tư và Phát triển
                      Công nghệ Bách khoa Hà Nội ( BK Holdings ) cùng với trường
                      Đại học Bangor, Vương Quốc Anh đồng tổ chức.
                    </p>
                  </li>
                  <li>
                    <p>
                      - Top 6 cuộc thi ươm tạo khởi nghiệp Neuron do trường Đại
                      học Kinh tế Quốc dân tổ chức.
                    </p>
                  </li>
                  <li>
                    <p>
                      - Top 2 đội đại diện Trường Đại học Kinh tế quốc dân tham
                      gia cuộc thi SV – Startup do Bộ GD&ĐT tổ chức.
                    </p>
                  </li>
                  <li>
                    <p>- Top 30 cuộc thi khởi nghiệp cùng Kawai.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
