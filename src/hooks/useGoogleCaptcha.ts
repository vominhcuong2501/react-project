import { googleCaptchaThunk } from '@redux/app/thunks';
import { useAppDispatch } from '@redux/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useGoogleCaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [googleToken, setGReCaptchaToken] = useState(null);
  const dispatch = useAppDispatch();
  const [valid, setValid] = useState(true);

  const validateGoogleCaptcha = async () => {
    if (!googleToken) return;
    const response = await dispatch(googleCaptchaThunk(googleToken));
    if (googleCaptchaThunk.fulfilled.match(response)) {
      const { tokenProperties }: any = response.payload;
      setValid(tokenProperties.valid);
    }
  };

  useEffect(() => {
    validateGoogleCaptcha();
  }, [googleToken]);

  const handleSubmitData = useCallback(async () => {
    if (!executeRecaptcha) return;
    try {
      const response = await executeRecaptcha('enquiryFormSubmit');
      await setGReCaptchaToken(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      return null;
    }
  }, [executeRecaptcha]);

  return { googleToken, handleSubmitData, valid };
};
