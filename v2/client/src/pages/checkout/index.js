import React from "react";
import { MainLayout } from "layouts";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import Checkout from "components/checkout/Checkout";
import ContactForm from "components/common/ContactForm";

export default function order() {
  return (
    <MainLayout title="Đặt hàng">
      <Header />
      <Checkout />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
}
