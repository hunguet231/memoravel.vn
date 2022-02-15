import { HeaderLayout, ManageLayout } from "layouts";
import React from "react";

const Seo = () => {
  return (
    <ManageLayout>
      <HeaderLayout title="Tối ưu SEO" hideCreateBtn />
      <div style={{ margin: "20px 15px 20px" }}>
        Truy cập Google Search Console (Đăng nhập gmail Memoravel):{" "}
        <a
          style={{ color: "dodgerblue" }}
          href="https://search.google.com/u/6/search-console?resource_id=https%3A%2F%2Fmemoravel.vn%2F"
          target="_blank"
          rel="noreferrer"
        >
          TẠI ĐÂY
        </a>
      </div>
    </ManageLayout>
  );
};

export default Seo;
