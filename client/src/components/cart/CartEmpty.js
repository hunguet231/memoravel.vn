/* eslint-disable react/react-in-jsx-scope */
import styles from "styles/CartEmpty.module.scss";
import Button from "components/common/Button";
import Link from "next/link";

export default function Cart() {
  return (
    <div className={styles.container}>
      <div className={styles.cartEmptyImg}>
        <img src="/images/bag-cross.png" alt="Cart Empty" />
      </div>
      <h1 className="heading heading-section heading-primary">
        Giỏ hàng của bạn đang trống
      </h1>
      <div className={styles.content}>
        Hãy chọn những sản phẩm tuyệt vời rồi quay lại đây nhé!
      </div>
      <div>
        <Link href="/shop">
          <Button type="secondary">Quay lại mua sắm</Button>
        </Link>
      </div>
    </div>
  );
}
