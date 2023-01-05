// @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/ban-types
import { numberRegex } from '@/validations/regex';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
// use safer object types
interface GetInTouchFormProps {
  onSubmit: (value: any) => void;
  onValueChange: () => void;

  currentValue: {}; // TypeScript does not prevent that
}
export default function GetInTouchOtp({
  onSubmit,
  onValueChange,
  currentValue,
}: GetInTouchFormProps) {
  const [OTP, setOTP] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const handleChange = useDebouncedCallback((e) => {
    e.preventDefault();
    onSubmit(OTP);
  }, 500);
  const [isValueChange, setIsValueChange] = useState(false);

  const handleValueChange = (value) => {
    if (numberRegex.test(value)) {
      setOTP(value);
      setIsDisabled(true);
      if (value > 1) {
        setIsDisabled(false);
      }
    }
  };
  useEffect(() => {
    if (isValueChange) return;

    if (isEmpty(!currentValue)) {
      setOTP(currentValue as string);
    } else {
      setOTP(OTP);
    }
    setIsValueChange(true);
  }, [currentValue]);

  return (
    <div className="ibc__form_verify success">
      <div className="ibc__form_verify_otp">
        <OTPInput
          onChange={(value) => handleValueChange(value)}
          value={OTP}
          shouldAutoFocus
          inputStyle="inputStyle"
          numInputs={6}
          isInputNum
          separator={<span></span>}
        />
      </div>
      <div className={`disabled${isDisabled} ibc__form__box__button verify__height `}>
        <button onClick={handleChange} disabled={isDisabled}>
          Submit
        </button>
      </div>
    </div>
  );
}
