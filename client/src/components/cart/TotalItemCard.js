import Button from "components/common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import styles from "styles/TotalItemCard.module.scss";
export default function TotalItemCard({ onCheckoutButtonClick }) {
  const router = useRouter();

  const onButtonClick = () => {
    if (router.pathname === "/cart") {
      router.push("/checkout");
    } else if (router.pathname === "/checkout") {
      onCheckoutButtonClick(true);
    } else {
      router.push("/shop");
    }
  };

  return (
    <div className="wrapper">
      <div className={styles.card}>
        <h2 className={styles.title}>Tổng số sản phẩm </h2>
        <div className="flex justify-between">
          <p className={styles.itemCheck}>
            <span className={styles.label}>X2 &nbsp; &nbsp;</span>
            Bình sứ Vạn Phúc
          </p>
        </div>
        <div className="flex justify-between">
          <p className={styles.itemCheck}>
            <span className={styles.label}>X2 &nbsp; &nbsp;</span>
            Nón lá
          </p>
        </div>
        <div className="flex justify-between">
          <p className={styles.itemCheck}>
            <span className={styles.label}>X2 &nbsp; &nbsp;</span>
            Vải
          </p>
        </div>
        <div className="flex justify-between">
          <p className={styles.itemCheck}>
            <span className={styles.label}>X2 &nbsp; &nbsp;</span>
            Chén
          </p>
        </div>
        <br />
        <div className={styles.hr} />
        <div className="flex justify-between">
          <p className={styles.label}>Tạm tính:</p>
          <p>9.000.000.000 vnđ</p>
        </div>
        <div className="flex justify-between">
          <p className={styles.label}>Phí ship:</p>
          <p>Miễn phí</p>
        </div>
        <div className="flex justify-between">
          <p className={styles.label}>Giảm giá:</p>
          <p>1.000.000 vnđ</p>
        </div>
        <div className={styles.hr} />
        <div className="flex justify-between">
          <p className={styles.label}>Tổng:</p>
          <p className={styles.label}>8.999.000.000 vnđ</p>
        </div>
        <Button
          type="primary"
          onClick={onButtonClick}
          style={{ width: "100%" }}
        >
          {router.pathname === "/cart" ? "KIỂM TRA THÔNG TIN" : "ĐẶT HÀNG"}
        </Button>
        <div style={{ textAlign: "center" }}>
          <Link href="/shop">Quay lại mua sắm</Link>
        </div>
      </div>
    </div>
  );
}

TotalItemCard.propTypes = {
  onCheckoutButtonClick: PropTypes.func.isRequired,
};
