import { PhoneNumberUtil } from 'google-libphonenumber';

export function usePhone() {
  const phoneUtil = PhoneNumberUtil.getInstance();

  return (tel, locale) => {
    const phone = tel.slice(locale.dialCode.length);
    const countryCode = locale.countryCode.toUpperCase();
    if (tel.length < 5) return false;

    const collectionNumber = phoneUtil.parseAndKeepRawInput(phone, countryCode);

    return (
      phoneUtil.isValidNumber(collectionNumber) &&
      phoneUtil.isPossibleNumber(collectionNumber) &&
      phoneUtil.isValidNumberForRegion(collectionNumber, countryCode)
    );
  };
}
