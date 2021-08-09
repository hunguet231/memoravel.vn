import Image from "next/image";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";
import TextBox from "../components/TextBox";
import VectaryIframe from "../components/VectaryIframe";
import memImg2 from "../public/mem-box-2.png";
import styles from "../styles/MemDetails.module.css";

export default function memdraw() {
  return (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <div className="mem-box details">
            <div className="mem-inner">
              <TextBox
                supHeading="Hiking Essentials"
                heading="Memdraw"
                description="Memdraw cung cấp các sản phẩm làng nghề truyền thống nổi bật như gốm Bát Tràng, tranh Đông Hồ, lụa Vạn Phúc, nón lá Làng Chuôm,...Đặc biệt khi mua hàng tại Memdraw khách hàng sẽ có trải nghiệm một cách chân thực các sản phẩm thông qua mô hình 3D kết hợp với công nghệ Thực tế ảo tăng cường (AR).
              Một điểm thú vị khác của dự án đó là khách hàng có thể thiết kế sản phẩm theo sở thích cá nhân."
                memdraw
              />
              {/* <Image src={memImg2} alt="Memdraw" /> */}
              <VectaryIframe
                id="4af2ad3b-80bd-45ab-9eb2-d0e10e00565e"
                src="https://www.vectary.com/viewer/v1/?model=4af2ad3b-80bd-45ab-9eb2-d0e10e00565e&env=studio3&turntable=-12"
              />
            </div>
          </div>
        </div>
        <div>
          <SubscribeForm />
          <Footer />
        </div>
      </div>
    </>
  );
}
