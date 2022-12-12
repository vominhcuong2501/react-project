import style from '@scss/components/phone-input.scss';
import classNames from 'classnames';
import { Controller, UseFormReturn } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import inputStyle from 'react-phone-input-2/lib/style.css';

export interface GroupPhoneNumberProps {
  placeholder?: string;
  form: UseFormReturn<any>;
  name: any;
  className?: string;
  formLabel?: string;
  onValueChange?: (value, country, phoneCountryCode) => void;
}

export default function GroupPhoneNumber(props: GroupPhoneNumberProps) {
  const { form, name, onValueChange } = props;
  const {
    formState: { errors },
    setValue,
  } = form;
  const hasError: any = errors[name];
  const onChange = (value, geo) => {
    setValue('phone', value);
    onValueChange(value, geo, geo.countryCode);
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { ref, ...field } }) => (
        <>
          <style jsx>{style}</style>
          <style jsx>{inputStyle}</style>
          <div className={classNames('ibc-form-number ')}>
            <div>
              <PhoneInput
                {...field}
                inputProps={{
                  ref,
                  required: true,
                  autoFocus: false,
                }}
                specialLabel="Phone"
                countryCodeEditable={false}
                country="vn"
                onChange={onChange}
                isValid={() => !hasError}
              />
              <div className="icon_phone">
                <i className="fas fa-phone"></i>
              </div>
            </div>
            {hasError?.message && (
              <span className="ibc-form-number__error--text">{hasError?.message}</span>
            )}
          </div>
        </>
      )}
    />
  );
}
