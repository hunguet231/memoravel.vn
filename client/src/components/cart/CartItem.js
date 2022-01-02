/* eslint-disable react/prop-types */
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { message } from "antd";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styles from "styles/CartItem.module.scss";
import numberWithDots from "utils/addDotsNumber";
import isInt from "utils/isInterger";
import removeNonNumeric from "utils/removeNonNumeric";
import { changeQty, deleteItem } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";

export default function CartItem({ item }) {
  const { id, name, images, quantity, price, in_stock, alias } = item;
  const [amount, setAmount] = useState(quantity);
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const decrease = () => {
    const newAmount = amount - 1;
    if (newAmount <= 0) {
      dispatch(changeQty(cart, id, 1));
      setAmount(1);
    } else {
      dispatch(changeQty(cart, id, newAmount));
      setAmount(newAmount);
    }
  };

  const increase = () => {
    const newAmount = amount + 1;
    if (newAmount > in_stock) {
      return message.error("Số lượng đặt vượt quá số lượng sản phẩm có sẵn!");
    } else {
      dispatch(changeQty(cart, id, newAmount));
      setAmount(newAmount);
    }
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    if (isInt(newAmount)) {
      dispatch(changeQty(cart, id, parseInt(newAmount)));
      setAmount(parseInt(newAmount));
    }
    if (newAmount === "") {
      dispatch(changeQty(cart, id, amount));
      setAmount("");
    }
  };

  const deleteCartItem = () => {
    dispatch(deleteItem(cart, [id], "ADD_CART"));
  };

  return (
    <div className="wrapper" style={{ width: "100%" }}>
      <div className={styles.wrapInfo}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.row}>
              <Link href={`/product/${alias}`}>
                <img src={images?.[0]?.image} className={styles.img} />
              </Link>
            </div>
          </div>
          <div className={`${styles.row} ${styles.content}`}>
            <Link href={`/product/${alias}`}>
              <div className={styles.col}>
                <p className={styles.nameProduct}>{name}</p>
              </div>
            </Link>
            <div className={styles.col}>
              <div className={styles.wrapAmount}>
                <button className={styles.changeAmountBtn} onClick={decrease}>
                  {" "}
                  -{" "}
                </button>
                <input
                  onChange={handleAmountChange}
                  type="text"
                  value={amount}
                  className={styles.inputAmount}
                />
                <button className={styles.changeAmountBtn} onClick={increase}>
                  {" "}
                  +{" "}
                </button>
              </div>
            </div>
            <div className={styles.col}>
              <div className="flex items-center justify-between">
                <p className={styles.price}>
                  {numberWithDots(parseInt(removeNonNumeric(price)) * quantity)}{" "}
                  vnđ
                </p>
                <IconButton onClick={deleteCartItem}>
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
