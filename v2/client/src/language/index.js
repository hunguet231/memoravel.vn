import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { LangConstant } from "const";
import enLang from "./resources/en";
import viLang from "./resources/vi";

i18next.use(initReactI18next).init(
  {
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: LangConstant.DEFAULT_LANG,
    resources: {
      en: enLang,
      vi: viLang,
    },
    defaultNS: LangConstant.NS_COMMON,
  },
  err => {
    if (err) {
      return console.error(err);
    }
  },
);

export default i18next;

export const getLabel = key => i18next.getFixedT(i18next.language)(key);
