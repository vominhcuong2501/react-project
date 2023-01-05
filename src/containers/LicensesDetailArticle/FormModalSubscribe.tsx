/* eslint eqeqeq: 0 */
import { createGetInSubscribeSchema } from '@/validations';
import { GroupButton, GroupFromInput } from '@components/compound';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { IGetInSubscribe } from '@interfaces/home';
import { submitFormGetInSubscribeThunk } from '@redux/app/thunks';
import { useAppDispatch } from '@redux/hooks';
import formModal from '@scss/components/form-modal-subscribe.scss';
import cookies from '@utils/cookies';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function FormModalSubscribe() {
  const dispatch = useAppDispatch();
  const ip = cookies.get('ip');
  const user_agent = cookies.get('user_agent');
  const [isDisabled, setIsDisabled] = useState(false);

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const handleSubmitForm = useDebouncedCallback(async (values) => {
    setIsDisabled(true);
    const response: any = await dispatch(submitFormGetInSubscribeThunk(values));
    const result = response.payload.isSuccessful;
    const setBoolean = result === 'true';
    setIsSubmitSuccessful(setBoolean);
  }, 1000);

  const form = useForm<IGetInSubscribe>({
    defaultValues: {
      email: '',
      name: '',
      ip,
      agent: user_agent,
    },
    resolver: yupResolver(
      createGetInSubscribeSchema({
        email: 'Please enter email',
        name: 'Please enter name',
      }),
    ),
  });
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setIsSubmitSuccessful(false);
    }, 1000);
    return () => window.clearTimeout(timeoutID);
  }, []);

  return (
    <>
      <style jsx>{formModal}</style>
      {isSubmitSuccessful ? (
        <div className="ibc-subscribe-success">
          <img
            src="/images/icon-check.svg"
            alt="Icon-success"
            width="120"
            height="120"
            title="Success"
          />
          <h1>Thank you for subscribing! </h1>
        </div>
      ) : (
        <div className="ibc-subscribe-form">
          <div className="ibc-subscribe-form__content">
            <div className="d-flex align-items-center justify-content-between">
              <h1>News Alerts</h1>
            </div>
            <p>
              We promise we wont spam. Well just send you regular updates on latest news and
              insights. You can unsubscribe at any time.
            </p>
            <form className="ibc-touch-form ibc__form__box">
              <div className="row">
                <div className="col-md-12 col-12">
                  <GroupFromInput placeholder="" form={form} name="name" formLabel="First name" />
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
                    onClick={form.handleSubmit(handleSubmitForm)}
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
