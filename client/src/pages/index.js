import { fetchData } from "api";
import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import Achievements from "components/home/Achievements";
import CarouselHeader from "components/home/CarouselHeader";
import Feedback from "components/home/Feedback";
import MemoStory from "components/home/MemoStory";
import News from "components/home/News";
import ShowcaseProduct from "components/home/ShowcaseProduct";
import { ApiConstant, AppConstant } from "const";
import { MainLayout } from "layouts";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [news, setNews] = useState([]);

  const fecthNews = async (page = 1, search = "", topic_id = null) => {
    let url =
      ApiConstant.GET_POST +
      `?paging=${1}&page=${page}&size=${4}&search=${search}`;
    if (topic_id) {
      url += `&topic_id=${topic_id}`;
    }
    const response = await fetchData(url, ApiConstant.METHOD.get);
    if (response?.status === AppConstant.STATUS_OK) {
      setNews({
        ...response,
        data: response.data.map((item) => ({
          ...item,
          title: item.title,
          description: item.description,
          content: item.content,
          alias: item.alias,
        })),
      });
    }
  };

  useEffect(() => {
    fecthNews();
  }, []);

  return (
    <MainLayout>
      <Header />
      <CarouselHeader />
      <ShowcaseProduct />
      {/* <TopProduct /> */}
      <MemoStory />
      <Achievements />
      <Feedback />
      <News news={news.data} />
      <ContactForm />
      <Footer />
    </MainLayout>
  );
};

export default Home;
