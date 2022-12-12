import appStyle from '@/scss/pages/home/index.scss';
import { IListCalls } from '@interfaces/contact-us';
import { submitFormGetInContactThunk } from '@redux/app/thunks';
import { useAppDispatch } from '@redux/hooks';
import { useState } from 'react';
import CallUs from './CallUs';

import GetInContactForm from './GetInContactForm';

interface ServicesListProps {
  listServices: IListCalls;
}
export function ContactForm({ listServices }: ServicesListProps) {
  const dispatch = useAppDispatch();
  const [isValidFormField, setIsValidFormField] = useState(false);
  const handleSubmitForm = async (values) => {
    const response: any = await dispatch(submitFormGetInContactThunk(values));
    const result = response.payload.isSuccessful;
    setIsValidFormField(!!result);
  };

  const SubmitFormIsSuccessfully = () => (
    <div className="ibc__form success">
      <h1>Thank you for getting in touch!</h1>
      <img src="/images/10355-loading-success.gif" alt="loading-success" title="success-verify" />
      <p>We appreciate you contacting us. </p>
      <p>We will get back in touch with you soon! Have a great day!</p>
    </div>
  );

  const FormGetInTouch = () => (
    <div className="ibc__form">
      <div className="ibc-difference__content">
        <h2>Get In Touch!</h2>
        <p>Make a difference and achieve the extraordinary. Let us help!</p>
      </div>
      <GetInContactForm onSubmit={handleSubmitForm} />
    </div>
  );

  return (
    <>
      <style jsx>{appStyle}</style>
      <section className="ibc_touch ibc-main ibc-contact">
        <div className="ibc__form call-form">
          <div className="ibc-difference__content">
            <h2>Call Us 24/7</h2>
          </div>
          <CallUs listServices={listServices} />
        </div>
        {isValidFormField ? <SubmitFormIsSuccessfully /> : <FormGetInTouch />}
      </section>
    </>
  );
}
