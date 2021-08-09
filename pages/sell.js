/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { message, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";
import UploadImg from "../components/UploadImg";
import { DataContext } from "../store/GlobalState";
import styles from "../styles/Form.module.css";
import { patchData } from "../utils/fetchData";
import getImgUrl from "../utils/getImgUrl";

export default function sell() {
  const router = useRouter();
  const initalState = { shop_name: "", shop_description: "" };
  const [userData, setUserData] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const { shop_name, shop_description } = userData;
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [picture, setPicture] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errMsg =
      !auth.user.shop_name &&
      !auth.user.shop_description &&
      (!shop_name || !shop_description)
        ? true
        : false;

    if (!errMsg) {
      setLoading(true);
      let picture_url = "";

      if (picture) {
        picture_url = await getImgUrl(picture, "memoravel_shop-avatar");
      }
      const res = await patchData(
        "users",
        {
          ...userData,
          shop_avatar: picture_url,
        },
        auth.token
      );

      if (res.err) {
        message.error(res.err);
        setLoading(false);
      } else {
        message.success(res.msg);
        setLoading(false);

        dispatch({
          type: "AUTH",
          payload: {
            token: auth.token,
            user: res.user,
          },
        });

        router.push(`/shop-profile/${auth.user.id}`);
      }
    } else {
      message.error("Hãy nhập tất cả các trường!");
    }
  };

  useEffect(() => {
    if (Object.keys(auth).length === 0) router.push("/");
    if (!auth.user.is_first_create_shop)
      router.push(`/shop-profile/${auth.user.id}`);
  }, [auth]);

  const getImage = (image, type) => {
    setPicture(image);
  };

  if (!auth.user) return null;

  return (
    <>
      <div className={styles.container}>
        <div className="overlay"></div>
        <div className="overlay-bottom"></div>
        <div className={styles.inner}>
          <h1 className={styles.title}>Cập nhật thông tin shop</h1>
          {auth.user.is_first_create_shop ? (
            <h2 className={styles.subTitle}>
              Chào mừng bạn đến với Kênh bán hàng của MEMORAVEL. Hãy hoàn thành
              một số thiết lập để bắt đầu!
            </h2>
          ) : (
            ""
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="shop_name"
                placeholder={auth.user.shop_name || "Tên shop của bạn"}
                className={styles.inputField}
                value={shop_name}
                defaultValue={auth.user.shop_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <textarea
                rows="4"
                name="shop_description"
                placeholder={auth.user.shop_description || "Mô tả về shop"}
                className={styles.inputFieldArea}
                value={shop_description}
                defaultValue={auth.user.shop_description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <div>
                <div>Chọn ảnh đại diện shop</div>
                <small>(Kích thước tối đa 2MB, định dạng PNG/JPG)</small>
              </div>
              <UploadImg
                getImageUrl={getImage}
                type="shop_avatar"
                defaultData={auth.user.shop_avatar}
              />
            </div>
            <br />
            <button type="submit" className={styles.submitBtn}>
              {loading && <Spin className={styles.spin} />} GHI NHẬN
            </button>
          </form>
        </div>
      </div>
      <div>
        <SubscribeForm />
        <Footer />
      </div>
    </>
  );
}
