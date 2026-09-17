import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import messages from './local/index';

i18n
  .use(initReactI18next)
  .init({
    resources: messages,

    // Langue utilisée uniquement si une traduction
    // n'existe pas dans la langue sélectionnée.
    fallbackLng: 'en',

    // Ne force PAS une langue au démarrage.
    // La langue peut donc être changée avec i18n.changeLanguage().
    debug: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
