import appStyle from '@/scss/pages/home/index.scss';
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
  const [successOtp, setSuccessOtp] = useState(false);
  const [isValidFormField, setIsValidFormField] = useState(false);
  const [isCodeSubmit, setIsCodeSubmit] = useState(false);
  const [currentValues, setCurrentValues] = useState<any>({});
  const [formValuesResponseSubmitData, setFormValuesResponseSubmitData] = useState<any>({});
  const [phoneOtp, setPhoneOtp] = useState({});

  const handleSubmitForm = async (values) => {
    const response: any = await dispatch(submitFormGetInTouchThunk(values));
    const result = response.payload.isSuccessful;
    setIsValidFormField(!!result);
    setFormValuesResponseSubmitData(response?.payload?.leadform || null);
    setPhoneOtp(response?.payload?.leadform.phone);
    setCurrentValues(values);
  };

  const handleSubmitVerify = async (values) => {
    const data = {
      ...values.split('').reduce((a, v, index) => ({ ...a, [`code_${index + 1}`]: v }), {}),
      id: formValuesResponseSubmitData?.id,
      phone: formValuesResponseSubmitData?.phone,
      country_code: currentValues.country_code,
    };
    const res = await dispatch(submitOtpGetInTouchThunk(data));
    const result = res.payload.isSuccessful;
    setSuccessOtp(!!(result === 'true'));
    setIsCodeSubmit(true);
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
      <div>
        {!successOtp && isCodeSubmit && (
          <p style={{ color: '#cc1f26', textAlign: 'center' }}>
            Verification failed. Please try again
          </p>
        )}
        <GetInOtp onSubmit={handleSubmitVerify} onValueChange={() => setIsCodeSubmit(false)} />
      </div>
    </div>
  );
  const FormGetInTouch = () => (
    <div className="ibc__form">
      <div className="ibc-difference__content">
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
        {isValidFormField && !successOtp ? (
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
