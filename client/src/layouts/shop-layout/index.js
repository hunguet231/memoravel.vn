import { NoSsr } from "@material-ui/core";
import { BackTop } from "antd";
import React from "react";

const ShopLayout = ({ children }) => {
  return (
    <NoSsr>
      <main>{children}</main>
      <BackTop />
    </NoSsr>
  );
};

export default ShopLayout;
