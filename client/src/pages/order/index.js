import React from "react";
import { MainLayout } from "layouts";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import Order from "components/order/Order";
import ContactForm from "components/common/ContactForm";

export default function order() {
  return (
    <MainLayout>
      <Header />
      <Order />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
}
