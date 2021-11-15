import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import Achievements from "components/home/Achievements";
import CarouselHeader from "components/home/CarouselHeader";
import Feedback from "components/home/Feedback";
import MemoStory from "components/home/MemoStory";
import News from "components/home/News";
import ShowcaseProduct from "components/home/ShowcaseProduct";
import TopProduct from "components/home/TopProduct";
import { MainLayout } from "layouts";
import React from "react";

const Home = () => {
  return (
    <MainLayout>
      <Header />
      <CarouselHeader />
      <ShowcaseProduct />
      <TopProduct />
      <MemoStory />
      <Achievements />
      <Feedback />
      <News />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
};

export default Home;
