/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from '@scss/components/group-select.scss';
import Select, { components } from 'react-select';

const { SingleValue, Option } = components;
type IOptionList = {
  OptionLIst: IOption[];
  instanceId: string;
  onChange: any;
  // eslint-disable-next-line react/no-unused-prop-types
  value?: string | ReadonlyArray<string> | number | undefined;
};
type IOption = {
  id: number;
  label?: string;
  value?: number;
  image?: string;
  width?: string;
};
const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    border: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: state.isSelected ? 'red' : 'blue',
    background: state.isSelected ? 'white' : 'white',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    display: 'flex',
    border: 'none',
    flexDirection: 'row',
    alignItems: 'center',
  }),
};

const IconSingleValue = ({ data, ...self }: any) => (
  <SingleValue {...self}>
    <img
      src={data?.image}
      style={{
        height: '14px',
        marginRight: '10px',
      }}
    />
    <div className="">{data.label}</div>
  </SingleValue>
);

const IconOption = ({ data, ...self }: any) => (
  <Option {...self}>
    <img
      src={data.image}
      style={{
        height: '14px',
        marginRight: '10px',
      }}
    />

    <div className="">{data.label}</div>
  </Option>
);
const SelectForm = ({ instanceId, OptionLIst, onChange }: IOptionList) => (
  <>
    <style jsx>{styles}</style>
    <Select
      id={instanceId}
      instanceId={instanceId}
      styles={customStyles}
      components={{
        Option: IconOption,
        SingleValue: IconSingleValue,
      }}
      options={OptionLIst}
      defaultValue={OptionLIst[0]}
      onChange={onChange}
    />
  </>
);

export { SelectForm };
