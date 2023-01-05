import appStyle from '@/scss/pages/career-detail/index.scss?type=scoped';
// import appStyleform from '@/scss/pages/home/index.scss';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { submitFormGetInCareerThunk } from '@redux/app/thunks';
import { useAppDispatch } from '@redux/hooks';
import classNames from 'classnames';
import { useState } from 'react';
import GetInCareerForm from './GetInCareerForm';

interface MenuMobileProps {
  isShow: boolean;
  onClose: () => void;
  dataitem: [];
}

export default function CareerForm({ isShow, onClose, dataitem }: MenuMobileProps) {
  const [isCodeSubmitskip, setIsCodeSubmitskip] = useState(false);

  const closeModal = () => {
    onClose();
  };

  const [isCodeSubmitnb, setIsCodeSubmitnb] = useState('');
  const dispatch = useAppDispatch();
  const [isValidFormField, setIsValidFormField] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const handleSubmitForm = useDebouncedCallback(async (values) => {
    if (isSubmitSuccessful) return;
    const response: any = await dispatch(submitFormGetInCareerThunk(values));
    setIsCodeSubmitnb(values);
    const result = response.payload.isSuccessful;
    const isResult = result === 'true';
    setIsValidFormField(isResult);
  }, 1000);
  const handleClickFirstItem = () => {
    onClose();
    setIsCodeSubmitskip(false);
    setIsValidFormField(isCodeSubmitskip);
  };
  const SubmitFormIsSuccessfully = () => (
    <div className="ibc__form">
      <div className="ibc-difference__content text-center">
        <h2>Application Form</h2>
      </div>
      <div className="ibc__form success">
        <h1>Thank you for getting in touch!</h1>
        <img src="/images/10355-loading-success.gif" alt="loading-success" title="success-verify" />
        <p>We appreciate you contacting us. </p>
        <p>We will get back in touch with you soon! Have a great day!</p>
      </div>
    </div>
  );

  const FormGetInTouch = () => (
    <div className="ibc__form">
      <div className="ibc-difference__content text-center">
        <h2>Application Form</h2>
        <p>
          You are applying for <strong>{dataitem}</strong> position.
        </p>
      </div>
      <GetInCareerForm onSubmit={handleSubmitForm} currentValue={isCodeSubmitnb} />
    </div>
  );

  return (
    <>
      <style jsx>{appStyle}</style>
      {/* <style jsx>{appStyleform}</style> */}
      <nav className={classNames('ibc-sidebar-form', { 'ibc-sidebar-form--open': isShow })}>
        <div className="ibc-sidebar-form__container">
          <div
            className={classNames('ibc-sidebar-form__main', {
              'ibc-sidebar-form--open': isShow,
            })}
          >
            {/* first menu */}

            <div
              className={classNames('ibc-sidebar-form__first ibc_touch ibc-main ibc-contact', {
                'ibc-sidebar-form__first--open': isShow,
              })}
            >
              {isValidFormField ? <SubmitFormIsSuccessfully /> : <FormGetInTouch />}

              <div className="close_career " onClick={handleClickFirstItem}>
                <img src="../images/close.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="overlay-career" onClick={closeModal} />
    </>
  );
}
