import { Button } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobalState";
import addCommas from "../utils/addCommas";
import removeNonNumeric from "../utils/removeNonNumeric";

export default function ShippingForm() {
  const { state } = useContext(DataContext);
  const { cart, auth } = state;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((acc, cur) => {
        return acc + cur.quantity * parseInt(removeNonNumeric(cur.price));
      }, 0);
      setTotal(addCommas(res));
    };
    getTotal();
  }, [cart]);

  return (
    <>
      <h3 style={{ color: "#fff" }}>Tổng thanh toán: {total} ₫</h3>
      <form>
        <div>
          <label>Địa chỉ</label>
          <input type="text" />
        </div>
        <div>
          <label>Số điện thoại</label>
          <input type="text" />
        </div>
      </form>

      <Link passHref href={auth.user ? "/payment" : "/login"}>
        <Button type="primary">Thanh toán</Button>
      </Link>
    </>
  );
}
