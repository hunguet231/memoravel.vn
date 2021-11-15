import BlogContent from "components/blog/BlogContent";
import Blogs from "components/blog/Blogs";
import ContactForm from "components/common/ContactForm";
import Header from "components/common/Header";
import { MainLayout } from "layouts";
import React from "react";

export default function blog() {
  return (
    <MainLayout>
      <Header />
      <Blogs />
      {/* <BlogContent /> */}
      <ContactForm />
    </MainLayout>
  );
}
