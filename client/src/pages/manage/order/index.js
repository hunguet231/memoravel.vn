import { HeaderLayout, ManageLayout } from "layouts";
import React from "react";

const OrderMn = () => {
  return (
    <ManageLayout>
      <HeaderLayout title="Quản lý đơn hàng" hideCreateBtn />
      <div style={{ margin: "20px 15px 20px" }}>
        Quản lý đơn hàng trên GHTK:{" "}
        <a
          style={{ color: "dodgerblue" }}
          href="https://khachhang.giaohangtietkiem.vn/web/don-hang"
          target="_blank"
          rel="noreferrer"
        >
          TẠI ĐÂY
        </a>
      </div>
    </ManageLayout>
  );
};

export default OrderMn;
