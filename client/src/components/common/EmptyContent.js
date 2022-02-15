/* eslint-disable react/react-in-jsx-scope */
import styles from "styles/CartEmpty.module.scss";

export default function Empty() {
  return (
    <div
      className={styles.container}
      style={{ background: "#fff", margin: 0, paddingTop: "30px" }}
    >
      <div className={styles.cartEmptyImg}>
        <img src="/images/bag-cross.png" alt="Empty" />
      </div>
      <h1 className="heading heading-section heading-primary">
        Không có dữ liệu
      </h1>
      <div className={styles.content}>
        Chưa có đơn hàng nào trong trạng thái đã chọn!
      </div>
    </div>
  );
}
