import Input, { InputProps } from '@components/primitive/Input';
import styles from '@scss/components/group-input.scss?type=scoped';
import classNames from 'classnames';
import { get } from 'lodash';

interface GroupInputProps extends InputProps {
  formLabel?: string;
  errorText?: string;
  formClassName?: string;
}

const defaultProps = {
  formLabel: '',
  errorText: '',
  formClassName: '',
};

function GroupInput({ formLabel, errorText, formClassName, ...inputProps }: GroupInputProps) {
  const error = get(inputProps, 'isError', false);
  return (
    <>
      <style jsx>{styles}</style>
      <div
        className={classNames(
          'ibc-group-input',
          { 'ibc-group-input--error': !!errorText || error },
          formClassName,
        )}
      >
        {!!formLabel && (
          <div className="ibc-group-input__label">
            <span>{formLabel}</span>
          </div>
        )}

        <div className="ibc-group-input__control">
          <Input isError={!!errorText || error} {...inputProps} />
        </div>
        {errorText && <span className="ibc-group-input__error-text">{errorText}</span>}
      </div>
    </>
  );
}

GroupInput.defaultProps = defaultProps;

export default GroupInput;
