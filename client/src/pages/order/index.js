import React from "react";
import { MainLayout } from "layouts";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import OrderList from "components/order/OrderList";
import ContactForm from "components/common/ContactForm";

export default function order() {
  return (
    <MainLayout>
      <Header />
      <OrderList />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
}
