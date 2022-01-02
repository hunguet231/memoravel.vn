/* eslint-disable react/prop-types */
import { RightCircleFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Rating } from "@material-ui/lab";
import { Col, Image, message, Modal, Row } from "antd";
import { fetchData } from "api";
import Button from "components/common/Button";
import { ApiConstant, AppConstant } from "const";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "styles/ProductDetails.module.scss";
import isInt from "utils/isInterger";
import { addToCart } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";
import ProductDesc from "./ProductDesc";
import ProductRating from "./ProductRating";
import ProductRelated from "./ProductRelated";
import ProductStory from "./ProductStory";

export default function ProductDetails({ product }) {
  const {
    id,
    average_star,
    description,
    details,
    images,
    in_stock,
    made_in,
    name,
    price,
    rating,
    // shop,
    story,
    sold,
    type,
    summary,
    vectary_link,
  } = product;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentImg, setCurrentImg] = useState(1);
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState(1);
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const router = useRouter();

  const fetchProducts = async () => {
    const url = ApiConstant.GET_PRODUCT;
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setProducts(
        response.data.filter(
          (product) =>
            (product.type === type || product.made_in === made_in) &&
            product.id !== id
        )
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const decreaseAmount = () => {
    const newAmount = amount - 1;
    if (newAmount <= 0) {
      // dispatch(changeQty(cart, id, 1));
      setAmount(1);
    } else {
      // dispatch(changeQty(cart, id, newAmount));
      setAmount(newAmount);
    }
  };

  const increaseAmount = () => {
    const newAmount = amount + 1;
    if (newAmount > in_stock) {
      return message.error("Số lượng đặt vượt quá số lượng sản phẩm có sẵn!");
    } else {
      // dispatch(changeQty(cart, id, newAmount));
      setAmount(newAmount);
    }
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    if (isInt(newAmount)) {
      // dispatch(changeQty(cart, id, parseInt(newAmount)));
      setAmount(parseInt(newAmount));
    }
    if (newAmount === "") {
      // dispatch(changeQty(cart, id, amount));
      setAmount("");
    }
  };

  const handleAddCart = () => {
    dispatch(addToCart(product, amount, cart));
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product, amount, cart));
    router.push("/cart");
  };

  const Details = () => (
    <div>
      <div className={styles.headingDetails}>Chi tiết sản phẩm</div>
      <div className={styles.detailsItem}>
        <p className={styles.label}>Kích thước:</p>
        <p>
          Cao: {JSON.parse(details).height}cm | Dài: {JSON.parse(details).len}cm
          | Rộng: {JSON.parse(details).width}cm
        </p>
      </div>
      <div className={styles.detailsItem}>
        <p className={styles.label}>Khối lượng:</p>
        <p>
          {Math.round((parseInt(JSON.parse(details).weight) / 1000) * 100) /
            100}
          kg
        </p>
      </div>
      <div className={styles.detailsItem}>
        <p className={styles.label}>Nơi sản xuất:</p>
        <p>{made_in}</p>
      </div>
      <div className={styles.detailsItem} onClick={showModal}>
        <Button type="primary" style={{ width: "100%" }}>
          <div
            className="flex justify-between items-center"
            style={{ width: "100%" }}
          >
            <div className={styles.textAR}>
              Trải nghiệm hình ảnh <br /> sản phẩm thực tế với AR
            </div>

            <div>
              <RightCircleFilled className={styles.circleRightIcon} />
            </div>
          </div>
        </Button>
      </div>
      <Modal
        title={name}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <a href="https://youtu.be/Ly9w_dh3gkA">
          <p>Xem hướng dẫn</p>
        </a>
        <iframe
          src={vectary_link}
          frameBorder="0"
          width="100%"
          height="480"
        ></iframe>
      </Modal>
    </div>
  );

  const renderThumbs = () => {
    const renderItems = images.map((item, index) => (
      <img key={index} src={item.image} alt="" className={styles.thumb} />
    ));
    return renderItems;
  };

  const onCarouselChange = (curr) => {
    setCurrentImg(curr);
  };

  return (
    <div className="wrapper">
      <div className={styles.productWrapper}>
        <div className={styles.entryDetails}>
          <div className="container">
            <Row classsName={styles.entryContent}>
              <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                <Carousel
                  infinite={false}
                  infiniteLoop
                  renderThumbs={renderThumbs}
                  onChange={onCarouselChange}
                >
                  {images.map((imageObj, index) => (
                    <div key={index} className={styles.wrapImg}>
                      <Image
                        width={"100%"}
                        preview={{ visible: false }}
                        src={imageObj.image}
                        className={styles.img}
                        onClick={() => setVisible(true)}
                      />
                    </div>
                  ))}
                </Carousel>
                <div style={{ display: "none" }}>
                  <Image.PreviewGroup
                    preview={{
                      visible,
                      current: currentImg,
                      onVisibleChange: (vis) => setVisible(vis),
                    }}
                  >
                    {images.map((item, index) => (
                      <Image key={index} src={item.image} />
                    ))}
                  </Image.PreviewGroup>
                </div>
              </Col>
              <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 1 }}>
                <h1
                  className={`heading heading-section heading-primary ${styles.heading}`}
                >
                  {name}
                </h1>

                <h3 className={styles.subHeading}>{summary}</h3>
                <div
                  className="flex justify-start items-center"
                  style={{ marginBottom: "20px" }}
                >
                  <span className={styles.rating}>
                    {average_star} &nbsp;
                    <Rating
                      style={{ color: "#F3692E" }}
                      readOnly
                      precision={0.5}
                      defaultValue={0}
                      size="small"
                    />
                  </span>
                  <div className={styles.divider} />
                  <a href="#rating">
                    <span className={styles.info}>
                      {rating?.length} Đánh giá{" "}
                    </span>
                  </a>
                  <div className={styles.divider} />
                  <span className={styles.info}>{sold} Đã bán</span>
                </div>
                <h1 className="heading heading-section heading-primary">
                  {price} vnđ
                </h1>
                <Details />
                <div className={styles.amountContainer}>
                  <span className={styles.label}>Số lượng:</span>{" "}
                  <button className={styles.btnAmount} onClick={decreaseAmount}>
                    -
                  </button>
                  <input
                    onChange={handleAmountChange}
                    type="text"
                    value={amount}
                    className={styles.inputAmount}
                  />
                  <button className={styles.btnAmount} onClick={increaseAmount}>
                    +
                  </button>
                  <p className={styles.inStock}>Còn lại {in_stock} sản phẩm</p>
                </div>
                <div
                  className="flex justify-between gap-1"
                  style={{ marginTop: "10px" }}
                >
                  <Button
                    onClick={handleAddCart}
                    type="outline"
                    style={{ width: "100%" }}
                    className={styles.addCartButton}
                  >
                    <span className={styles.textBtn}>Thêm vào giỏ</span>{" "}
                    <ShoppingCartOutlined className={styles.cartIcon} />
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    type="primary"
                    style={{ width: "100%" }}
                  >
                    <span className={styles.textBtn}> Mua Ngay</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="container">
          <ProductDesc description={description} />
          {story !== "" && (
            <ProductStory story={story} name={name} images={images} />
          )}
          <div id="rating">
            <ProductRating rating={rating} />
          </div>
          {products.length > 0 && <ProductRelated products={products} />}
        </div>
      </div>
    </div>
  );
}
