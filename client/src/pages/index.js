import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { MainLayout } from "layouts";
import { CKEditorComponent } from "components";
import Header from "components/common/Header";

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
    </MainLayout>
  );
};

export default Home;
