import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Arabic from "./Arabic.json"
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Name": "Name",
          "Age":"Age",
          "Submit":"Submit"
        }
      },
      ar:{
        translation:Arabic
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

   
  });