/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CircularProgress } from "@material-ui/core";
import Button from "components/common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import styles from "styles/TotalItemCard.module.scss";
import numberWithDots from "utils/addDotsNumber";
import removeNonNumeric from "utils/removeNonNumeric";
import { DataContext } from "../../../store/GlobalState";
export default function TotalItemCard({
  onCheckoutButtonClick,
  disabled,
  structedCart,
  loading,
}) {
  const router = useRouter();
  const { state } = useContext(DataContext);
  const { cart } = state;
  const [totalShip, setTotalShip] = useState("");

  useEffect(() => {
    let total = 0;
    structedCart &&
      Object.entries(structedCart).map(([key, val]) => {
        total += val.fee;
      });
    setTotalShip(total);
  }, [structedCart]);

  const onButtonClick = () => {
    if (router.pathname === "/cart") {
      router.push("/checkout");
    } else if (router.pathname === "/checkout") {
      onCheckoutButtonClick(true);
    } else {
      router.push("/shop");
    }
  };

  const totalPaid = numberWithDots(
    cart.reduce((acc, curr) => {
      return acc + curr.quantity * parseInt(removeNonNumeric(curr.price));
    }, 0)
  );

  return (
    <div className="wrapper">
      <div className={styles.card}>
        <h2 className={styles.title}>Tổng số sản phẩm </h2>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between">
            <p className={styles.itemCheck}>
              <span className={styles.label}>
                x{item.quantity} &nbsp; &nbsp;
              </span>
              {item.name}
            </p>
          </div>
        ))}

        <br />
        <div className={styles.hr} />
        <div className="flex justify-between">
          <p className={styles.label}>Tạm tính:</p>
          <p>{totalPaid} vnđ</p>
        </div>
        <div className="flex justify-between">
          <p className={styles.label}>Phí ship:</p>
          <p>
            {router.pathname === "/cart"
              ? "Chưa bao gồm"
              : `+ ${numberWithDots(totalShip || "0")} vnđ`}
          </p>
        </div>
        <div className="flex justify-between">
          <p className={styles.label}>Giảm giá:</p>
          <p>- 0 vnđ</p>
        </div>
        <div className={styles.hr} />
        {router.pathname === "/checkout" ? (
          <div className="flex justify-between">
            <p className={styles.label}>Tổng:</p>
            <p className={styles.label}>
              {numberWithDots(
                parseInt(totalPaid.replaceAll(".", "")) + (totalShip || 0)
              )}{" "}
              vnđ
            </p>
          </div>
        ) : (
          ""
        )}

        {router.pathname === "/checkout" && (
          <div className={styles.noteText}>
            Bấm vào ĐẶT HÀNG là bạn đã đồng ý với <br />
            <a
              className={styles.linkText}
              href="https://memoravel.vn/policies"
              target="_blank"
              rel="noreferrer"
            >
              điều khoản & chính sách
            </a>{" "}
            của MEMORAVEL
          </div>
        )}

        <Button
          disabled={disabled}
          type="primary"
          onClick={onButtonClick}
          style={{ width: "100%" }}
        >
          {loading && (
            <CircularProgress
              size={20}
              style={{ color: "#fff", marginRight: 5 }}
            />
          )}
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
  onCheckoutButtonClick: PropTypes.func,
};
