import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      readMore: 'Read More',
      save: 'Save',
    },
  },
  cz: {
    translation: {
      readMore: 'Přečtěte si více',
      save: 'Uložit',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
