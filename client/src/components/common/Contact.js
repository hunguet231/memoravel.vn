/* eslint-disable react/prop-types */
import React from "react";
import styles from "styles/BlogContent.module.scss";

export default function Contact() {
  return (
    <>
      <div className="wrapper ">
        <div className={styles.contentWrapper}>
          <div className="container">
            <br />
            <h2 style={{ fontSize: "16px", fontWeight: 600 }}>
              MEMORAVEL.VN | Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát
              triển Làng nghề truyền thống.
            </h2>
            <ul>
              <li>Website: http://memoravel.vn</li>
              <li>SĐT: 037 673 1701</li>
              <li>Email: memoravelvietnam@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
