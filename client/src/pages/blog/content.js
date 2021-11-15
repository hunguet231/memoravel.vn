import React from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "layouts";
import Header from "components/common/Header";

import ContactForm from "components/common/ContactForm";
import BlogContent from "components/blog/BlogContent";

export default function page() {
  const { t: getLabel, i18n } = useTranslation();

  const onChangeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };
  return (
    <MainLayout>
      <Header />
      <BlogContent />
      <ContactForm />
    </MainLayout>
  );
}
