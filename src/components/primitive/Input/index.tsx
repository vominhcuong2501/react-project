import styles from '@scss/components/Input.scss?type=scoped';
import classNames from 'classnames';
import { ChangeEvent } from 'react';

export interface InputProps {
  type?: string;
  name?: string;
  value?: string;
  className?: string;
  placeholder?: string;
  onChange?: ({ name, value }: { name: string; value: string }) => void;
  isError?: boolean;
  maxLength?: number;
  fullWidth?: boolean;
  autofocus?: boolean;
  onBlur?: (e: any) => void;
}

const defaultProps = {
  type: 'text',
  value: '',
  className: '',
  onChange: () => null,
  isError: false,
  maxLength: Infinity,
  fullWidth: true,
  autofocus: false,
  onBlur: () => null,
};

function Input({
  type,
  name,
  placeholder,
  value,
  className,
  onChange,
  isError,
  maxLength,
  fullWidth,
  autofocus,
  onBlur,
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue, name: InputName } = e.target;
    const finalValue = inputValue.slice(0, maxLength);

    onChange({ name: InputName, value: finalValue });
  };

  return (
    <>
      <style jsx>{styles}</style>
      <input
        autoFocus={autofocus}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={classNames(
          'ibc-input',
          { 'ibc-input--error': isError },
          { 'ibc-input--full': fullWidth },
          className,
        )}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </>
  );
}

Input.defaultProps = defaultProps;

export default Input;
