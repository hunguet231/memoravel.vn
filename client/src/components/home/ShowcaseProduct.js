import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BoxImage from "components/common/BoxImage";
import Button from "components/common/Button";
import React from "react";
import styles from "../../styles/ShowcaseProduct.module.scss";

const ShowcaseProduct = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.showcase}>
          <h1 className="heading heading-section text-center">
            Sản phẩm làng nghề
          </h1>
          <ul className="flex justify-between">
            <li>Tất cả</li>
            <li>Bình</li>
            <li>Ấm chén</li>
            <li>Đĩa</li>
            <li>Tranh</li>
            <li>Quần áo</li>
            <li>Nội thất</li>
            <li>Trang trí</li>
          </ul>
          <div className={styles.images}>
            <BoxImage
              className={styles.bg1}
              imgUrl={"/images/maytre.png"}
              subHeading={"MEMORAVEL.VN"}
              heading={
                <>
                  Làng mây tre đan <br /> Phú Vinh
                </>
              }
              iconMore={<ArrowForwardIcon />}
            />
            <BoxImage
              className={styles.bg2}
              imgUrl={"/images/dam-cuoi-chuot.png"}
              subHeading={"MEMORAVEL.VN"}
              heading={<>Làng tranh Đông Hồ</>}
              iconMore={<ArrowForwardIcon />}
            />
            <BoxImage
              className={styles.bg3}
              imgUrl={"/images/lang-lua-van-phuc.png"}
              subHeading={"MEMORAVEL.VN"}
              heading={
                <>
                  Làng lụa <br /> Vạn Phúc
                </>
              }
              iconMore={<ArrowForwardIcon />}
            />
            <BoxImage
              className={styles.bg4}
              imgUrl={"/images/gom-bat-trang.png"}
              subHeading={"MEMORAVEL.VN"}
              heading={
                <>
                  Làng gốm <br /> Bát Tràng
                </>
              }
              iconMore={<ArrowForwardIcon />}
            />
          </div>
          <div className={styles.button}>
            <Button type="secondary">Xem tất cả</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseProduct;
