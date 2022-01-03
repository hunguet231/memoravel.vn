/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Avatar, Checkbox, Radio } from "antd";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "styles/Cart.module.scss";
import { changeDelivers, deleteItem } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";
import CartItem from "./CartItem";

const CheckboxGroup = Checkbox.Group;

const OrderedList = ({ showCheckbox }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, shipments } = state;
  const options = cart.map(({ id }) => id);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [deliver, setDeliver] = useState([]);

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

  const onChangeDeliverOpt = (index, deliverVal) => {
    const cloneDeliver = [...deliver];
    cloneDeliver[index] = deliverVal;
    setDeliver(cloneDeliver);
    dispatch(changeDelivers(cloneDeliver));
  };

  const structedCart = cart.reduce((acc, cartItem) => {
    acc[cartItem.shop.name] = acc[cartItem.shop.name] || [];
    acc[cartItem.shop.name].push(cartItem);
    return acc;
  }, {});

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
        {Object.entries(structedCart).map(([key, value], index) => (
          <div key={key} className={styles.cartWrap}>
            <Link href={`/shop/${value[0].shop.alias}`}>
              <div className={styles.shopInfo} style={{ width: "100%" }}>
                <Avatar src={value[0].shop.avatar} />
                <span className={styles.shopName}>{key}</span>
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
                  Phương thức vận chuyển:{" "}
                  <Radio.Group
                    onChange={(e) => onChangeDeliverOpt(index, e.target.value)}
                    value={deliver[index] || "none"}
                    style={{ marginLeft: "10px" }}
                  >
                    <Radio value={"none"} defaultChecked>
                      Tiêu chuẩn
                    </Radio>
                    <Radio value={"xteam"}>Nhanh</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className={styles.shipingFee}>{shipments?.[index]?.fee}</div>
            </div>
          </div>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default OrderedList;
