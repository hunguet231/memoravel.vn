/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ShopOutlined } from "@ant-design/icons";
import { Avatar, Checkbox } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "styles/Cart.module.scss";
import numberWithDots from "utils/addDotsNumber";
import { deleteItem } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";
import CartItem from "./CartItem";

const CheckboxGroup = Checkbox.Group;

const OrderedList = ({ showCheckbox, structedCart }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const options = cart.map(({ id }) => id);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [list, setList] = useState(structedCart);

  useEffect(() => {
    setList(structedCart);
  }, [structedCart]);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onDeleteItems = async () => {
    dispatch(deleteItem(cart, checkedList, "ADD_CART"));
    setCheckedList([]);
  };

  return (
    <div>
      {showCheckbox && (
        <div className={styles.wrapperCheckbox}>
          <div>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              &nbsp; Chọn tất cả
            </Checkbox>
          </div>
          {checkedList.length > 0 && (
            <div onClick={onDeleteItems} className="cursor-pointer">
              {" "}
              Xoá {checkedList.length} mục
            </div>
          )}
        </div>
      )}

      <CheckboxGroup
        value={checkedList}
        onChange={onChange}
        style={{ width: "100%" }}
      >
        {list &&
          Object.entries(list).map(([key, value]) => (
            <div key={key} className={styles.cartWrap}>
              <Link href={`/shop/${value[0].shop.alias}`}>
                <div className={styles.shopInfo} style={{ width: "100%" }}>
                  <div>
                    <Avatar
                      className={styles.shopAvatar}
                      src={value[0].shop.avatar}
                    />
                  </div>
                  <div className={styles.shopName}>{key}</div>
                  <div className={styles.viewShopBtn}>
                    <div>
                      <ShopOutlined style={{ marginRight: "5px" }} />
                    </div>
                    <div>Xem shop</div>
                  </div>
                </div>
              </Link>
              {value.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  {showCheckbox && <Checkbox value={item.id} />}{" "}
                  <CartItem item={item} />
                </div>
              ))}
              <div className={styles.shipingInfo}>
                <div className={styles.shipingDeliver}>
                  <div className="flex items-center ">
                    Đơn bị vận chuyển:{" "}
                    <span className={styles.shipingPartner}>
                      Giao hàng tiết kiệm (Tiêu chuẩn)
                    </span>
                    {value.fee ? (
                      <span className={styles.fee}>
                        {value.delivery
                          ? `Phí ship: ${numberWithDots(value.fee)} vnđ`
                          : `Chưa hỗ trợ giao`}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex items-center ">
                    <span className={styles.shipingTime}>
                      Dự kiến nhận hàng sau 3 - 5 ngày
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </CheckboxGroup>
    </div>
  );
};

export default OrderedList;
