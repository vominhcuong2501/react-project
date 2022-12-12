import { parseCookies } from 'nookies';

export * from './useAuth';
export * from './useDisplay';
export * from './useGoogleCaptcha';

let language = '';
let country = '';

export const setLanguage = (val: string) => {
  language = val;
};

export const setCountry = (val: string) => {
  country = val;
};

export const isServer = () => !!typeof window;

export const getLocale = () => {
  if (isServer()) {
    const cookies = parseCookies();
    setLanguage(cookies.language);
    setCountry(cookies.country);
  }
  return { language, country };
};
