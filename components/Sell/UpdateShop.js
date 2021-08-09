/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { message, Spin } from "antd";
import React, { useContext, useState, useEffect } from "react";
import UploadImg from "../../components/UploadImg";
import { DataContext } from "../../store/GlobalState";
import styles from "../../styles/Form.module.css";
import stylesBasic from "../../styles/BasicContainer.module.css";
import { patchData } from "../../utils/fetchData";
import getImgUrl from "../../utils/getImgUrl";

export default function UpdateShop() {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/login");
    return;
  }, [auth]);

  const initalState = {
    shop_name: auth.user && auth.user.shop_name,
    shop_description: auth.user && auth.user.shop_description,
  };
  const [userData, setUserData] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const { shop_name, shop_description } = userData;
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
      }
    } else {
      message.error("Hãy nhập tất cả các trường!");
    }
  };

  const getImage = (image, type) => {
    setPicture(image);
  };

  if (!auth.user) return null;

  return (
    <>
      <div className={stylesBasic.container}>
        <h1 className="title">Cập nhật thông tin shop</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>Tên shop</div>
            <input
              type="text"
              name="shop_name"
              className={styles.inputField}
              defaultValue={auth.user.shop_name}
              value={shop_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div>Mô tả shop</div>
            <textarea
              rows="4"
              name="shop_description"
              className={styles.inputFieldArea}
              defaultValue={auth.user.shop_description}
              value={shop_description}
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
    </>
  );
}
