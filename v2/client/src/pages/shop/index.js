import Shop from "components/shop/Shop";
import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import { ShopLayout } from "layouts";
import React from "react";

export default function shop() {
  return (
    <ShopLayout>
      <Header />
      <Shop />
      <ContactForm />
      <Footer />
    </ShopLayout>
  );
}
