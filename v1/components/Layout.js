import { UpCircleOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import React from "react";
import useWindowSize from "../utils/useWindowSize";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const size = useWindowSize();

  const style = {
    height: 40,
    width: 40,
    position: "fixed",
    bottom: size.width >= 1275 ? 10 : 35,
    right: size.width >= 1275 ? 65 : 15,
    lineHeight: "40px",
    color: "#fff",
    fontSize: 30,
  };

  return (
    <div>
      <Navbar />
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
