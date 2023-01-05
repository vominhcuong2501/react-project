/* eslint eqeqeq: 0 */
// @typescript-eslint/no-use-before-define
import { createGetInSubscribeSchema } from '@/validations';
import { GroupFromInput } from '@components/compound';
import Modal from '@components/compound/Modal';
import FormModalSubscribe from '@containers/Insights/FormModalSubscribe';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { IGetInSubscribe } from '@interfaces/home';
import { selectSubscribeConfig } from '@redux/common/selectors';

import { useAppDispatch, useAppSelector } from '@redux/hooks';

import ArrowRight from '@svg/arrow-right.svg';
import cookies from '@utils/cookies';
import { getConfig } from '@utils/helpers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const cardStyles = {
  img: {
    textAlign: 'center',
    margin: 'auto',
    marginLeft: '27%',
  },
  title: {
    alignItems: 'center',
    fontSize: 16,
    marginTop: 10,
  },
};
export default function InsightsSubscribe() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isValueForm, setIsValueForm] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const ip = cookies.get('ip');
  const user_agent = cookies.get('user_agent');
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const form = useForm<IGetInSubscribe>({
    defaultValues: {
      email: '',
      name: 'Insight',
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
  const handleSubmitForm = useDebouncedCallback(async (values) => {
    // @typescript-eslint/no-use-before-define
    setIsValueForm(form.watch('email'));
    setIsDisabled(true);
    setIsOpen(true);
  }, 0);

  const subscribeConfig = getConfig(useAppSelector(selectSubscribeConfig));
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmitIsSuccessfully = (value) => {
    setIsSubmitSuccessful(value == 'true');
  };

  return (
    <div className="bg_insights ">
      <div className="ibc-insightsSubcribe  ibc-container-subcirbe">
        <Modal open={isOpen} onClose={toggle} isClose handleClose={toggle}>
          <FormModalSubscribe mailInit={isValueForm} onValueChange={handleSubmitIsSuccessfully} />
        </Modal>
        <div className=" ibc-insightsSubcribe__form">
          <div dangerouslySetInnerHTML={{ __html: subscribeConfig }} />
          <form className="ibc-touch-form ibc__form__box d-flex align-items-center">
            <div className="ibc-insightsSubcribe-input">
              <GroupFromInput
                placeholder="Email"
                className="ibc-insight__input"
                form={form}
                name="email"
                iconAfter={<i className="fas fa-envelope"></i>}
              />
            </div>
            <div className="ibc-insightsSubcribe-btn">
              <div className="ibc-btn-wrapper" onClick={form.handleSubmit(handleSubmitForm)}>
                <a className="jsx-1480180584  ibc-custom-btn ibc-custom-btn--primary">
                  <span className="jsx-1480180584">Subscribe Now</span>
                  <ArrowRight></ArrowRight>
                </a>
              </div>
            </div>
          </form>
        </div>

        <div className="ibc-insightsSubcribe__img">
          <img
            src="/images/img-insights-subcribe.jpg"
            alt="/images/img-insights-subcribe.jpg"
            width="790"
            height="336"
          />
        </div>
      </div>
    </div>
  );
}
