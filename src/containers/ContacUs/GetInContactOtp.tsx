import { numberRegex } from '@/validations/regex';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { useState } from 'react';
import OTPInput from 'react-otp-input';

interface GetInTouchFormProps {
  onSubmit: (value: any) => void;
  onValueChange: () => void;
}
export default function GetInContactOtp({ onSubmit, onValueChange }: GetInTouchFormProps) {
  const [OTP, setOTP] = useState('');
  const handleChange = useDebouncedCallback((e) => {
    e.preventDefault();
    onValueChange();
    onSubmit(OTP);
  }, 1000);

  const handleValueChange = (value) => {
    if (numberRegex.test(value)) {
      setOTP(value);
    }
  };

  return (
    <div className="ibc__form_verify success">
      <div className="ibc__form_verify_otp">
        <OTPInput
          onChange={(value) => handleValueChange(value)}
          value={OTP}
          inputStyle="inputStyle"
          numInputs={6}
          isInputNum
          separator={<span></span>}
        />
      </div>
      <div className=" ibc__form__box__button">
        <button onClick={handleChange}>Verify</button>
      </div>
    </div>
  );
}
