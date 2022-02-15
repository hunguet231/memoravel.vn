import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "flickity/css/flickity.css";
import React from "react";
import Flickity from "react-flickity-component";
import styles from "../../styles/CarouselHeader.module.scss";
import Button from "../common/Button";
import Link from "next/link";

export default function CarouselHeader() {
  const flickityOptions = {
    wrapAround: true,
    autoPlay: true,
  };

  return (
    <>
      <div className="wrapper">
        <div className="container-fluid">
          <div className={styles.heroWrapper}>
            <Flickity options={flickityOptions}>
              <div className={styles.banner}>
                <img src="/images/carousel-min.png" alt="Banner" />
                <div className={styles.text}>
                  <h1 className={styles.heading}>MEMORAVEL</h1>
                  <h2 className={styles.subHeading}>
                    Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển làng
                    nghề truyền thống đầu tiên tại Việt Nam
                  </h2>
                  <Link href="/shop" passHref>
                    <Button type="primary">
                      Mua sắm ngay <ChevronRightIcon />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className={styles.banner}>
                <img src="/images/carousel-min.png" alt="Banner" />
                <div className={styles.text}>
                  <h1 className={styles.heading}>MEMORAVEL</h1>
                  <h2 className={styles.subHeading}>
                    Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển làng
                    nghề truyền thống đầu tiên tại Việt Nam
                  </h2>
                  <Link href="/shop" passHref>
                    <Button type="primary">
                      Mua sắm ngay <ChevronRightIcon />
                    </Button>
                  </Link>
                </div>
              </div>
            </Flickity>
          </div>
        </div>
      </div>
    </>
  );
}
