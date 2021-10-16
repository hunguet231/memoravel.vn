import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { MainLayout } from "layouts";
import { CKEditorComponent } from "components";
import Header from "components/common/Header";
import ShowcaseProduct from "components/ShowcaseProduct";
import TopProduct from "components/TopProduct";
import Feedback from "components/Feedback";

const Home = () => {
  const { t: getLabel, i18n } = useTranslation();

  const onChangeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <MainLayout>
      {/* <button onClick={() => onChangeLanguage("vi")}>
        {getLabel(LangConstant.TXT_VIETNAMESE)}
      </button>
      <button onClick={() => onChangeLanguage("en")}>
        {getLabel(LangConstant.TXT_ENGLISH)}
      </button>
      <div style={{ width: "50vw" }}>
        <CKEditorComponent />
      </div> */}
      <Header />
      <ShowcaseProduct />
      <TopProduct />
      <Feedback />
    </MainLayout>
  );
};

export default Home;
