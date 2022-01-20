import React from "react";
import { MainLayout } from "layouts";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import Cart from "components/cart/Cart";
import ContactForm from "components/common/ContactForm";

export default function cart() {
  return (
    <MainLayout title="Giỏ hàng">
      <Header />
      <Cart />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
}
