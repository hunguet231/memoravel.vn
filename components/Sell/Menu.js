import {
  InfoCircleOutlined,
  AppstoreAddOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";
import { Divider, Menu as AntdMenu } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import useWindowSize from "../../utils/useWindowSize";

const { SubMenu } = AntdMenu;

const Menu = ({ getClickedMenu }) => {
  const { state, dispatch } = useContext(DataContext);

  const size = useWindowSize();

  const router = useRouter();

  const handleMenuClick = (e) => {
    getClickedMenu(e.key);
  };

  return (
    <div>
      <AntdMenu
        style={{
          background: "#e0bf74",
          color: "#fff",
          width: "100%",
          overflowX: "hidden",
          // height: size.width <= 380 ? "auto" : "100vh",
          height: "auto",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        mode="inline"
        theme="light"
        onClick={handleMenuClick}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <h3 style={{ margin: "10px auto 20px", color: "#fff" }}>
            Cài đặt Shop
          </h3>
          {/* <Link href="/" passHref>
              <Image src={logo} alt="TnD Group" />
            </Link> */}
        </div>
        <AntdMenu.Item key="0" icon={<InfoCircleOutlined />}>
          Thông tin shop
        </AntdMenu.Item>
        <AntdMenu.Item key="1" icon={<AppstoreAddOutlined />}>
          Quản lý sản phẩm
        </AntdMenu.Item>
        <AntdMenu.Item key="2" icon={<CodeSandboxOutlined />}>
          Quản lý đơn hàng
        </AntdMenu.Item>
      </AntdMenu>
    </div>
  );
};

export default Menu;
