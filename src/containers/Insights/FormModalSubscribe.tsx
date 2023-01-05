/* eslint eqeqeq: 0 */
import { createGetInSubscribeSchema } from '@/validations';
import { GroupFromInput } from '@components/compound';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { IGetInSubscribe } from '@interfaces/home';
import { submitFormGetInSubscribeThunk } from '@redux/app/thunks';
import { getFormConfig } from '@redux/common/selectors';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import formModal from '@scss/components/form-modal-subscribe.scss';
import cookies from '@utils/cookies';
import { get, pick } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface GetInTouchFormProps {
  onValueChange: (value: any) => void;
  mailInit: string;
}
export default function FormModalSubscribe({ mailInit, onValueChange }: GetInTouchFormProps) {
  const dispatch = useAppDispatch();
  const [isMessage, setIsMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const ip = cookies.get('ip');
  const user_agent = cookies.get('user_agent');
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const formConfig = JSON.parse(get(useAppSelector(getFormConfig), 'config.content', null));
  const { full_name, email, enquiry } = pick(formConfig, ['full_name', 'email', 'enquiry']);
  const handleSubmitForm = useDebouncedCallback(async (values) => {
    setIsDisabled(true);
    const response: any = await dispatch(submitFormGetInSubscribeThunk(values));
    const result = response.payload.isSuccessful;
    const setBoolean = result === 'true';
    setIsSubmitSuccessful(setBoolean);
    setIsMessage(response.payload.message);

    onValueChange(result);
  }, 1000);

  const form = useForm<IGetInSubscribe>({
    defaultValues: {
      email: mailInit,
      name: '',
      ip,
      agent: user_agent,
    },
    resolver: yupResolver(
      createGetInSubscribeSchema({
        ...get(formConfig, 'validation', {}),
      }),
    ),
  });

  useEffect(() => {
    setIsDisabled(true);
    if (form.watch('email').length > 0 && form.watch('name').length > 0) {
      setIsDisabled(false);
    }
  }, [form.watch()]);

  return (
    <>
      <style jsx>{formModal}</style>
      {isSubmitSuccessful ? (
        <div className="ibc-subscribe-success">
          <img
            src="/images/10355-loading-success.gif"
            alt="loading-success"
            title="success-verify"
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
              <div className="col-md-12 col-12">
                <GroupFromInput
                  placeholder={get(full_name, 'placeholder', '')}
                  form={form}
                  name={get(full_name, 'name', '')}
                  formLabel={get(full_name, 'label', '')}
                />
              </div>

              <div className="col-12">
                <GroupFromInput
                  placeholder={get(email, 'placeholder', '')}
                  form={form}
                  name={get(email, 'name', '')}
                  formLabel={get(email, 'label', '')}
                  iconAfter={<i className="fas fa-envelope"></i>}
                />
              </div>

              <div className={`disabled${isDisabled} ibc__form__box__button `}>
                <button onClick={form.handleSubmit(handleSubmitForm)} disabled={isDisabled}>
                  SUBSCRIBE NOW
                </button>
              </div>
              <div className="box-message col-12">
                <span className="box-message__error-text">
                  {isSubmitSuccessful == false ? isMessage : null}
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
