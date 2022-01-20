import Contact from "components/common/Contact";
import ContactForm from "components/common/ContactForm";
import Header from "components/common/Header";
import { MainLayout } from "layouts";
import Footer from "components/common/Footer";
import React from "react";

export default function blog() {
  return (
    <MainLayout title="Liên hệ | Memoravel">
      <Header />
      <Contact />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
}
