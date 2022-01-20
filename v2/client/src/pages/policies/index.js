import Policies from "components/policy/Policies";
import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import { MainLayout } from "layouts";
import React from "react";

export default function shop() {
  return (
    <MainLayout title="Điều khoản | Memoravel">
      <Header />
      <Policies />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
}
