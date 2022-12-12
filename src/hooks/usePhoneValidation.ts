import { PhoneNumberUtil } from 'google-libphonenumber';
import { useState } from 'react';

export function usePhoneValidation() {
  const [isValid, setIsValid] = useState<boolean>(false);
  const phoneUtil = PhoneNumberUtil.getInstance();
  return (phoneNumber, countryRegion) => {
    try {
      const number = phoneUtil.parseAndKeepRawInput(phoneNumber, countryRegion);
      setIsValid(phoneUtil.isValidNumberForRegion(number, countryRegion));
    } catch (e) {
      setIsValid(false);
    }

    return {
      isValid,
    };
  };
}
