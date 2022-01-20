import React from "react";
import styles from "styles/Policies.module.scss";
import Link from "next/link";

const Policies = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.container}>
          <h1 className="heading heading-section text-center">
            Điều khoản <b>MEMORAVEL</b>
          </h1>
          <div className={styles.content}>
            <h2>Điều khoản tổng quát</h2>
            <ul>
              <li>
                <Link href="/policies/1">Chính sách bảo mật</Link>
              </li>
              <li>
                <Link href="/policies/2">Chính sách thanh toán</Link>
              </li>
              <li>
                <Link href="/policies/3">Chính sách trả hàng, hoàn tiền</Link>
              </li>
              <li>
                <Link href="/policies/4">
                  Chính sách vận chuyển và giao nhận
                </Link>
              </li>
              <li>
                <Link href="/policies/5">
                  Quy trình xử lý tranh chấp/khiếu nại
                </Link>
              </li>
              <li>
                <Link href="/policies/6">Tiêu chuẩn cộng đồng</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;
