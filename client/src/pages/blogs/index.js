import Blogs from "components/blog/Blogs";
import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import { BlogLayout } from "layouts";
import { NextSeo } from "next-seo";
import React from "react";

export default function blogs() {
  return (
    <>
      <NextSeo
        title="Blog | Memoravel"
        description="Cập nhật tin tức mới nhất về mọi chủ đề liên quan đến làng nghề, sản phẩm, khuyến mãi.."
        openGraph={{
          url: `https://memoravel.vn/blogs`,
          title: "Blog | Memoravel",
          description:
            "Cập nhật tin tức mới nhất về mọi chủ đề liên quan đến làng nghề, sản phẩm, khuyến mãi..",
          images: [
            {
              url: "/images/memoravel-bg.jpg",
              width: 800,
              height: 600,
              alt: "Blog | Memoravel",
            },
          ],
          site_name: "Blog | Memoravel",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "bảo tồn bản sắc dân tộc, truyền thống văn hoá việt nam, bản sắc dân tộc, bản sắc văn hoá, làng nghề truyền thống, sản phẩm thủ công mỹ nghệ, thủ công mỹ nghệ, tranh đông hồ, gốm bát tràng, lụa vạn phúc, mây tre đan phú vinh, đồ truyền thống, quà tặng truyền thống, quà tặng thủ công mỹ nghệ, quà tặng dịp tết, thực tế ảo, thực tế ảo tăng cường AR, không gian thực, mua hàng thủ công mỹ nghệ, đồ trang trí, lang nghe truyen thong, san pham thu cong my nghe, thu cong my nghe, tranh dong ho, gom bat trang, lua van phuc, may tre dan phu vinh, do truyen thong, qua tang truyen thong, qua tang thu cong my nghe, qua tang dip tet, thuc te ao, thuc te ao tang cuong AR, khong gian thuc, mua hang thu cong my nghe, do trang tri",
          },
          {
            name: "description",
            content:
              "Cập nhật tin tức mới nhất về mọi chủ đề liên quan đến làng nghề, sản phẩm, khuyến mãi..",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://memoravel.vn/images/favicon.ico",
          },
        ]}
      />
      <BlogLayout>
        <Header />
        <Blogs />
        <ContactForm />
        <Footer />
      </BlogLayout>
    </>
  );
}
