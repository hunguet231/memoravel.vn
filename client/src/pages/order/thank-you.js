/* eslint-disable react/react-in-jsx-scope */
import styles from "styles/CartEmpty.module.scss";
import Button from "components/common/Button";
import Link from "next/link";
import { MainLayout } from "layouts";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import ContactForm from "components/common/ContactForm";

export default function Thanks() {
  return (
    <MainLayout>
      <Header />
      <div className={styles.container}>
        <div className={styles.cartEmptyImg}>
          <img src="/images/done.png" alt="Done" />
        </div>
        <h1 className="heading heading-section heading-primary">
          Cảm ơn bạn đã đặt hàng
        </h1>
        <div className={styles.content}>
          Đơn hàng của bạn đã hoàn tất. MEMORAVEL đang chuẩn bị hàng và sẽ sớm
          chuyển đến tay bạn.
        </div>
        <div>
          <Link href="/shop">
            <Button type="secondary">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
      <ContactForm />
      <Footer />
    </MainLayout>
  );
}
