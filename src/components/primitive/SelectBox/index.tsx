import { CheckRounded } from '@mui/icons-material';

import selectBoxStyles from '@scss/components/select-box.scss';
import classNames from 'classnames';
import { get, toString } from 'lodash';
import { useId } from 'react';
import Select, { Props as ReactSelectProps } from 'react-select';

export interface SelectBoxProps extends ReactSelectProps {
  name?: string;
  options?: any;
  selectedOption?: any;
  isSearchable?: boolean;
  onChange?: (selectedOption: any) => void;
  className?: string;
}

const defaultProps = {
  name: '',
  options: {},
  selectedOption: {},
  isSearchable: false,
  onChange: () => null,
  className: '',
};

function SelectBox({
  name,
  options,
  selectedOption,

  isSearchable,
  onChange,
  className,
  ...props
}: SelectBoxProps) {
  const isMulti = get(props, 'isMulti') || false;
  const isDisabled = get(props, 'isDisabled') || false;

  const handleSelectChange = (selectOption: Record<string, unknown>) => {
    if (toString(selectOption?.value) !== toString(selectedOption)) {
      onChange({ name, selectOption });
    }
  };

  const formatOptionLabel = ({ value, label }) => (
    <>
      <span className="ibc-select-box__option-text">{label}</span>
      {toString(value) === toString(selectedOption) && (
        <CheckRounded className="ibc-select-box__option-icon" />
      )}
    </>
  );

  const getValue = () => {
    const val = options.find((it) => toString(it.value) === toString(selectedOption));
    return val || options[0];
  };

  return (
    <>
      <style jsx>{selectBoxStyles}</style>
      <div
        className={classNames(
          'ibc-select-box',
          { 'ibc-select-box--disabled': isDisabled },
          { 'ibc-select-box--multiple': isMulti },
          className,
        )}
      >
        <Select
          name={name}
          options={options}
          value={getValue()}
          isSearchable={isSearchable}
          onChange={handleSelectChange}
          formatOptionLabel={formatOptionLabel}
          classNamePrefix="ibc-select-box"
          instanceId={useId.toString()}
          {...props}
        />
      </div>
    </>
  );
}

SelectBox.defaultProps = defaultProps;

export default SelectBox;
