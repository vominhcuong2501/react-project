/* eslint eqeqeq: 0 */
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { submitFormGetInTouchThunk, submitOtpGetInTouchThunk } from '@redux/app/thunks';
import { useAppDispatch } from '@redux/hooks';
import style from '@scss/components/group-get-In-touch.scss';
import { useState } from 'react';
import GetInTouchForm from './GetInTouchForm';
import GetInTouchOtp from './GetInTouchOtp';

interface GroupGetInTouchProps {
  bannerImage?: string;
}

const defaultProps = {
  bannerImage: '/images/get-in-touch.jpg',
};

export function GroupGetInTouch({ bannerImage }: GroupGetInTouchProps) {
  const dispatch = useAppDispatch();
  const [successOtpNumber, setSuccessOtpNumber] = useState(false);
  const [successOtp, setSuccessOtp] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isCodeSubmit, setIsCodeSubmit] = useState(false);
  const [isCodeSubmitskip, setIsCodeSubmitskip] = useState(false);
  const [isCodeSubmitnb, setIsCodeSubmitnb] = useState('');
  const [currentValues, setCurrentValues] = useState<any>({});
  const [formValuesResponseSubmitData, setFormValuesResponseSubmitData] = useState<any>({});
  const [phoneOtp, setPhoneOtp] = useState({});

  const handleSubmitForm = useDebouncedCallback(async (values) => {
    if (isSubmitSuccessful) return;
    const response: any = await dispatch(submitFormGetInTouchThunk(values));
    const result = response.payload.isSuccessful;
    setIsSubmitSuccessful(!!result);
    setFormValuesResponseSubmitData(response?.payload?.leadform || null);
    setPhoneOtp(response?.payload?.leadform?.phone);
    setCurrentValues(values);
  }, 1000);

  const handleSubmitVerify = useDebouncedCallback(async (values) => {
    if (values.length < 6) {
      setSuccessOtpNumber(true);
      setIsCodeSubmitnb(values);
    } else {
      const data = {
        ...values.split('').reduce((a, v, index) => ({ ...a, [`code_${index + 1}`]: v }), {}),
        id: formValuesResponseSubmitData?.id,
        phone: formValuesResponseSubmitData?.phone,
        country_code: currentValues.country_code.split('+', 1).toString(),
      };

      setSuccessOtpNumber(false);
      const res = await dispatch(submitOtpGetInTouchThunk(data));
      const result = res.payload.isSuccessful;
      setMessage(res.payload.message);
      setSuccessOtp(!!(result === 'true'));
      setIsCodeSubmit(true);
      setIsCodeSubmitnb(values);
    }
  }, 500);

  const handleSubmitFormSkip = () => {
    setIsCodeSubmitskip(true);
    setSuccessOtp(isCodeSubmitskip);
  };
  const FormDescription = () => (
    <div className="ibc__img">
      <img src={bannerImage} alt="get in touch" width="960" height="800" title="get in touch" />
    </div>
  );

  const SubmitFormIsSuccessfully = () => (
    <div className="ibc__form success">
      <h1>Thank you for getting in touch!</h1>
      <img src="/images/10355-loading-success.gif" alt="loading-success" title="success-verify" />
      <p>We appreciate you contacting us.</p>
      <p>We will get back in touch with you soon! Have a great day!</p>
    </div>
  );

  const FromValidationCode = () => (
    <div className="ibc__form">
      <div className="ibc-difference__content ">
        <h2>Verification Code</h2>
        <p>
          Please type the verification code sent to {JSON.stringify(phoneOtp).slice(1, 5)}****
          {JSON.stringify(phoneOtp).slice(9, -1)}
        </p>
      </div>

      <div className="box_verification">
        {successOtpNumber == true ? (
          <p className="eror_otp">Please enter number</p>
        ) : (
          !successOtp && isCodeSubmit && <p className="eror_otp">{message}</p>
        )}

        <GetInTouchOtp
          onSubmit={handleSubmitVerify}
          onValueChange={() => setIsCodeSubmit(false)}
          currentValue={isCodeSubmitnb}
        />
        <button className="skip" onClick={handleSubmitFormSkip}>
          Skip this step
        </button>
      </div>
    </div>
  );

  const FormGetInTouch = () => (
    <div className="ibc__form">
      <div className="ibc-difference__content">
        <h2>Get In Touch!</h2>
        <p>Make a difference and achieve the extraordinary. Let us help!</p>
      </div>
      <GetInTouchForm onSubmit={handleSubmitForm} />
    </div>
  );

  return (
    <>
      <style jsx>{style}</style>
      <section className="ibc_touch ibc-main">
        <FormDescription />
        {isSubmitSuccessful && !successOtp ? (
          <FromValidationCode />
        ) : (
          !successOtp && <FormGetInTouch />
        )}
        {successOtp && <SubmitFormIsSuccessfully />}
      </section>
    </>
  );
}

GroupGetInTouch.defaultProps = defaultProps;
