import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// Vous pouvez retirer ou garder LanguageDetector selon votre besoin, mais retirez 'lng: "en"'
import messages from './local/index';

i18n
  .use(initReactI18next)
  .init({
    // lng: 'en', // Supprimé pour éviter de verrouiller la langue
    fallbackLng: 'en',
    debug: false,
    resources: messages,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
