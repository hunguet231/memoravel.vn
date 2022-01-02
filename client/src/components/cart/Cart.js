/* eslint-disable react/react-in-jsx-scope */
import { Checkbox, Col, Row } from "antd";
import styles from "styles/Cart.module.scss";
import CartItem from "./CartItem";
import CardCode from "./CardCode";
import TotalItemCard from "./TotalItemCard";
import { useContext, useState } from "react";
import { DataContext } from "../../../store/GlobalState";
import { deleteItem } from "../../../store/Actions";

const CheckboxGroup = Checkbox.Group;

export default function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const options = cart.map(({ id }) => id);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

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
    <div className="wrapper">
      <div className="container">
        <div className={styles.container}>
          <h1 className="heading heading-section heading-primary">
            Giỏ hàng ({cart.length})
          </h1>
          <Row gutter={12}>
            <Col xs={24} lg={17}>
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
              <CheckboxGroup
                value={checkedList}
                onChange={onChange}
                style={{ width: "100%" }}
              >
                {cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <Checkbox value={item.id} /> <CartItem item={item} />
                  </div>
                ))}
              </CheckboxGroup>
            </Col>
            <Col xs={24} lg={7}>
              <CardCode />
              <TotalItemCard />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
