import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Checkbox } from "antd";
import React from "react";
import styles from "styles/CartItem.module.scss";

export default function CartItem() {
  return (
    <div className="wrapper">
      <div className={styles.wrapInfo}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.row}>
              <Checkbox />
              <img src="/images/gom-bat-trang.png" className={styles.img} />
            </div>
          </div>
          <div className={`${styles.row} ${styles.content}`}>
            <div className={styles.col}>
              <p className={styles.nameProduct}>Bình sứ Vạn Phúc</p>
            </div>
            <div className={styles.col}>
              <div className={styles.wrapAmount}>
                <button className={styles.changeAmountBtn}> - </button>
                <input className={styles.inputAmount} type="number" />
                <button className={styles.changeAmountBtn}> + </button>
              </div>
            </div>
            <div className={styles.col}>
              <div className="flex items-center justify-between">
                <p className={styles.price}>300.000.000 vnđ</p>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
