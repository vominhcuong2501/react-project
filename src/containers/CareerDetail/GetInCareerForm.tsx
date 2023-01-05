import { createGetInCareerSchema } from '@/validations';
import { GroupFromInput } from '@components/compound';
import GroupFromInputUpload from '@components/compound/GroupFormControls/InputUpload';
import GroupPhoneNumber from '@components/compound/GroupFormControls/PhoneNumber';

import { yupResolver } from '@hookform/resolvers/yup';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { useGoogleCaptcha } from '@hooks/useGoogleCaptcha';
import { usePhone } from '@hooks/usePhone';
import { IGetInCareer } from '@interfaces/career';

import { getFormConfig } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import cookies from '@utils/cookies';
import { get, pick } from 'lodash';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface GetInContactFormProps {
  onSubmit: (value: any) => void;
  currentValue: {};
}

export default function GetInCareerForm({ onSubmit, currentValue }: GetInContactFormProps) {
  const router = useRouter();
  const formConfig = JSON.parse(get(useAppSelector(getFormConfig), 'config.content', null));
  const [isPhone, setIsPhone] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const validatePhone = usePhone();
  const { handleSubmitData, valid: googleCaptchaIsValid } = useGoogleCaptcha();
  const [pathnames, setPathnames] = useState('');
  const ip = cookies.get('ip');
  const user_agent = cookies.get('user_agent');

  const { full_name, email, note } = pick(formConfig, ['full_name', 'email', 'note']);
  const form = useForm<IGetInCareer>({
    defaultValues: {
      email: '',
      name: '',
      phone: 0,
      note: '',
      upload: [],
      ip,
      agent: user_agent,
    },
    resolver: yupResolver(
      createGetInCareerSchema({
        ...get(formConfig, 'validation', {}),
      }),
    ),
  });

  useEffect(() => {
    let originPath = router.asPath;
    if (router.asPath.indexOf('#') > -1) {
      originPath = router.asPath.slice(0, router.asPath.indexOf('#'));
    }
    const path = originPath.split('/').filter((x) => x);
    const str = path.toString();
    const pieces = str.split(/[\s,]+/);
    const last = pieces[pieces.length - 1];
    setPathnames(last as any);
  }, [pathnames]);
  const handleSubmit = useDebouncedCallback(async (values: IGetInCareer) => {
    setIsDisabled(true);
    await handleSubmitData();
    if (!googleCaptchaIsValid) return;
    if (!isPhone) {
      form.setError('phone', { type: 'custom', message: 'Phone number is invalid' });
      return;
    }

    onSubmit({
      ...values,
      career_keyword: pathnames,
    });
  }, 1000);

  const handlePhoneChange = (phoneNumber, country, dialCode) => {
    const isValid = validatePhone(phoneNumber, country);
    setIsPhone(!!isValid);
    setPhoneCountryCode(dialCode);
  };
  useEffect(() => {
    setIsDisabled(true);
    if (
      form.watch('email').length > 0 &&
      form.watch('name').length > 0 &&
      form.watch('note').length > 0 &&
      form.watch('phone') > 3
    ) {
      setIsDisabled(false);
    }
  }, [form.watch()]);
  return (
    <div className="">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="ibc-touch-form ibc__form__box">
        <GroupFromInput
          placeholder={get(full_name, 'placeholder', '')}
          form={form}
          name={get(full_name, 'name', '')}
          className="ibc__form__input"
          formLabel={get(full_name, 'label', '')}
          iconAfter={<i className="fas fa-user"></i>}
        />
        <GroupFromInput
          placeholder={get(email, 'placeholder', '')}
          form={form}
          name={get(email, 'name', '')}
          className="ibc__form__input"
          formLabel={get(email, 'label', '')}
          iconAfter={<i className="fas fa-envelope"></i>}
        />
        <GroupPhoneNumber
          form={form}
          name="phone"
          className="ibc__form__input"
          onValueChange={handlePhoneChange}
        />

        <GroupFromInput
          placeholder={get(note, 'placeholder', '')}
          form={form}
          name={get(note, 'name', '')}
          className="ibc__form__input"
          formLabel={get(note, 'label', '')}
        />
        <GroupFromInputUpload
          placeholder="Your Enquiry"
          form={form}
          name="upload"
          limit={20971520}
        />

        <div className={`disabled${isDisabled} ibc__form__box__button `}>
          <button onClick={form.handleSubmit(handleSubmit)} disabled={isDisabled}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
