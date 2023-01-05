/* eslint eqeqeq: 0 */
import appStyle from '@/scss/pages/home/index.scss';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { IListCofig } from '@interfaces/make-an-enquire';
import { submitFormGetInTouchThunk, submitOtpGetInTouchThunk } from '@redux/app/thunks';
import { useAppDispatch } from '@redux/hooks';
import { useState } from 'react';
import GetInForm from './GetInForm';
import GetInOtp from './GetInOtp';
import Infos from './Infos';

interface ServicesListProps {
  configFuture: IListCofig;
}
export function MakeAnEnquiryForm({ configFuture }: ServicesListProps) {
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
  const CallUsForm = () => (
    <div className="ibc_info_form call-form">
      <Infos configFuture={configFuture} />
    </div>
  );
  const SubmitFormIsSuccessfully = () => (
    <div className="ibc__form success">
      <h1>Thank you for getting in touch!</h1>
      <img src="/images/10355-loading-success.gif" alt="loading-success" title="success-verify" />
      <p>We appreciate you contacting us. </p>
      <p>We will get back in touch with you soon! Have a great day!</p>
    </div>
  );
  const FromValidationCode = () => (
    <div className="ibc__form">
      <div className="ibc-difference__content">
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
        <GetInOtp
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
      <div className="ibc-difference__content make_custum">
        <h2>Let’s Get Started!</h2>
        <p>Make a difference and achieve the extraordinary. Let us help!</p>
      </div>
      <GetInForm onSubmit={handleSubmitForm} />
    </div>
  );

  return (
    <>
      <style jsx>{appStyle}</style>
      <section className="ibc_touch ibc-main ibc-make">
        {isSubmitSuccessful && !successOtp ? (
          <FromValidationCode />
        ) : (
          !successOtp && <FormGetInTouch />
        )}
        {successOtp && <SubmitFormIsSuccessfully />}
        <CallUsForm />
      </section>
    </>
  );
}
