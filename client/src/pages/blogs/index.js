import Blogs from "components/blog/Blogs";
import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import { BlogLayout } from "layouts";
import React from "react";

export default function blogs() {
  return (
    <BlogLayout>
      <Header />
      <Blogs />
      <ContactForm />
      <Footer />
    </BlogLayout>
  );
}
