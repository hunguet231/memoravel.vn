import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import TextBox from "../components/TextBox";
import SubscribeForm from "../components/SubscribeForm";
import memImg1 from "../public/mem-box-1.png";
import memImg2 from "../public/mem-box-2.png";
import memImg3 from "../public/mem-box-3.png";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>
          Memoravel.vn | Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển
          Làng nghề truyền thống.
        </title>
        <meta
          name="description"
          content="Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển Làng nghề truyền thống."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Header />
      </header>

      <main className={styles.main}>
        <div className="mem-box">
          <div className="mem-inner">
            <TextBox
              supHeading="Get Started"
              heading="Meminfo"
              description="Meminfo là sản phẩm cung cấp thông tin Làng nghề Truyền Thống tại Việt Nam, mang lại cái nhìn tổng quan nhất về lịch sử hình thành, phát triển, cũng như sản phẩm nổi bật, con người Làng nghề."
              linkTo="read more"
              link="/meminfo"
              arrowDirection="right"
              meminfo
            />
            <Image src={memImg1} alt="Meminfo" />
          </div>
        </div>

        <div className="mem-box">
          <div className="mem-inner memdraw">
            <Image src={memImg2} alt="Memdraw" />
            <TextBox
              supHeading="Hiking Essentials"
              heading="Memdraw"
              description="Memdraw cung cấp các sản phẩm làng nghề truyền thống nổi bật như gốm Bát Tràng, tranh Đông Hồ, lụa Vạn Phúc, nón lá Làng Chuôm,...Đặc biệt khi mua hàng tại Memdraw khách hàng sẽ có trải nghiệm một cách chân thực các sản phẩm thông qua mô hình 3D kết hợp với công nghệ Thực tế ảo tăng cường (AR).
              Một điểm thú vị khác của dự án đó là khách hàng có thể thiết kế sản phẩm theo sở thích cá nhân."
              linkTo="read more"
              link="/memdraw"
              arrowDirection="right"
              memdraw
            />
          </div>
        </div>

        <div className="mem-box">
          <div className="mem-inner">
            <TextBox
              supHeading="where you go is the key"
              heading="Memoravel"
              description="Memoravel cung cấp các tour du lịch trải nghiệm thực tế và thực tế ảo (VR) tại các làng nghề truyền thống.
              Khách hàng sẽ có những trải nghiệm sống cùng, làm cùng các nghệ nhân tại làng nghề truyền thống, trải nghiệm các giai đoạn hình thành của sản phẩm."
              linkTo="read more"
              link="/memoravel"
              arrowDirection="right"
              memoravel
            />
            <Image src={memImg3} alt="Memoravel" />
          </div>
        </div>

        <SubscribeForm />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
