import Head from "next/head";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import styles from "../styles/Cart.module.css";

const cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  return cart.length === 0 ? (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <h1 style={{ color: "#fff" }}>Giỏ hàng trống</h1>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <h1>Cart, giỏ hàng</h1>
        </div>
      </div>
    </>
  );
};

export default cart;
