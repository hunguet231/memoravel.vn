import { NoSsr } from "@material-ui/core";
import { BackTop } from "antd";
import { AppHead } from "components";
import React from "react";

const ShopLayout = ({ children }) => {
  return (
    <NoSsr>
      <AppHead {...DEFAULT_APP_HEADER} />
      <main>{children}</main>
      <BackTop />
    </NoSsr>
  );
};

export default ShopLayout;

const DEFAULT_APP_HEADER = {
  title: "Shop | Memoravel",
  description:
    "Mua sắm hàng ngàn sản phẩm nguồn gốc chính hãng với chất lượng đảm bảo.",
  keywords:
    "bảo tồn bản sắc dân tộc, truyền thống văn hoá việt nam, bản sắc dân tộc, bản sắc văn hoá, làng nghề truyền thống, sản phẩm thủ công mỹ nghệ, thủ công mỹ nghệ, tranh đông hồ, gốm bát tràng, lụa vạn phúc, mây tre đan phú vinh, đồ truyền thống, quà tặng truyền thống, quà tặng thủ công mỹ nghệ, quà tặng dịp tết, thực tế ảo, thực tế ảo tăng cường AR, không gian thực, mua hàng thủ công mỹ nghệ, đồ trang trí, lang nghe truyen thong, san pham thu cong my nghe, thu cong my nghe, tranh dong ho, gom bat trang, lua van phuc, may tre dan phu vinh, do truyen thong, qua tang truyen thong, qua tang thu cong my nghe, qua tang dip tet, thuc te ao, thuc te ao tang cuong AR, khong gian thuc, mua hang thu cong my nghe, do trang tri",
  url: "shop",
  ogImage: "/images/memoravel-bg.jpg",
};
