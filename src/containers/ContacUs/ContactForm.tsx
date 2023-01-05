import appStyle from '@/scss/pages/home/index.scss';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { IListCalls } from '@interfaces/contact-us';
import { submitFormGetInContactThunk } from '@redux/app/thunks';
import { getConfigContactForm } from '@redux/common/selectors';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { get } from 'lodash';
import { useState } from 'react';
import CallUs from './CallUs';

import GetInContactForm from './GetInContactForm';

interface ServicesListProps {
  listServices: IListCalls;
}
export function ContactForm({ listServices }: ServicesListProps) {
  const dispatch = useAppDispatch();
  const [isValidFormField, setIsValidFormField] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const titleMap = get(useAppSelector(getConfigContactForm), 'config.content', null);
  console.log('', titleMap);
  const handleSubmitForm = useDebouncedCallback(async (values) => {
    if (isSubmitSuccessful) return;
    const response: any = await dispatch(submitFormGetInContactThunk(values));
    const result = response.payload.isSuccessful;
    const isResult = result === 'true';
    setIsValidFormField(isResult);
  }, 1000);

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
      <div className="ibc-difference__content" dangerouslySetInnerHTML={{ __html: titleMap }}>
        {/* <h2>Get In Touch!</h2>
        <p>Make a difference and achieve the extraordinary. Let us help!</p> */}
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
