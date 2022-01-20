/* eslint-disable react/react-in-jsx-scope */
import styles from "styles/CartEmpty.module.scss";
import Button from "components/common/Button";
import Link from "next/link";

export default function OrderEmpty() {
  return (
    <div className={styles.container}>
      <div className={styles.cartEmptyImg}>
        <img src="/images/bag-cross.png" alt="Empty" />
      </div>
      <h1 className="heading heading-section heading-primary">
        Bạn chưa có đơn hàng nào
      </h1>
      <div className={styles.content}>
        Hãy chọn những sản phẩm tuyệt vời trong cửa hàng và đặt ngay nhé!
      </div>
      <div>
        <Link href="/shop">
          <Button type="secondary">Đi tới cửa hàng</Button>
        </Link>
      </div>
    </div>
  );
}
