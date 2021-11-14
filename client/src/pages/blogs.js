import React from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "layouts";
import Header from "components/common/Header";
import Blogs from "../components/blog/Blogs";
import ContactForm from "components/common/ContactForm";

export default function blogs() {
  const { t: getLabel, i18n } = useTranslation();

  const onChangeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };
  return (
    <MainLayout>
      <Header />
      <Blogs />
      <ContactForm />
    </MainLayout>
  );
}
