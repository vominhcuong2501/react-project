import { createGetInTouchSchema } from '@/validations';
import { GroupFromInput } from '@components/compound';
import GroupFromInputUpload from '@components/compound/GroupFormControls/InputUpload';
import GroupPhoneNumber from '@components/compound/GroupFormControls/PhoneNumber';

import { yupResolver } from '@hookform/resolvers/yup';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { useGoogleCaptcha } from '@hooks/useGoogleCaptcha';
import { usePhone } from '@hooks/usePhone';
import { IGetInContact } from '@interfaces/home';
import { getFormConfig } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import cookies from '@utils/cookies';

import { get, pick } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface GetInContactFormProps {
  onSubmit: (value: any) => void;
}

export default function GetInContactForm({ onSubmit }: GetInContactFormProps) {
  const formConfig = JSON.parse(get(useAppSelector(getFormConfig), 'config.content', null));
  const [isPhone, setIsPhone] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const validatePhone = usePhone();

  const { handleSubmitData, valid: googleCaptchaIsValid } = useGoogleCaptcha();
  const ip = cookies.get('ip');
  const user_agent = cookies.get('user_agent');
  const { full_name, email, enquiry } = pick(formConfig, ['full_name', 'email', 'enquiry']);
  const form = useForm<IGetInContact>({
    defaultValues: {
      email: '',
      name: '',
      phone: 0,
      enquiry: '',
      upload: [],
      ip,
      agent: user_agent,
    },
    resolver: yupResolver(
      createGetInTouchSchema({
        ...get(formConfig, 'validation', {}),
      }),
    ),
  });
  useEffect(() => {
    setIsDisabled(true);
    if (
      form.watch('email').length > 0 &&
      form.watch('name').length > 0 &&
      form.watch('enquiry').length > 0 &&
      form.watch('phone') > 3
    ) {
      setIsDisabled(false);
    }
  }, [form.watch()]);
  const handleSubmit = useDebouncedCallback(async (values: IGetInContact) => {
    setIsDisabled(true);
    await handleSubmitData();
    if (!googleCaptchaIsValid) return;
    if (!isPhone) {
      form.setError('phone', { type: 'custom', message: 'Phone number is invalid' });
      return;
    }

    onSubmit({
      ...values,
      country_code: phoneCountryCode,
    });
  }, 1000);

  const handlePhoneChange = (phoneNumber, country, dialCode) => {
    const isValid = validatePhone(phoneNumber, country);
    setIsPhone(!!isValid);
    setPhoneCountryCode(dialCode);
  };

  return (
    <div className="">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="ibc-touch-form ibc__form__box">
        <GroupFromInput
          placeholder={get(full_name, 'placeholder', '')}
          form={form}
          name={get(full_name, 'name', '')}
          formLabel={get(full_name, 'label', '')}
          iconAfter={<i className="fas fa-user"></i>}
        />
        <GroupFromInput
          placeholder={get(email, 'placeholder', '')}
          form={form}
          name={get(email, 'name', '')}
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
          placeholder={get(enquiry, 'placeholder', '')}
          form={form}
          name={get(enquiry, 'name', '')}
          formLabel={get(enquiry, 'label', '')}
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
