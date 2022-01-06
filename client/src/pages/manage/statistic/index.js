import { HeaderLayout, ManageLayout } from "layouts";
import React from "react";

const StatisticMn = () => {
  return (
    <ManageLayout>
      <HeaderLayout title="Thống kê website" hideCreateBtn />
      <div style={{ margin: "20px 15px 20px" }}>
        Tuy cập Goole Analystics (Đăng nhập gmail Memoravel):{" "}
        <a
          style={{ color: "dodgerblue" }}
          href="https://analytics.google.com/analytics/web/provision/?authuser=6#/p298509343/reports/reportinghub"
          target="_blank"
          rel="noreferrer"
        >
          TẠI ĐÂY
        </a>
      </div>
    </ManageLayout>
  );
};

export default StatisticMn;
