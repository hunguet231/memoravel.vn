import { UpCircleOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import React from "react";

const style = {
  height: 40,
  width: 40,
  position: "fixed",
  bottom: 10,
  right: 60,
  lineHeight: "40px",
  color: "#fff",
  fontSize: 30,
};

const Layout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
      <BackTop>
        <div style={style}>
          <UpCircleOutlined />
        </div>
      </BackTop>
    </div>
  );
};

export default Layout;
