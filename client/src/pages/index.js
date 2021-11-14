import React from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "layouts";
import Header from "components/common/Header";
import CarouselHeader from "components/CarouselHeader";
import Achievements from "components/Achievements";
import MemoStory from "components/MemoStory";
import ShowcaseProduct from "components/home/ShowcaseProduct";
import TopProduct from "components/home/TopProduct";
import Feedback from "components/home/Feedback";
import News from "components/home/News";
import ContactForm from "components/common/ContactForm";
import ProductCard from "components/ProductCard";

const Home = () => {
  const { t: getLabel, i18n } = useTranslation();

  const onChangeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <MainLayout>
      <Header />
      <CarouselHeader />
      <ShowcaseProduct />
      <ProductCard />
      <Achievements />
      <MemoStory />
      <TopProduct />
      <Feedback />
      <News />
      <ContactForm />
    </MainLayout>
  );
};

export default Home;
