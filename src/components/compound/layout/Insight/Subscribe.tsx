import { GroupButton, GroupFromInput } from '@components/compound';
import { IGetInTouch } from '@interfaces/home';
import { useForm } from 'react-hook-form';

export default function InsightsSubscribe() {
  const form = useForm<IGetInTouch>({
    defaultValues: {
      email: '',
    },
  });
  return (
    <div className="bg_insights ">
      <div className="ibc-insightsSubcribe  ibc-container-subcirbe">
        <div className=" ibc-insightsSubcribe__form">
          <h1>Subcirbe To Our Updates</h1>
          <p>Latest news & insights from around the world brought to you by One IBCs experts</p>
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
              <GroupButton
                label="SUBSCRIBE NOW"
                variant="danger"
                size="medium"
                className="ibc-hero__button"
                href="#"
              />
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
