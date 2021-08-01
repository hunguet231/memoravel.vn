import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import styles from "../styles/Header.module.css";
import Navbar from "./Navbar";
import TextBox from "./TextBox";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.overlay}></div>
      <div className={styles.overlayBottom}></div>
      <Navbar />
      <div className={styles.heroLeft}>
        <p>Follow us</p>
        <p>
          <Tooltip placement="right" title="Instagram">
            <InstagramOutlined />
          </Tooltip>
        </p>
        <p>
          <a
            href="https://www.facebook.com/memoravel.vn"
            target="_blank"
            rel="noreferrer"
          >
            <Tooltip placement="right" title="Facebook">
              <FacebookOutlined />
            </Tooltip>
          </a>
        </p>
        <p>
          <Tooltip placement="right" title="Youtube">
            <YoutubeOutlined />
          </Tooltip>
        </p>
      </div>
      <div className={styles.heroRight}>
        <p>Start</p>
        <p>01</p>
        <p>02</p>
        <p>03</p>
      </div>

      <div className={styles.heroBox}>
        <TextBox
          hero
          supHeading="Vietnamese cultural traditions"
          heading="memoravel.vn"
          description={
            <p>
              Nền tảng cung cấp sản phẩm, dịch vụ hỗ trợ phát triển làng nghề
              truyền thống đầu tiên tại Việt Nam
            </p>
          }
          linkTo="scroll down"
          arrowDirection="down"
        />
      </div>
    </div>
  );
};

export default Header;
