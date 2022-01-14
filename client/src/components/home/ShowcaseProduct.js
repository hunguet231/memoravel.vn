import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BoxImage from "components/common/BoxImage";
import Button from "components/common/Button";
import React, { useContext } from "react";
import Link from "next/link";
import styles from "../../styles/ShowcaseProduct.module.scss";
import { changeFilter } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";
import { useRouter } from "next/router";
import { productTypes } from "utils/productTypes";

const ShowcaseProduct = () => {
  const { state, dispatch } = useContext(DataContext);
  const { filter } = state;

  const router = useRouter();

  const handleSearch = (type, value) => {
    if (type === "type") {
      dispatch(changeFilter({ ...filter, type: value }));
    } else if (type === "made_in") {
      dispatch(changeFilter({ ...filter, made_in: value }));
    }
    router.push(`/shop`);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.showcase}>
          <h1 className="heading heading-section text-center">
            Sản phẩm làng nghề
          </h1>
          <ul className="flex justify-between">
            <li onClick={() => handleSearch("type", "")}>Tất cả</li>
            {productTypes.map((type) => (
              <li key={type.id} onClick={() => handleSearch("type", type.name)}>
                {type.name}
              </li>
            ))}
          </ul>
          <div className={styles.images}>
            <BoxImage
              goShop
              handleSearch={handleSearch}
              made_in="Làng mây tre đan Phú Vinh"
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
              goShop
              handleSearch={handleSearch}
              made_in="Làng tranh Đông Hồ"
              className={styles.bg2}
              imgUrl={"/images/dam-cuoi-chuot.png"}
              subHeading={"MEMORAVEL.VN"}
              heading={<>Làng tranh Đông Hồ</>}
              iconMore={<ArrowForwardIcon />}
            />
            <BoxImage
              goShop
              handleSearch={handleSearch}
              made_in="Làng lụa Vạn Phúc"
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
              goShop
              handleSearch={handleSearch}
              made_in="Làng gốm Bát Tràng"
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
          <Link href={`/shop`}>
            <div className={styles.button}>
              <Button type="secondary">Xem tất cả</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseProduct;
