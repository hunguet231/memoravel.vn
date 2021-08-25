import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import { Button } from "antd";

export default function ShippingForm() {
  const { state } = useContext(DataContext);
  const { cart, auth } = state;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.quantity * item.price;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  return (
    <>
      <form>
        <div>
          <label>Dia chi</label>
          <input type="text" />
        </div>
        <div>
          <label>So dien thoai</label>
          <input type="text" />
        </div>
      </form>
      <h3 style={{ color: "#fff" }}>Tong tien: {total}</h3>
      <Link href={auth.user ? "#" : "/login"}>
        <Button type="primary">Thanh toán</Button>
      </Link>
      <br />
      <Button type="primary">Thanh toán không đăng nhập</Button>
    </>
  );
}
