import { GroupButton, GroupFromInput } from '@components/compound';
import { IGetInTouch } from '@interfaces/home';
import formModal from '@scss/components/form-modal-subscribe.scss';
import { useForm } from 'react-hook-form';

export default function FormModalSubscribe() {
  const form = useForm<IGetInTouch>({
    defaultValues: {
      email: 'quan@gmail.com',
    },
  });
  return (
    <>
      <style jsx>{formModal}</style>
      <div className="ibc-subscribe-form">
        <div className="ibc-subscribe-form__content">
          <div className="d-flex align-items-center justify-content-between">
            <h1>News Alerts</h1>
            <button className="ibc-subscribe-close">
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <p>
            We promise we won’t spam. We’ll just send you regular updates on latest news and
            insights. You can unsubscribe at any time.
          </p>
          <form className="ibc-touch-form ibc__form__box">
            <div className="row">
              <div className="col-md-6 col-12">
                <GroupFromInput
                  placeholder=""
                  form={form}
                  name="firstName"
                  formLabel="First name"
                />
              </div>
              <div className="col-md-6 col-12">
                <GroupFromInput placeholder="" form={form} name="lastName" formLabel="Last name" />
              </div>
              <div className="col-12">
                <GroupFromInput
                  placeholder=""
                  form={form}
                  name="email"
                  formLabel="Email"
                  iconAfter={<i className="fas fa-envelope"></i>}
                />
              </div>
              <div className="col-12 ibc__form__box__button">
                <GroupButton
                  label="SUBSCRIBE NOW"
                  variant="danger"
                  size="medium"
                  className="ibc-hero__button"
                  href="#"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="ibc-subscribe-success">
        <div className="d-flex justify-content-end">
          <button className="ibc-subscribe-close">
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <img
          src="./images/icon-check.svg"
          alt="Icon-success"
          width="120"
          height="120"
          title="Success"
        />
        <h1>Thank you for subscribing! </h1>
      </div>
    </>
  );
}
