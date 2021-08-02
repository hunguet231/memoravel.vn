import Image from "next/image";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";
import TextBox from "../components/TextBox";
import memImg3 from "../public/mem-box-3.png";
import styles from "../styles/MemDetails.module.css";

export default function memoravel() {
  return (
    <div>
      <main className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <div className="mem-box details">
            <div className="mem-inner">
              <TextBox
                supHeading="where you go is the key"
                heading="Memoravel"
                description="Memoravel cung cấp các tour du lịch trải nghiệm thực tế và thực tế ảo (VR) tại các làng nghề truyền thống.
              Khách hàng sẽ có những trải nghiệm sống cùng, làm cùng các nghệ nhân tại làng nghề truyền thống, trải nghiệm các giai đoạn hình thành của sản phẩm."
                memoravel
              />
              <Image src={memImg3} alt="Memoravel" />
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
