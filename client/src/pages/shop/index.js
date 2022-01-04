import Shop from "components/shop/Shop";
import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import { MainLayout } from "layouts";
import React from "react";
import { AppHead } from "components";

export default function shop() {
  return (
    <MainLayout>
      <AppHead
        title="Shop | Memoravel.vn"
        description="Memoravel.vn là sàn thương mại điện tử chuyên biệt dành riêng cho sản phẩm thủ công mỹ nghệ Việt Nam ứng dụng công nghệ thực tế ảo tăng cường AR. Chỉ bằng một chạm quét mã QR, sản phẩm sẽ hiện lên trong không gian thực qua màn hình điện thoại giúp khách hàng dễ dàng tương tác với sản phẩm và tìm một vị trí trưng bày phù hợp."
        url="shop"
        ogImage="/images/memoravel-bg.jpg"
      />
      <Header />
      <Shop />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
}
