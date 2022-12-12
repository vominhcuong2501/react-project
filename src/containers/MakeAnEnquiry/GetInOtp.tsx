import { numberRegex } from '@/validations/regex';
import { useState } from 'react';
import OTPInput from 'react-otp-input';

interface GetInFormProps {
  onSubmit: (value: any) => void;
  onValueChange: () => void;
}
export default function GetInOtp({ onSubmit, onValueChange }: GetInFormProps) {
  const [OTP, setOTP] = useState('');
  function handleChange(e) {
    e.preventDefault();
    onValueChange();
    onSubmit(OTP);
  }

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
