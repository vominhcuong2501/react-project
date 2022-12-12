import { createGetInTouchSchema } from '@/validations';
import { GroupFromInput } from '@components/compound';
import GroupPhoneNumber from '@components/compound/GroupFormControls/PhoneNumber';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGoogleCaptcha } from '@hooks/useGoogleCaptcha';
import { usePhone } from '@hooks/usePhone';
import { IGetInTouch } from '@interfaces/index';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface GetInTouchFormProps {
  onSubmit: (value: any) => void;
}

export default function GetInTouchForm({ onSubmit }: GetInTouchFormProps) {
  const [isPhone, setIsPhone] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState(null);
  const validatePhone = usePhone();
  const { handleSubmitData, valid: googleCaptchaIsValid } = useGoogleCaptcha();
  const defaultValues = {
    email: '',
    name: '',
    phone: 0,
    enquiry: '',
  };

  const form = useForm<IGetInTouch>({
    defaultValues,
    resolver: yupResolver(
      createGetInTouchSchema({
        email: 'Please enter email',
        name: 'Please enter name',
        enquiry: 'Please enter subject',
        phone: 'Phone number is required',
      }),
    ),
  });

  const handleSubmit = async (values: IGetInTouch) => {
    if (!isPhone) {
      form.setError('phone', { type: 'custom', message: 'Phone number is invalid' });
      return;
    }

    await handleSubmitData();
    if (!googleCaptchaIsValid) return;

    await onSubmit({
      ...values,
      country_code: phoneCountryCode,
    });
  };

  const handlePhoneChange = (phoneNumber, country, phoneCode) => {
    const isValid = validatePhone(phoneNumber, country);

    setIsPhone(!!isValid);
    setPhoneCountryCode(phoneCode);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="ibc-touch-form ibc__form__box">
        <GroupFromInput
          placeholder="Name"
          form={form}
          name="name"
          className="ibc__form__input"
          formLabel="Full name"
          iconAfter={<i className="fas fa-user"></i>}
        />
        <GroupFromInput
          placeholder="Email"
          form={form}
          name="email"
          className="ibc__form__input"
          formLabel="Email"
          iconAfter={<i className="fas fa-envelope"></i>}
        />
        <GroupFromInput
          placeholder="Your Enquiry"
          form={form}
          name="enquiry"
          className="ibc__form__input"
          formLabel="Your Enquiry"
        />
        <GroupPhoneNumber
          form={form}
          name="phone"
          className="ibc__form__input"
          onValueChange={handlePhoneChange}
        />
        <div className=" ibc__form__box__button">
          <button onClick={form.handleSubmit(handleSubmit)} disabled={form.formState.isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
