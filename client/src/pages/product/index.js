import React from "react";
import { MainLayout } from "layouts";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import ContactForm from "components/common/ContactForm";
import Products from "components/product/Products";

export default function product() {
  return (
    <MainLayout>
      <Header />
      <Products />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
}
