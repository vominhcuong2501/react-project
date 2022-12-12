import { createGetInTouchSchema } from '@/validations';
import { GroupFromInput } from '@components/compound';
import GroupFromInputUpload from '@components/compound/GroupFormControls/InputUpload';
import GroupPhoneNumber from '@components/compound/GroupFormControls/PhoneNumber';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGoogleCaptcha } from '@hooks/useGoogleCaptcha';
import { usePhoneValidation } from '@hooks/usePhoneValidation';
import { IGetInContact } from '@interfaces/home';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface GetInContactFormProps {
  onSubmit: (value: any) => void;
}

export default function GetInContactForm({ onSubmit }: GetInContactFormProps) {
  const [isPhone, setIsPhone] = useState(false);
  // const [phoneCountryCode, setPhoneCountryCode] = useState(null);
  const validatePhone = usePhoneValidation();
  const { handleSubmitData, valid: googleCaptchaIsValid } = useGoogleCaptcha();

  const form = useForm<IGetInContact>({
    defaultValues: {
      email: '',
      name: '',
      phone: 0,
      enquiry: '',
      upload: [],
    },
    resolver: yupResolver(
      createGetInTouchSchema({
        email: 'Please enter email',
        name: 'Please enter name',
        enquiry: 'Please enter subject',
        phone: 'Phone number is required',
      }),
    ),
  });

  const handleSubmit = async (values: IGetInContact) => {
    await handleSubmitData();
    if (!googleCaptchaIsValid) return;
    if (!isPhone) {
      form.setError('phone', { type: 'custom', message: 'Phone number is invalid' });
      return;
    }
    onSubmit({
      ...values,
    });
  };

  const handlePhoneChange = (phoneNumber, country) => {
    const { isValid } = validatePhone(phoneNumber, country);
    setIsPhone(!!isValid);
    // setPhoneCountryCode(phoneCode);
  };

  return (
    <div className="">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="ibc-touch-form ibc__form__box">
        <GroupFromInput
          placeholder="Name"
          form={form}
          name="name"
          formLabel="Full name"
          iconAfter={<i className="fas fa-user"></i>}
        />
        <GroupFromInput
          placeholder="Email"
          form={form}
          name="email"
          formLabel="Email"
          iconAfter={<i className="fas fa-envelope"></i>}
        />
        <GroupPhoneNumber form={form} name="phone" onValueChange={handlePhoneChange} />
        <GroupFromInput
          placeholder="Your Enquiry"
          form={form}
          name="enquiry"
          formLabel="Your Enquiry"
        />
        <GroupFromInputUpload placeholder="Your Enquiry" form={form} name="upload" />
        <div className=" ibc__form__box__button">
          <button onClick={form.handleSubmit(handleSubmit)}>Submit</button>
        </div>
      </form>
    </div>
  );
}
