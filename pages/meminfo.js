import Image from "next/image";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";
import TextBox from "../components/TextBox";
import memImg1 from "../public/mem-box-1.png";
import styles from "../styles/MemDetails.module.css";

export default function meminfo() {
  return (
    <div>
      <main className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <div className="mem-box details">
            <div className="mem-inner">
              <TextBox
                supHeading="Get Started"
                heading="Meminfo"
                description="Meminfo là sản phẩm cung cấp thông tin Làng nghề Truyền Thống tại Việt Nam, mang lại cái nhìn tổng quan nhất về lịch sử hình thành, phát triển, cũng như sản phẩm nổi bật, con người Làng nghề."
                meminfo
              />
              <Image src={memImg1} alt="Meminfo" />
            </div>
          </div>
        </div>
      </main>
      <SubscribeForm />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
